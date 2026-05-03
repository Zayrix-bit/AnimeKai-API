const API_BASE = 'http://localhost:5000/api';
let art = null;

// UI Elements
const sections = {
    home: document.getElementById('home-section'),
    search: document.getElementById('search-section'),
    detail: document.getElementById('detail-section'),
    player: document.getElementById('player-section')
};

const loading = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Utility Functions
const showSection = (name) => {
    Object.keys(sections).forEach(key => {
        sections[key].classList.add('hidden');
        sections[key].classList.remove('active');
    });
    
    // Stop video if leaving player
    if (name !== 'player') {
        const playerContainer = document.getElementById('artplayer');
        if (playerContainer) playerContainer.innerHTML = '';
    }

    sections[name].classList.remove('hidden');
    sections[name].classList.add('active');
    window.scrollTo(0, 0);
};

const showLoading = (show) => {
    loading.classList.toggle('hidden', !show);
};

const fetchData = async (endpoint) => {
    try {
        showLoading(true);
        const res = await fetch(`${API_BASE}${endpoint}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('API Error:', err);
        return null;
    } finally {
        showLoading(false);
    }
};

// --- Routing Logic ---
const handleRouting = async () => {
    const hash = window.location.hash;
    
    if (!hash || hash === '#home') {
        loadHome();
    } else if (hash.startsWith('#search/')) {
        const query = decodeURIComponent(hash.split('#search/')[1]);
        searchInput.value = query;
        performSearch(query);
    } else if (hash.startsWith('#anime/')) {
        const slug = hash.split('#anime/')[1];
        loadAnimeDetail(slug, false); // false = don't update hash
    } else if (hash.startsWith('#watch/')) {
        // Format: #watch/slug/ani_id/ep_number/ep_token
        const parts = hash.split('/');
        const slug = parts[1];
        const aniId = parts[2];
        const epNum = parts[3];
        const epToken = parts[4];
        
        // Load details first to show titles
        await loadAnimeDetail(slug, false);
        playEpisode({ number: epNum, token: epToken, title: `Episode ${epNum}` }, false);
    }
};

// Rendering Functions
const createAnimeCard = (anime) => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
        <img class="card-poster" src="${anime.poster}" alt="${anime.title}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Image'">
        <div class="card-episodes">${anime.sub_episodes || anime.total_episodes || '?'} EP</div>
        <div class="card-info">
            <h3 class="card-title">${anime.title}</h3>
            <div class="card-meta">
                <span>${anime.type || 'TV'}</span>
                <span>${anime.rating || 'N/A'}</span>
            </div>
        </div>
    `;
    card.onclick = () => {
        const slug = anime.slug || anime.url.split('/watch/')[1];
        window.location.hash = `#anime/${slug}`;
    };
    return card;
};

// Page Loaders
const loadHome = async () => {
    window.location.hash = '#home';
    showSection('home');
    const data = await fetchData('/home');
    if (!data) return;

    const latestGrid = document.getElementById('latest-updates');
    if (!data || !data.latest_updates || data.latest_updates.length === 0) {
        latestGrid.innerHTML = '<p style="padding: 20px; color: var(--text-dim);">No data found. The scraper might be experiencing issues with Anikai.to. Please try again later.</p>';
        return;
    }
    latestGrid.innerHTML = '';
    data.latest_updates.forEach(anime => {
        latestGrid.appendChild(createAnimeCard(anime));
    });

    const trendingGrid = document.getElementById('trending-grid');
    trendingGrid.innerHTML = '';
    // Use 'NOW' trending by default
    const trendingNow = data.top_trending.NOW || [];
    trendingNow.forEach(anime => {
        trendingGrid.appendChild(createAnimeCard(anime));
    });
};

const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query) window.location.hash = `#search/${encodeURIComponent(query)}`;
};

const performSearch = async (query) => {
    showSection('search');
    document.getElementById('search-title').innerText = `Search Results for "${query}"`;
    const data = await fetchData(`/search?keyword=${encodeURIComponent(query)}`);
    
    const resultsGrid = document.getElementById('search-results');
    resultsGrid.innerHTML = '';
    
    if (data && data.results) {
        data.results.forEach(anime => {
            resultsGrid.appendChild(createAnimeCard(anime));
        });
    } else {
        resultsGrid.innerHTML = '<p>No results found.</p>';
    }
};

const loadAnimeDetail = async (slug, updateHash = true) => {
    if (updateHash) window.location.hash = `#anime/${slug}`;
    showSection('detail');
    const data = await fetchData(`/anime/${slug}`);
    if (!data) return;

    document.getElementById('detail-hero').style.backgroundImage = `url(${data.banner})`;
    document.getElementById('anime-poster').src = data.poster;
    const title = data.title;
    document.getElementById('anime-title').innerText = title;
    document.getElementById('anime-desc').innerText = data.description;
    
    const meta = document.getElementById('anime-meta');
    meta.innerHTML = `
        <span><i class="fas fa-star"></i> ${data.mal_score || 'N/A'}</span>
        <span><i class="fas fa-clock"></i> ${data.type}</span>
        <span><i class="fas fa-calendar"></i> ${data.detail.release || 'N/A'}</span>
    `;

    loadEpisodes(data.ani_id, slug);
};

const loadEpisodes = async (aniId, slug) => {
    const data = await fetchData(`/episodes/${aniId}`);
    if (!data) return;

    const grid = document.getElementById('episode-grid');
    grid.innerHTML = '';
    document.getElementById('episode-count').innerText = `${data.count} Episodes`;

    data.episodes.forEach(ep => {
        const btn = document.createElement('div');
        btn.className = 'ep-btn';
        btn.innerText = ep.number;
        btn.onclick = () => {
            window.location.hash = `#watch/${slug}/${aniId}/${ep.number}/${ep.token}`;
        };
        grid.appendChild(btn);
    });
};

let currentServers = {};
let currentLang = 'sub';

const playEpisode = async (episode, updateHash = true) => {
    showSection('player');
    document.getElementById('playing-title').innerText = document.getElementById('anime-title').innerText;
    document.getElementById('playing-episode').innerText = `Episode ${episode.number}: ${episode.title}`;

    const data = await fetchData(`/servers/${episode.token}`);
    if (!data) return;

    currentServers = data.servers;
    
    // Check availability
    const hasSub = (currentServers.sub && currentServers.sub.length > 0) || (currentServers.softsub && currentServers.softsub.length > 0);
    const hasDub = currentServers.dub && currentServers.dub.length > 0;

    const subBtn = document.getElementById('sub-btn');
    const dubBtn = document.getElementById('dub-btn');

    subBtn.disabled = !hasSub;
    dubBtn.disabled = !hasDub;

    // Set default lang
    currentLang = hasSub ? 'sub' : (hasDub ? 'dub' : 'sub');
    updateLangUI();
    renderServers();
};

const updateLangUI = () => {
    document.getElementById('sub-btn').classList.toggle('active', currentLang === 'sub');
    document.getElementById('dub-btn').classList.toggle('active', currentLang === 'dub');
};

const renderServers = () => {
    const serverList = document.getElementById('server-list');
    serverList.innerHTML = '';

    const langKey = currentLang === 'sub' ? (currentServers.sub ? 'sub' : 'softsub') : 'dub';
    const servers = currentServers[langKey] || [];

    servers.forEach((srv, index) => {
        const btn = document.createElement('button');
        btn.className = 'server-btn' + (index === 0 ? ' active' : '');
        btn.innerText = srv.name;
        btn.onclick = (e) => {
            document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadSource(srv.link_id);
        };
        serverList.appendChild(btn);
    });

    if (servers.length > 0) {
        loadSource(servers[0].link_id);
    } else {
        document.getElementById('artplayer').innerHTML = '<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-dim);">No servers found for this language.</div>';
    }
};

// Event Listeners for Lang Toggle
document.getElementById('sub-btn').onclick = () => {
    if (currentLang !== 'sub') {
        currentLang = 'sub';
        updateLangUI();
        renderServers();
    }
};

document.getElementById('dub-btn').onclick = () => {
    if (currentLang !== 'dub') {
        currentLang = 'dub';
        updateLangUI();
        renderServers();
    }
};

const loadSource = async (linkId) => {
    const data = await fetchData(`/source/${linkId}`);
    
    if (!data || !data.embed_url) {
        console.error('Source resolution failed:', data);
        alert('Could not load the player. This server might be down.');
        return;
    }

    const embedUrl = data.embed_url;
    console.log('Loading Embed Player:', embedUrl);

    const playerContainer = document.getElementById('artplayer');
    
    // Add loader
    playerContainer.innerHTML = `
        <div class="player-loader" id="p-loader">
            <i class="fas fa-circle-notch fa-spin"></i>
            <p style="color: var(--text-dim); font-weight: 600;">Securing Stream...</p>
        </div>
        <iframe 
            src="${embedUrl}" 
            id="stream-iframe"
            style="width:100%; height:100%; border:none; opacity: 0; transition: opacity 0.5s ease;" 
            allowfullscreen 
            allow="autoplay; encrypted-media"
            referrerpolicy="no-referrer">
        </iframe>
    `;

    const iframe = document.getElementById('stream-iframe');
    const loader = document.getElementById('p-loader');

    iframe.onload = () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            iframe.style.opacity = '1';
        }, 500);
    };
};

// Event Listeners
searchBtn.onclick = handleSearch;
searchInput.onkeyup = (e) => e.key === 'Enter' && handleSearch();
document.querySelector('.logo').onclick = () => window.location.href = '/';

// Router Initialize
window.addEventListener('hashchange', handleRouting);
window.onload = handleRouting;
