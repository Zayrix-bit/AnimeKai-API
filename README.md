# 🎬 AnimeKAI Ultimate - Premium Streaming Platform

A high-performance, reverse-engineered anime streaming platform powered by Python (Flask) and a modern, glassmorphic Frontend. This project scrapes **Anikai.to** and provides a seamless, ad-free viewing experience with advanced caching and auto-resolution.

![Anikai Banner](https://via.placeholder.com/1200x400?text=AnimeKAI+Ultimate+Streaming+Experience)

## ✨ Key Features

- **🚀 Advanced Caching System:** Persistent file-based caching for instant load times (0ms on repeat visits).
- **🎭 Premium UI/UX:** Modern, glassmorphic design with smooth transitions and a "Cinema Mode" player.
- **🌐 Dual-Mode Streaming:** Supports both **SUB** and **DUB** languages with auto-detection.
- **🛠️ Iframe-Based Player:** Bypasses 403 Forbidden errors by using the original embed player from Anikai.
- **🔍 Smart Search:** Global search with instant results and persistent state on reload.
- **📱 Responsive Design:** Fully optimized for Desktop and Mobile browsers.
- **⚡ Zero-Setup Launcher:** One-click startup with automatic dependency installation.

## 🛠️ Technology Stack

- **Backend:** Python 3.x, Flask, BeautifulSoup4, Requests.
- **Frontend:** HTML5, Vanilla CSS3 (Custom Glassmorphism), Javascript (ES6+).
- **Icons & Fonts:** FontAwesome 6, Google Fonts (Outfit, JetBrains Mono).

## 🚀 Quick Start (Windows)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/anikai-ultimate.git
   cd anikai-ultimate
   ```

2. **Run the Launcher:**
   Just double-click on `run_anikai.bat`. 
   
   *This script will automatically install all missing libraries and start both the backend and frontend servers for you.*

3. **Enjoy!**
   The site will automatically open at `http://localhost:3000`.

## 📦 Manual Installation (Linux/Mac)

If you're not on Windows, follow these steps:

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start Backend (Port 5000):**
   ```bash
   python anikai_scraper.py
   ```

3. **Start Frontend (Port 3000):**
   ```bash
   cd frontend
   python3 -m http.server 3000
   ```

## 📂 Project Structure

```text
├── anikai_scraper.py   # Flask Backend & Scraper Engine
├── requirements.txt    # Python Dependencies
├── run_anikai.bat      # Zero-Setup Launcher (Windows)
├── cache.json          # Persistent Data Cache (Generated)
└── frontend/
    ├── index.html      # Main UI Structure
    ├── style.css       # Premium Styling
    └── script.js       # Frontend Logic & Routing
```

## 🛡️ Disclaimer
This project is for educational purposes only. All content is scraped from public sources. We do not host any files on our servers.

---
Developed with ❤️ by **Zayrix-bit**
