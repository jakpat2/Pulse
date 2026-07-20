# 🎵 Pulse

**The standalone desktop app for synchronized lyrics, gorgeous visualizers, and stream widgets.**

Pulse is a **native desktop application** that tracks what you're listening to and brings your music to life. Originally created as overlays for the OBS Tuna plugin, Pulse has grown into a full standalone app so you can enjoy stunning visualizers and karaoke-style lyrics right on your desktop—no streaming setup required. 

*(Streamers: Pulse features its own built-in server that replaces Tuna completely, though it remains fully compatible with Tuna if you prefer to use it!)*

---

## 🚀 Two Ways to Use Pulse

*   **For Desktop Listeners:** Enjoy a gorgeous music experience right on your screen while playing games, working, or relaxing.
*   **For Streamers:** Easily power your stream overlays and scenes in OBS. *(Pulse runs its own local server to feed data directly into OBS, replacing the need for external plugins like Tuna).*

---

## 🎨 The Collection

### ⚡ Widgets
Compact, lightweight, and customizable overlays for your stream or desktop.

*   **Compact:** A minimalist music status widget featuring dynamic color extraction based on the album art.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/widgets/compact.html`

### 🖼️ Visualizers
These tools utilize our premium glassmorphism card engine for a clean, cohesive display.

*   **Vision:** The complete cinematic package. Features a floating glassmorphism card with Album Art, Song Title, Artist, and a Progress Bar, set against a dynamic ambient background.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/visualizers/vision.html`
*   **Studio Edition:** The full lyric-integrated experience. Features the floating glassmorphism card paired with the Modern Glow lyric engine.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/visualizers/studio.html`
*   **Studio Minus Edition:** Studio Edition without lyrics, allowing for custom layering in OBS.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/visualizers/studio-minus.html`

### 🎤 Lyric Overlays
High-performance, synchronized lyric engines featuring our **Hybrid Search Strategy** (High-Precision + Fuzzy Fallback) via the [LRCLib API](https://lrclib.net/).

*   **Modern Glow (Recommended):** The latest version featuring Hybrid Search and intelligent word-sync.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/lyrics/modern-glow.html`
*   **Kinetic 3D:** High-energy, cinematic layout with 3D perspective and aggressive typography.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/lyrics/kinetic.html`
*   **Classic:** Lightweight, line-by-line scrolling.
    *   **OBS Source:** `https://pulse.jakpat.dev/overlays/lyrics/classic.html`

---

## ✨ Core Technology: The "Magic" of Word-Sync
Our lyric engine mimics a premium karaoke machine, providing precise timing even when source data is limited.

*   **Hybrid Search Logic:** Attempts a perfect match first, then automatically switches to a "Fuzzy" search with a 4-second safety window if the duration is mismatched.
*   **Predictive Weighting Algorithm:** 
    *   **Character Weighting:** Longer words are assigned more display time than shorter ones.
    *   **Punctuation Awareness:** Detects commas and periods, adding subtle pauses to mimic natural speech.
    *   **Density Scaling:** Automatically adjusts based on the "syllables-per-second" to ensure transitions are seamless.

---

## 🛠️ How to Use

### Step 1: Install and Run the Pulse Desktop App
*Everyone needs to do this step, whether you are a streamer or just want visualizers on your desktop.*
1. Download the latest release of the Pulse Desktop application from the [Releases page](https://github.com/jakpat2/Pulse/releases).
2. **Important:** Move the downloaded `.exe` to a folder where you have full write permissions (e.g., your **Documents** or **Desktop** folder). Avoid placing it in system-protected folders like `Program Files`.
3. Launch the application. Upon the first launch, Pulse will automatically create a folder named `Pulse` in the same directory as the executable.
4. Play some music! The app will automatically track your media and start its background server (on port `1608`). Use the **Pulse Hub** within the app to select your preferred desktop overlays.

---

### Step 2 (Optional): Using Pulse with OBS
*Only follow this step if you are a streamer looking to add these overlays to your OBS scenes.*
1. Keep the **Pulse Desktop App** running in the background. *(Pulse acts as its own data provider on port `1608`, completely replacing third-party plugins like Tuna while keeping full data format compatibility).*
2. In OBS, create a new **Browser Source**.
3. Paste the URL of your chosen Pulse tool or edition (listed in the collection above).
4. **Adjusting Sync (Offset):** If lyrics are consistently off, add `?offset=VALUE` to the end of your URL (Default is 1.3).
    * **To delay:** `.../?offset=2.5`
    * **To speed up:** `.../?offset=0.5`

---

## 📂 Portable Data Storage
Pulse is designed to be a portable application. All configuration files (`config.json`) and diagnostic logs are stored within the `Pulse` folder located in the same directory as your application executable. This ensures your settings are preserved even if you move the app.

---

## ⚠️ Troubleshooting
*   **App not tracking music?** Check the logs in the `Pulse/logs` folder to verify the app is running correctly. Note that Pulse uses port `1608` for its local server.
*   **OBS Overlays not showing anything?** Make sure the **Pulse Desktop App** is actively running on your computer (since it supplies the data to OBS), and that your OBS browser source URLs point to the correct files. *(Note: If you choose to use the legacy Tuna plugin instead of the Pulse app for data tracking, ensure Tuna is running on port `1608`).*

---

## 🤝 Credits
* **Lyrics API:** [LRCLib](https://lrclib.net/)
* **Apple Music API:** For getting music/album covers that got cut off by the Windows 1MB thumbnail limit.
* **Deezer API:** Used as a fallback for when the Apple Music API doesn't return cover art.

*Developed with ❤️ by jakpat.*
