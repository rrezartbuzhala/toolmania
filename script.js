const appId = 'toolmania';

function loadTools(searchTerm = '') {
    const container = document.getElementById('tools-container');
    if (!container) return; // Only load tools if container exists
    const favorites = JSON.parse(localStorage.getItem(`${appId}-favorites`) || '[]');
    const isFavoritesPage = window.location.pathname.includes('favorites');
    let toolsToShow = isFavoritesPage ? tools.filter(tool => favorites.some(f => f.route === tool.id)) : tools;
    
    if (searchTerm) {
        toolsToShow = toolsToShow.filter(tool => 
            tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    container.innerHTML = '';
    toolsToShow.forEach(tool => {
        const toolCard = document.createElement('a');
        toolCard.href = `${tool.id}/index.html`;
        toolCard.className = 'tool-card';
        toolCard.dataset.tool = tool.id;
        toolCard.style.backgroundImage = `url('${tool.thumbnail}')`;
        toolCard.style.backgroundSize = 'cover';

        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.textContent = favorites.some(f => f.route === tool.id) ? '★' : '☆';
        favoriteBtn.onclick = (event) => toggleFavorite(event, tool.id, tool.title);

        const toolDetails = document.createElement('div');
        toolDetails.className = 'tool-details';

        const toolTitle = document.createElement('div');
        toolTitle.className = 'tool-title';
        toolTitle.textContent = tool.title;

        const toolDescription = document.createElement('div');
        toolDescription.className = 'tool-description';
        toolDescription.textContent = tool.description;

        toolDetails.appendChild(toolTitle);
        toolDetails.appendChild(toolDescription);

        toolCard.appendChild(favoriteBtn);
        toolCard.appendChild(toolDetails);

        container.appendChild(toolCard);
    });
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem(`${appId}-favorites`) || '[]');
    const list = document.getElementById('favorites-list');
    if (list) {
        list.innerHTML = '';
        favorites.forEach(tool => {
            const li = document.createElement('li');
            li.textContent = tool.uiName;
            li.onclick = () => window.location.href = tool.route + '/index.html';
            list.appendChild(li);
        });
    }
    // Update favorite buttons (only on index page, since favorites page sets them in loadTools)
    if (!window.location.pathname.includes('favorites')) {
        document.querySelectorAll('.tool-card[data-tool]').forEach(card => {
            const route = card.dataset.tool;
            const btn = card.querySelector('.favorite-btn');
            if (favorites.some(f => f.route === route)) {
                btn.textContent = '★';
            } else {
                btn.textContent = '☆';
            }
        });
    }
}

function toggleFavorite(event, route, uiName) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    let favorites = JSON.parse(localStorage.getItem(`${appId}-favorites`) || '[]');
    const existingIndex = favorites.findIndex(f => f.route === route);
    const isFavorited = existingIndex !== -1;
    
    if (window.location.pathname.includes('favorites') && isFavorited) {
        if (!confirm('Are you sure you want to remove this from favorites?')) return;
    }
    
    if (isFavorited) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.push({ route, uiName });
    }
    localStorage.setItem(`${appId}-favorites`, JSON.stringify(favorites));
    
    if (window.location.pathname.includes('favorites')) {
        loadTools();
    } else {
        loadFavorites();
    }
}

window.onload = () => {
    loadTools();
    loadFavorites();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            loadTools(e.target.value);
        });
    }
};