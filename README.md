# 🎵 Tuna Lyrics OBS Overlay
A high-performance, visually stunning OBS browser overlay for synchronized lyrics. Built specifically for the [Tuna OBS Plugin](https://github.com/univrsal/tuna).

> **The Upgrade:** This project was born out of frustration with the original Tuna overlay's reliability. By connecting directly to the **official LRCLib API** and using a smarter search system, this overlay finds lyrics for songs that the original simply can't.

---

## 🚀 Why use this?
1. **Reliability:** The original Tuna overlay uses a self-hosted lyrics database that is missing songs. This version talks directly to the official **LRCLib API**.
2. **Triple-Fallback Search:** * **Duration Match:** Uses the exact song length for high-precision sync.
    * **Metadata Match:** Direct Title + Artist lookup.
    * **Broad Search:** A "Hail Mary" search to find lyrics even if the song metadata is messy.
3. **Premium Visuals:** Features an "Apple Music" style aesthetic with glowing effects and smooth, hardware-accelerated motion.

## ✨ Features
* **Word-by-Word Highlighting:** Real-time tracking *within* the line for a premium karaoke feel.
* **Hardware Accelerated:** Optimized CSS blurs and transforms to keep OBS CPU usage low.
* **Dynamic Masking:** Built-in transparency gradients so lyrics fade elegantly at the edges.
* **Dynamic Offset:** Fine-tune your sync via the OBS URL without touching code.

---

## 🚀 How to Use

### 1. Requirements
* Install the [Tuna Plugin](https://github.com/univrsal/tuna) for OBS.
* Ensure the Tuna web server is running (Default port: `1608`).

### 2. Setup OBS
1. Create a new **Browser Source** in OBS.
2. Use the URL for the version you prefer:

#### 🌟 Modern Glow (Version 2 - Recommended)
The latest version with reliability fixes and word-sync.
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/`

#### 📜 Classic (Version 1)
The original lightweight version with simple line-by-line scrolling.
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/v1.html`

---

## 🕒 Adjusting Sync (Offset)
If the lyrics are consistently too fast or too slow, add `?offset=VALUE` to the end of your URL in the Browser Source:
* **To delay lyrics:** `.../?offset=2.5`
* **To speed them up:** `.../?offset=0.5`
*(Default is 1.3)*

---

## ℹ️ Technical Note on Word-Sync
Most lyrics in the **LRCLib** database are synchronized by **line**, not by individual word. 
* This overlay uses an **intelligent prediction algorithm** to estimate word timings based on character length and line duration.
* While it feels incredibly smooth for most songs, it may not be 100% perfect for tracks with unusual vocal rhythms (like rapid-fire rap or long sustained notes).

---

## 🛠️ Troubleshooting

### "Waiting for music..." stays on screen?
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
