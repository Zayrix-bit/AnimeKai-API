# 🎬 AnimeKAI - Reverse Engineered API & Scraper

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

### 🏠 API Root
> **GET** `/`  
> Health check and version metadata.
```http
http://localhost:5000/
```

### 📺 Home Dashboard
> **GET** `/api/home`  
> Returns banners, trending anime (Day/Week/Month), and latest updates.
```http
http://localhost:5000/api/home
```

### 🔍 Global Search
> **GET** `/api/search?keyword={query}`  
> Search for any anime with detailed stats.
```http
http://localhost:5000/api/search?keyword=naruto
```

### ℹ️ Anime Info
> **GET** `/api/anime/{slug}`  
> Detailed metadata, seasons, and internal Anime ID.
```http
http://localhost:5000/api/anime/naruto-shippuden-1
```

### 📜 Episode List
> **GET** `/api/episodes/{ani_id}`  
> Full list of episodes with secure tokens and language support flags.
```http
http://localhost:5000/api/episodes/c4S88Q
```

### 🖥️ Server List
> **GET** `/api/servers/{ep_token}`  
> Lists available stream links and server identifiers.
```http
http://localhost:5000/api/servers/e9298OH2tROylH1c0ceX
```

### ⚡ Direct Resolver
> **GET** `/api/source/{link_id}`  
> **The Core Resolver:** Decrypts and returns direct M3U8 links & skip-times.
```http
http://localhost:5000/api/source/dIOz9qam5Q
```

---

## 📊 Live API Data Preview

### 1. Dashboard (`/api/home`)
**Real-time response example:**
```json
{
    "Author": "Zayrix-bit",
    "banner": [
        {
            "title": "Daemons of the Shadow Realm",
            "japanese_title": "Yomi no Tsugai",
            "type": "TV",
            "sub_episodes": "5",
            "dub_episodes": "4",
            "quality": "HD",
            "release": "2026"
        },
        {
            "title": "One Piece",
            "japanese_title": "ONE PIECE",
            "sub_episodes": "1159",
            "dub_episodes": "1155"
        }
    ],
    "success": true
}
```

### 2. Search Results (`/api/search?keyword=Naruto`)
**Real-time response example:**
```json
{
    "Author": "Zayrix-bit",
    "keyword": "Naruto",
    "results": [
        {
            "title": "Naruto",
            "japanese_title": "NARUTO",
            "slug": "naruto-9r5k",
            "year": "2002",
            "total_episodes": "220"
        },
        {
            "title": "Naruto Shippuden",
            "japanese_title": "NARUTO: Shippuuden",
            "slug": "naruto-shippuuden-mv9v",
            "year": "2007"
        }
    ],
    "success": true
}
```

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
curl http://localhost:5000/api/source/dIOz9qam5Q
```

---

## 📦 Installation & Setup

### Windows (Quick Start)
1. **1-Click Startup:** Just double-click on **`run_anikai.bat`**. This script will install dependencies and start both the API and Frontend.
2. **Manual Startup (Terminal):** If you prefer running manually, open two terminals:
   - **Terminal 1 (Backend):** `python anikai_scraper.py` (Runs on Port 5000)
   - **Terminal 2 (Frontend):** `cd frontend` then `python -m http.server 3000` (Runs on Port 3000)

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
