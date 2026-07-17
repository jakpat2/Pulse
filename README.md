> **⚠️ NOTICE:** Tuna Suite is currently transitioning and merging into **Pulse**. Please pardon our dust while we update our branding and documentation.
> The new home for all overlays and tools is: [pulse.jakpat.dev](https://pulse.jakpat.dev)

# 🎵 Pulse

**The premium all-in-one suite for synchronized lyrics, visualizers, and stream widgets.**

Pulse is the unified platform for high-performance overlays. Whether you are a streamer using OBS or a desktop user looking for a seamless listening experience, Pulse provides the tools you need in one cohesive package.

---

## 🚀 Two Ways to Use Pulse

Pulse is designed to be as flexible as your workflow:

*   **Pulse Desktop:** The native, all-in-one application for a premium, localized experience.
*   **OBS Integration:** Power your stream scenes using the **Tuna OBS Plugin**.

---

## 🎨 The Collection

### ⚡ Widgets
Compact, lightweight, and customizable overlays for your stream or desktop.

*   **Compact:** A minimalist music status widget featuring dynamic color extraction based on the album art.
    *   **Pulse Desktop:** Use the "Open in App" feature.
    *   **OBS Source:** `https://pulse.jakpat.dev/widgets/compact.html`

### 🖼️ Visualizers
These tools utilize our premium glassmorphism card engine for a clean, cohesive display.

*   **Vision:** The complete cinematic package. Features a floating glassmorphism card with Album Art, Song Title, Artist, and a Progress Bar, set against a dynamic ambient background.
    *   **OBS Source:** `https://pulse.jakpat.dev/visualizers/vision.html`
*   **Studio Edition:** The full lyric-integrated experience. Features the floating glassmorphism card paired with the Modern Glow lyric engine.
    *   **OBS Source:** `https://pulse.jakpat.dev/visualizers/studio.html`
*   **Studio Minus Edition:** Studio Edition without lyrics, allowing for custom layering in OBS.
    *   **OBS Source:** `https://pulse.jakpat.dev/visualizers/studio-minus.html`

### 🎤 Lyric Overlays
High-performance, synchronized lyric engines featuring our **Hybrid Search Strategy** (High-Precision + Fuzzy Fallback) via the [LRCLib API](https://lrclib.net/).

*   **Modern Glow (Recommended):** The latest version featuring Hybrid Search and intelligent word-sync.
    *   **OBS Source:** `https://pulse.jakpat.dev/lyrics/modern-glow.html`
*   **Kinetic 3D:** High-energy, cinematic layout with 3D perspective and aggressive typography.
    *   **OBS Source:** `https://pulse.jakpat.dev/lyrics/kinetic.html`
*   **Classic:** Lightweight, line-by-line scrolling.
    *   **OBS Source:** `https://pulse.jakpat.dev/lyrics/classic.html`

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

### Option A: Using Pulse Desktop
1. **Download & Install** the latest release of the Pulse Desktop application.
2. Launch Pulse; the internal server will start automatically.
3. Use the **Pulse Hub** within the app to select your preferred overlays and open them directly.

### Option B: Using the Tuna OBS Plugin
1. Install the [Tuna OBS Plugin](https://github.com/univrsal/tuna) and ensure it is running on port `1608`.
2. Create a new **Browser Source** in OBS.
3. Paste the URL of your chosen tool or edition.
4. **Adjusting Sync (Offset):** If lyrics are consistently off, add `?offset=VALUE` to the end of your URL (Default is 1.3).
    * **To delay:** `.../?offset=2.5`
    * **To speed up:** `.../?offset=0.5`

---

## ⚠️ Troubleshooting
**"Waiting for music..." stays on screen?**
*   **If using Pulse:** Ensure the Pulse Desktop app is running.
*   **If using OBS:** Make sure Tuna is running on port `1608`, make sure you have selected the right music source in Tuna. If Tuna is running on the port and you have selected the right music source try opening the overlay URL in your standard web browser. If prompted to "Allow access to applications on your device," click **Allow**. Click the Lock/Tune icon in the browser address bar to ensure Local Network access is permitted. Refresh the Browser Source in OBS.

---

## 🤝 Credits
* **Lyrics API:** [LRCLib](https://lrclib.net/)
* **OBS Integration:** [Tuna OBS Plugin](https://github.com/univrsal/tuna)
* **Apple Music API:** For getting music/album covers that got cut of by the Windows 1MB thumbnail limit.

*Developed with ❤️ by jakpat.*
