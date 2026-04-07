# 🎵 Tuna Lyrics OBS Overlay
A high-performance, visually stunning OBS browser overlay for synchronized lyrics. Built specifically for the [Tuna OBS Plugin](https://github.com/univrsal/tuna).

> **The Upgrade:** This project solves the common "Lyrics Not Found" issue. By using a **Hybrid Search Strategy** (High-Precision + Fuzzy Fallback) via the official [LRCLib API](https://lrclib.net/), this overlay finds synchronized lyrics that other tools miss.

---

## 🚀 Why use this?
1. **Hybrid Search Logic:** Most overlays fail if the song duration is off by even one second. This version tries a perfect match first, then automatically switches to a "Fuzzy" search with a 4-second safety window.
2. **Strict Accuracy:** Unlike "grab-anything" scripts, this verifies track names before displaying lyrics, ensuring you don't see a remix's lyrics over an original song.
3. **Premium Visuals:** "Apple Music" style aesthetic with glowing effects, hardware-accelerated motion, and dynamic edge-fading.

## ✨ Features
* **Intelligent Word-Sync:** Real-time tracking *within* the line for a premium karaoke feel.
* **Low CPU Impact:** Optimized CSS blurs and transforms to keep OBS usage minimal.
* **Auto-Correction:** Built-in "Drift Correction" to stay perfectly in sync even if your stream lag fluctuates.
* **Customizable Offset:** Fine-tune timing via the OBS URL without touching a single line of code.

---

## ⚙️ How it Works (The "Magic" of Word-Sync)
This overlay is designed to feel like a premium karaoke machine, even though most lyrics in the **LRCLib** database only provide timestamps for the *start* of each line.

* **The Problem:** The overlay only knows when a line starts (e.g., `[00:12.50]`) and the current time from Tuna. It has no native data on when individual words are spoken.
* **The Solution:** Our custom **Predictive Weighting Algorithm** calculates the most likely timing for every word in real-time.
    * **Character Weighting:** Longer words are assigned more "time" than shorter ones.
    * **Punctuation Awareness:** The engine detects commas and periods, adding subtle pauses to mimic natural human speech.
    * **Density Scaling:** It automatically speeds up or slows down based on the "syllables-per-second" of the line to ensure the highlight reaches the end of the sentence exactly when the next line begins.

---

## 🚀 How to Use

### 1. Requirements
* Install the [Tuna Plugin](https://github.com/univrsal/tuna) for OBS.
* Ensure Tuna is running on port: `1608`.

### 2. Setup OBS
1. Create a new **Browser Source** in OBS.
2. Use the URL for the version you prefer:

#### 🌟 Modern Glow (Recommended)
The latest version with the Hybrid Search engine and word-sync. (This is the main version)
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/`

#### 🔥 Kinetic 3D
A high-energy, cinematic layout featuring 3D perspective, motion blur, and aggressive typography that "punches" through the screen.
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/kinetic.html`

#### 📜 Classic
An archive of the original, lightweight version with simple line-by-line scrolling. *(Note: Does not include Hybrid Search or Word-Sync).*
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/classic.html`

---

## 🕒 Adjusting Sync (Offset)
If the lyrics are consistently too fast or too slow, add `?offset=VALUE` to the end of your URL in the Browser Source:
* **To delay lyrics (move them later):** `.../?offset=2.5`
* **To speed them up (move them earlier):** `.../?offset=0.5`
*(Default is 1.3)*

---

## 🛠️ Troubleshooting

**"Waiting for music..." stays on screen?**
If you are playing music but the overlay isn't updating:
1. Open the overlay URL in your standard web browser.
2. If prompted to **"Allow access to applications on your device,"** click **Allow**.
3. If no prompt appears, click the **Lock/Tune icon** in the address bar and ensure **Local Network access** or **Insecure Content** is allowed.
4. Refresh the Browser Source in OBS.

---

## 🤝 Credits
* **Lyrics API:** [LRCLib](https://lrclib.net/)
* **Core Plugin:** [Tuna](https://github.com/univrsal/tuna)

*Developed with ❤️ by jakpat.*
