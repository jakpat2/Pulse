# 🎵 Tuna-Suite
A premium collection of high-performance OBS browser overlays and visualizers. Built specifically for the [Tuna OBS Plugin](https://github.com/univrsal/tuna).

---

## 🎨 The Collection

### ⚡ Widgets
Compact, lightweight, and customizable overlays for your stream.

* **Compact:** A minimalist music status widget featuring dynamic color extraction based on the album art.
    * **URL:** `https://tuna.jakpat.dev/widgets/compact.html`

### 🖼️ Visualizers
These tools utilize our premium glassmorphism card engine for a clean, cohesive display.

* **Vision:** The complete cinematic package. This version features the signature floating glassmorphism card with Album Art, Song Title, Artist, and a Progress Bar, set against an ambient, dynamically extended background.
    * **URL:** `https://tuna.jakpat.dev/visualizers/vision.html`
* **Studio Edition:** The full lyric-integrated experience. Features the same floating glassmorphism card with Album Art, Song Title, Artist, and a Progress Bar, paired with the Modern Glow lyric engine.
    * **URL:** `https://tuna.jakpat.dev/visualizers/studio.html`
* **Studio Minus Edition:** Studio Edition but without lyrics. Allowing you to put anything you want on top of it in OBS.
    * **URL:** `https://tuna.jakpat.dev/visualizers/studio-minus.html`

### 🎤 Lyric Overlays
High-performance, synchronized lyric engines featuring our **Hybrid Search Strategy** (High-Precision + Fuzzy Fallback) via the [LRCLib API](https://lrclib.net/).

* **Modern Glow (Recommended):** The latest version featuring the Hybrid Search engine and intelligent word-sync.
    * **URL:** `https://tuna.jakpat.dev/lyrics/modern-glow.html`
* **Kinetic 3D:** High-energy, cinematic layout with 3D perspective and aggressive typography.
    * **URL:** `https://tuna.jakpat.dev/lyrics/kinetic.html`
* **Classic:** Lightweight, line-by-line scrolling. *(No Hybrid Search/Word-Sync).*
    * **URL:** `https://tuna.jakpat.dev/lyrics/classic.html`

---

## ✨ Core Technology
### The "Magic" of Word-Sync
Our lyric engine feels like a premium karaoke machine, even though most LRCLib data only provides timestamps for the start of each line.

* **Hybrid Search Logic:** Most overlays fail if the song duration is off by even one second. This version tries a perfect match first, then automatically switches to a "Fuzzy" search with a 4-second safety window.
* **Predictive Weighting Algorithm:** Since the overlay only knows when a line starts, it calculates word timing in real-time:
    * **Character Weighting:** Longer words are assigned more "time" than shorter ones.
    * **Punctuation Awareness:** Detects commas and periods, adding subtle pauses to mimic natural speech.
    * **Density Scaling:** Automatically adjusts based on the "syllables-per-second" to ensure the highlight ends exactly when the next line begins.

---

## 🚀 How to Use

### 1. Requirements
* Install the [Tuna Plugin](https://github.com/univrsal/tuna) for OBS.
* Ensure Tuna is running on port: `1608`.

### 2. Setup OBS
1. Create a new **Browser Source** in OBS.
2. Use the URL for the specific tool or edition you prefer.

### 🕒 Adjusting Sync (Offset)
If lyrics are consistently off, add `?offset=VALUE` to the end of your URL:
* **To delay:** `.../?offset=2.5`
* **To speed up:** `.../?offset=0.5`
*(Default is 1.3)*

---

## 🛠️ Troubleshooting
**"Waiting for music..." stays on screen?**
1. Open the overlay URL in your standard web browser.
2. If prompted to **"Allow access to applications on your device,"** click **Allow**.
3. If no prompt appears, click the **Lock/Tune icon** in the address bar and ensure **Local Network access** or **Insecure Content** is allowed.
4. Refresh the Browser Source in OBS.

---

## 🤝 Credits
* **Lyrics API:** [LRCLib](https://lrclib.net/)
* **Core Plugin:** [Tuna](https://github.com/univrsal/tuna)

*Developed with ❤️ by jakpat.*
