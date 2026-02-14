function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('toolmania-favorites') || '[]');
    const list = document.getElementById('favorites-list');
    list.innerHTML = '';
    favorites.forEach(tool => {
        const li = document.createElement('li');
        li.textContent = tool.uiName;
        li.onclick = () => window.location.href = tool.route + '/index.html';
        list.appendChild(li);
    });
    // Update favorite buttons
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

function toggleFavorite(route, uiName) {
    event.preventDefault();
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('toolmania-favorites') || '[]');
    const existingIndex = favorites.findIndex(f => f.route === route);
    if (existingIndex !== -1) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.push({ route, uiName });
    }
    localStorage.setItem('toolmania-favorites', JSON.stringify(favorites));
    loadFavorites();
}

window.onload = loadFavorites;