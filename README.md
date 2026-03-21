# 🎵 Tuna Lyrics OBS Overlay
A beautiful, high-performance OBS browser overlay for synchronized lyrics. This project fetches real-time data from [LRCLib](https://lrclib.net/) and integrates seamlessly with the [Tuna OBS Plugin](https://github.com/univrsal/tuna).

> **The Upgrade:** While the default Tuna overlay is functional, it lacks visual flair. This version provides a modern aesthetic with glowing effects, smooth motion, and word-by-word highlighting.

---

## ✨ Features
* **Word-by-Word Highlighting:** Real-time tracking *within* the line for a premium karaoke feel.
* **Triple-Fallback Search:** 1. **Duration Match:** Uses exact song length for high-precision sync.
    2. **Metadata Match:** Direct Title + Artist lookup.
    3. **Broad Search:** Fallback query to find lyrics even with messy metadata.
* **Hardware Accelerated:** Uses CSS blurs and transforms optimized for OBS performance.
* **Dynamic Offset:** Easily fine-tune your sync via the OBS URL.

---

## 🚀 How to Use

### 1. Requirements
* Install the [Tuna Plugin](https://github.com/univrsal/tuna) for OBS.
* Ensure the Tuna web server is running (Default port: `1608`).

### 2. Setup OBS
1. Create a new **Browser Source** in OBS.
2. Use the URL for the version you prefer:

#### 🌟 Modern Glow (Version 2 - Recommended)
Features word-highlighting and smooth glow.
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/`

#### 📜 Classic (Version 1)
The original lightweight version with simple line-by-line scrolling.
**URL:** `https://jakpat.dev/Tuna-Lyrics-OBS-Overlay/v1.html`

---

## 🕒 Adjusting Sync (Offset)
If the lyrics are consistently too fast or too slow for your specific player, you can adjust the timing directly in the OBS URL without changing any code.

Simply add `?offset=VALUE` to the end of your URL in the Browser Source:
* **To delay lyrics:** `.../?offset=2.5`
* **To speed them up:** `.../?offset=0.5`
*(Default is 1.3)*

---

## ℹ️ Technical Note on Word-Sync
Please note that most lyrics in the **LRCLib** database are synchronized by **line**, not by individual word. 
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
