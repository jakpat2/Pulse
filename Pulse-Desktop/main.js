const { app, BrowserWindow, dialog, Menu, globalShortcut, shell, net, session, utilityProcess, Tray } = require('electron');
const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');
const log = require('electron-log');

// 1. Determine the paths
const baseDir = process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(app.getPath('exe'));
const customUserData = path.join(baseDir, 'Pulse');

// 2. Function to verify write permissions
function verifyWriteAccess(dir) {
    try {
        // Ensure the directory exists first
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Attempt to create a hidden test file to check write capability
        const testFile = path.join(dir, '.write_test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile); // Clean up the test file
        return true;
    } catch (err) {
        return false;
    }
}

// 3. Perform the check
if (!verifyWriteAccess(customUserData)) {
    // Show an error dialog before quitting
    dialog.showErrorBox(
        'Permission Denied',
        'Pulse cannot save its settings because it does not have write access to its own folder. ' +
        'Please move the application to a folder where you have full permissions (e.g., your Documents folder).'
    );
    app.quit(); // Exit the application
    process.exit(1); // Force exit
}

// 4. Set paths and continue normally
app.setPath('userData', customUserData);

const Store = require('electron-store').default;
const store = new Store({
    cwd: customUserData,
    name: 'config'
});

//LOG & ERROR
Object.assign(console, log.functions);
log.variables.process = 'main';
log.transports.file.maxSize = 5 * 1024 * 1024; // 5MB limit
log.transports.file.getFile(); // Ensures the file is initialized

function handleFatalError(error) {
    log.error('FATAL ERROR:', error);
    dialog.showErrorBox(
        'Pulse Critical Error', 
        'Pulse has encountered a fatal error and needs to restart. If this keeps happening, please check your log file.'
    );
    quitApp(); // Cleanly shut down the app
}

log.errorHandler.startCatching({
  showDialog: false,
  onError: (error) => {
    log.error('Uncaught Exception:', error);
    handleFatalError(error);
  }
});

// --- GLOBAL VARIABLES ---
let win;
let widgetWindow = null;
let serverProcess;
let tray = null;
let isTrayEnabled = false;

// Ensure only one instance of the app runs at a time
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    quitApp(); // Quit if another instance is already running
} else {
    // Handle the event if a second instance tries to launch
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });
}

function clearCache() {
    session.defaultSession.clearCache().then(() => {
        console.log('Cache cleared successfully.');
    });
}

// Function to manually check for updates via GitHub API
async function checkForUpdates() {
    try {
        const response = await net.fetch('https://api.github.com/repos/jakpat2/Pulse/releases/latest');
        
        if (!response.ok) return;

        const data = await response.json();
        const latestVersion = data.tag_name.replace('v', ''); 
        const currentVersion = app.getVersion();

        // Simple version comparison
        if (latestVersion !== currentVersion) {
            const { response: action } = await dialog.showMessageBox({
                type: 'info',
                title: 'Update Available',
                message: `A new version (${latestVersion}) is available.\nCurrent version: ${packageJson.version}`,
                detail: 'Would you like to visit the release page to download it?',
                buttons: ['Download Now', 'Later']
            });

            if (action === 0) {
                shell.openExternal(data.html_url);
            }
        }
    } catch (error) {
        console.error('Failed to check for updates:', error);
    }
}

    // Application Menu Structure
    const menuTemplate = [
        {
            label: 'App Menu',
            submenu: [
                {
                    label: 'Home',
                    click: () => { win.loadURL('https://pulse.jakpat.dev/'); }
                },
                {
                    label: 'Fullscreen',
                    role: 'togglefullscreen'
                },
                {
                    label: 'Reload',
                    role: 'reload'
                },
                {
                label: 'Always on Top',
                type: 'checkbox',
                checked: store.get('alwaysOnTop', false), 
                    click: (menuItem) => {
                        const isAlwaysOnTop = menuItem.checked;
                        store.set('alwaysOnTop', isAlwaysOnTop);
                        if (win) {
                            win.setAlwaysOnTop(isAlwaysOnTop);
                        }
                    }
                },
                { 
                label: 'Enable Tray Icon', 
                type: 'checkbox', 
                checked: false, 
                click: (item) => toggleTray(item.checked) 
                }
            ]
        },
        {
        label: 'Widgets',
        submenu: [
            { label: 'Open Widget', click: openWidget },
            { 
                label: 'Close All Widgets', 
                click: () => activeWidgets.forEach(w => w.close()) 
            },
        ]
    },
        {
            label: 'Pulse',
            submenu: [
                {
                    label: 'About Pulse',
                    click: () => {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'About Pulse',
                            message: `Pulse v${packageJson.version}`,
                            detail: 'The premium, all-in-one suite for synchronized lyrics, visualizers, and stream widgets. Featuring both a native desktop application and full compatibility with the Tuna OBS plugin.\n\nMade by jakpat.',
                            buttons: ['GitHub', 'jakpat', 'OK']
                        }).then((result) => {
                            if (result.response === 0) {
                                shell.openExternal('https://github.com/jakpat2/Pulse');
                            }
                            if (result.response === 1) {
                                shell.openExternal('https://jakpat.dev');
                            }
                        });
                    }
                },
                {
                    label: 'Check for Updates',
                    click: () => { checkForUpdates(); }
                },
                { label: 'Open Log File',
                click: () => { shell.openPath(log.transports.file.getFile().path); }
                },
                { type: 'separator' },
                { label: 'Quit', 
                click: () => {
                    isTrayEnabled = false; // Force flag to false to bypass the hide logic
                quitApp();
                }}
            ]
        }
    ];

// --- TRAY LOGIC ---
function updateTrayMenu() {
    if (!tray) return;
    const isVisible = win && !win.isDestroyed() ? win.isVisible() : false;
    
    const contextMenu = Menu.buildFromTemplate([
        { 
            label: isVisible ? 'Hide Pulse' : 'Show Pulse', 
            click: () => { isVisible ? win.hide() : win.show(); } 
        },
        { 
            label: 'Enable Tray Icon', 
            type: 'checkbox', 
            checked: !!tray, // Reflects actual tray existence
            click: (item) => toggleTray(item.checked) 
        },
        { type: 'separator' },
        { label: 'Quit', 
        click: () => {
        isTrayEnabled = false; // Force flag to false to bypass the hide logic
        quitApp();
    } 
}
    ]);
    tray.setContextMenu(contextMenu);
}

function updateAppMenu() {
    const trayMenuItem = menuTemplate[0].submenu.find(item => item.label === 'Enable Tray Icon');
    const topMenuItem = menuTemplate[0].submenu.find(item => item.label === 'Always on Top');
    
    if (trayMenuItem) {
        trayMenuItem.checked = !!tray;
    }
    if (topMenuItem) {
        topMenuItem.checked = store.get('alwaysOnTop', false);
    }
    
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

function toggleTray(enabled) {
    // Save the new state to persistent storage
    store.set('isTrayEnabled', enabled);
    isTrayEnabled = enabled; 
    if (enabled && !tray) {
        tray = new Tray(path.join(__dirname, 'icon.png'));
        // Re-attach context menu whenever tray is created
        updateTrayMenu();
    } else if (!enabled && tray) {
        tray.destroy();
        tray = null;
        // Safety Check: If the window is gone, recreate it
        if (!win || win.isDestroyed()) {
            createMainWindow();
        } else if (!win.isVisible()) {
            // If it exists but is hidden, bring it to the front
            win.show();
            win.focus();
        }
    }
    // Refresh the top menu bar to update the checkbox
    updateAppMenu();
}

// --- WIDGET LOGIC ---
const activeWidgets = new Set();

function openWidget() {
    // Force the check against the main window (win), not the focused one
    const mainURL = new URL(win.webContents.getURL());
    
    // Check if the main window is on the home page
    const isHome = mainURL.origin === 'https://pulse.jakpat.dev' && 
                   (mainURL.pathname === '/' || mainURL.pathname === '/index.html');

    if (isHome) {
        dialog.showMessageBox({
            type: 'info',
            title: 'Action Denied',
            message: "You can't open the Home page as a Widget.",
            buttons: ['OK']
        });
        return;
    }
    
    let widget = new BrowserWindow({
    icon: path.join(__dirname, 'icon.png'),
    title: "Pulse",
    width: 600, height: 350,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    backgroundThrottling: false,
    spellcheck: false,
      devTools: false
    }
});

    widget.loadURL(win.webContents.getURL());

    let isTransparent = false;

    // Define the custom menu for the widget
    const widgetContextMenu = Menu.buildFromTemplate([
        { label: 'Close Widget', click: () => { widget.close(); } },
        { type: 'separator' },
        { label: 'Reload', click: () => { widget.reload(); } },
        { type: 'separator' },
        { label: 'Toggle Transparency', 
          click: () => {
            isTransparent = !isTransparent;
            widget.setOpacity(isTransparent ? 0.7 : 1.0); // 0.7 is 70% opacity
        }},
        { type: 'separator' },
        { label: 'Small (300x200)', click: () => widget.setSize(300, 200) },
        { label: 'Medium (600x400)', click: () => widget.setSize(600, 400) },
        { label: 'Large (900x600)', click: () => widget.setSize(900, 600) },
    ]);

    // Prevent default system menu and show custom one
    widget.on('system-context-menu', (event, point) => {
        event.preventDefault();
        widgetContextMenu.popup({ window: widget });
    });

    // Handle dynamic sizing and dragging
    widget.webContents.on('did-finish-load', async () => {
    const dims = await widget.webContents.executeJavaScript(`
        (function() {
            // Target the first child of the body, which usually contains the UI
            const target = document.body.firstElementChild || document.body;
            const rect = target.getBoundingClientRect();
            
            return {
                width: Math.ceil(rect.width),
                height: Math.ceil(rect.height)
            };
        })()
    `);

    // Apply the dimensions directly
    widget.setSize(dims.width, dims.height);


        // Set Constraints
        const MAX_W = 900, MAX_H = 600;
        const MIN_W = 300, MIN_H = 200;
        
        const targetW = Math.min(Math.max(dims.width, MIN_W), MAX_W);
        const targetH = Math.min(Math.max(dims.height, MIN_H), MAX_H);

        // Apply size and drag style
        widget.setSize(targetW, targetH);
        widget.webContents.executeJavaScript(`
            document.body.style.webkitAppRegion = 'drag';
            document.body.style.overflow = 'hidden'; // Prevents scrollbars from appearing
        `);
    });

    activeWidgets.add(widget);
    widget.on('closed', () => activeWidgets.delete(widget));
}

// --- APP LIFECYCLE ---
app.whenReady().then(() => {
    // Load Settings
    const trayEnabled = store.get('isTrayEnabled', false);
    const alwaysOnTop = store.get('alwaysOnTop', false);

    // Offload the server to a separate process (the "Worker")
serverProcess = utilityProcess.fork(path.join(__dirname, 'server.js'));

serverProcess.on('message', (msg) => {
    if (msg.type === 'LOG') {
        // Use the level passed from the server
        const logMethod = log[msg.level] || log.info;
        logMethod(`[${msg.component}] ${msg.message}`);
    } else if (msg.type === 'CRITICAL_ERROR') {
        log.error('Server process error:', msg.message);
        dialog.showErrorBox('Pulse Server Error', msg.message);
    }
});

    // Listen for the process exit to ensure no zombie processes
    serverProcess.on('exit', (code) => {
        console.log('Server process exited with code:', code);
    });

    // ESC shortcut to disable fullscreen
    globalShortcut.register('Esc', () => {
        if (win && win.isFullScreen()) {
            win.setFullScreen(false);
        }
    });

    // Create the main window
    win = new BrowserWindow({
        icon: path.join(__dirname, 'icon.png'),
        title: "Pulse",
        width: 1280,
        height: 720,
        webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    backgroundThrottling: true,
    spellcheck: false,
      devTools: false
}
    });
    // Apply "Always on Top" on startup
    win.setAlwaysOnTop(alwaysOnTop);

    // Setup Tray
    toggleTray(trayEnabled);

    // Listen to visibility changes to update the tray menu dynamically
    win.on('show', updateTrayMenu);
    win.on('hide', updateTrayMenu);

    win.on('close', (event) => {
    if (isTrayEnabled) {
        // If tray is enabled, just hide the window to background
        event.preventDefault();
        win.hide();
    } else {
        // If tray is NOT enabled, perform full cleanup and quit
        quitApp();
    }
});

    // DEV TOOLS (Comment out when not using. And when using comment out devTools in BrowserWindow.)
   // win.webContents.openDevTools();
    //
    
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const url = new URL(details.url);

    // Check if the URL is for pulse.jakpat.dev domain and doesn't already have the mode
    if (url.origin === 'https://pulse.jakpat.dev' && !url.searchParams.has('mode')) {
        url.searchParams.append('mode', 'pulse');
        callback({ redirectURL: url.toString() });
    } else {
        callback({}); // Proceed without changes
    }
});

    // Logic to handle the cursor auto-hide
win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
        let idleTimer;
        const IDLE_TIMEOUT = 5000; // 5 seconds

        function showCursor() {
            document.body.style.cursor = 'auto';
            clearTimeout(idleTimer);
            idleTimer = setTimeout(hideCursor, IDLE_TIMEOUT);
        }

        function hideCursor() {
            document.body.style.cursor = 'none';
        }

        // Listen for mouse movement to reset the timer
        document.addEventListener('mousemove', showCursor, { capture: true });
        
        // Initialize
        showCursor();
    `);
});

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Load the home URL
    win.loadURL('https://pulse.jakpat.dev/');

    win.webContents.on('did-fail-load', (event, code, desc) => {
    win.loadFile('offline.html');
});

    // Check for updates automatically on startup
    checkForUpdates();
});

function quitApp() {
    // 1. Close all active widgets
    activeWidgets.forEach(w => w.close());
    activeWidgets.clear();

    // 2. Kill the background server process
    if (serverProcess) {
        serverProcess.kill();
    }

    // 3. Quit the application
    app.quit(); 
}

// Graceful shutdown to clean up background tasks
app.on('will-quit', (event) => {
    if (serverProcess) {
        serverProcess.kill();
    }
});