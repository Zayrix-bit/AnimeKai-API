# 🎬 AnimeKAI Ultimate - Reverse Engineered API & Scraper

<p align="center">
  <img src="https://camo.githubusercontent.com/bebb63326fe03a40c1b7ca94e4421465baaf1f22b1147389fa25a91d6dfc64b0/68747470733a2f2f616e696b61692e746f2f6173736574732f75706c6f6164732f333735383561336666613865633239326565396532323535663366363362343863656361313765663261303338362e706e67" width="500" alt="AnimeKAI Logo">
</p>

A high-performance, **reverse-engineered** anime scraping engine and REST API for **Anikai.to**. This project features advanced decryption logic to resolve direct M3U8 streaming links, bypass anti-scraping measures, and provide a seamless data layer for any anime application.

---

## ✨ Key Features

- **🚀 Direct M3U8 Resolution:** Reverse-engineered decryption logic (`Kai` and `Mega` algorithms) to fetch raw video sources.
- **⚡ Advanced Caching:** Persistent file-based cache with configurable TTL to reduce server load and ensure 0ms response times.
- **🔍 Smart Search:** High-speed global search with metadata extraction (Rating, Year, Type, Episodes).
- **🌐 Dual-Language Support:** Full support for both **SUB** and **DUB** content with automatic detection.
- **🛡️ Anti-Ban Measures:** Custom headers and session management to bypass 403 Forbidden errors.
- **🛠️ Clean API:** Well-structured RESTful endpoints returning pretty-printed JSON.

---

## 🛠️ Technology Stack

- **Backend Framework:** Python 3.x, Flask (REST API)
- **Scraping Engine:** BeautifulSoup4, Requests
- **Security Logic:** Custom Decryption Layer (AES-based reverse engineering)
- **Data Management:** JSON-based persistent caching

---

## 🚀 API Endpoints

| Endpoint | Method | Description | Sample URL |
| :--- | :---: | :--- | :--- |
| `/` | `GET` | API health check and version info. | `http://localhost:5000/` |
| `/api/home` | `GET` | Banners, Trending, and Latest Updates. | `http://localhost:5000/api/home` |
| `/api/search` | `GET` | Global search for anime. | `http://localhost:5000/api/search?keyword=naruto` |
| `/api/anime/<slug>` | `GET` | Detailed metadata and Anime ID. | `http://localhost:5000/api/anime/naruto-shippuden-1` |
| `/api/episodes/<id>`| `GET` | Full episode list with secure tokens. | `http://localhost:5000/api/episodes/12345` |
| `/api/servers/<token>`| `GET` | Available stream links and languages. | `http://localhost:5000/api/servers/ep_token_xyz` |
| `/api/source/<id>` | `GET` | **Resolver:** Direct M3U8 & skip-times. | `http://localhost:5000/api/source/link_id_abc` |

---

## 🛠️ Usage Examples

### 1. Search for Anime
```python
import requests

response = requests.get("http://localhost:5000/api/search?keyword=One Piece")
data = response.json()
print(data['results'][0]['title'])
```

### 2. Fetch Direct Stream Links
```bash
curl http://localhost:5000/api/source/YOUR_LINK_ID
```

---

## 📦 Installation & Setup

### Windows (Quick Start)
Just double-click on `run_anikai.bat`. This script will:
1. Create a virtual environment (if needed).
2. Install all dependencies from `requirements.txt`.
3. Start the Flask API and the local frontend server.

### Linux / Mac (Manual)
1. **Clone & Navigate:**
   ```bash
   git clone https://github.com/Zayrix-bit/AnimeKai-API.git
   cd AnimeKai-API
   ```
2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Start the API:**
   ```bash
   python anikai_scraper.py
   ```
   *The API will be available at `http://localhost:5000`*

---

## 📂 Project Structure

```text
├── anikai_scraper.py   # Main API Engine & Scraper Logic
├── requirements.txt    # Python Dependencies
├── run_anikai.bat      # Windows One-Click Launcher
├── cache.json          # Persistent Data Cache (Auto-generated)
└── frontend/           # Optional: Premium Glassmorphic Web UI
    ├── index.html      
    ├── style.css       
    └── script.js       
```

---

## 🛡️ Disclaimer
This project is for **educational purposes only**. It is a reverse-engineering exercise to understand web security and API design. We do not host any copyrighted content. All data is fetched from public sources.

---
Developed with ❤️ by **[Zayrix-bit](https://github.com/Zayrix-bit)**
