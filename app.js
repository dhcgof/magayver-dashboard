/**
 * App Magayver - Renderiza dados na interface
 * Versão para lojas: Colombo, Multiloja, Lojas MM, Casas Bahia, Magazine Luiza, Pontarollo
 */

document.addEventListener('DOMContentLoaded', function() {
    renderPage();
});

function renderPage() {
    // Atualiza timestamp
    document.getElementById('lastUpdate').textContent = 
        `Atualizado: ${magayverData.lastUpdate}`;
    
    // Renderiza lojas monitoradas
    renderMonitoredStores();
    
    // Renderiza destaques
    renderHighlights();
    
    // Renderiza lojas em detalhe
    renderStores();
    
    // Renderiza tendências
    renderTrends();
    
    // Renderiza análise
    renderAnalysis();
    
    // Renderiza notícias
    renderNews();
    
    // Renderiza Instagram
    renderInstagram();
    
    // Renderiza métricas
    renderMetrics();
}

function renderMonitoredStores() {
    const container = document.getElementById('monitoredStores');
    if (!container) return;
    
    container.innerHTML = magayverData.monitoredStores.map(store => `
        <div class="store-badge">
            <span class="store-name">${store.name}</span>
            <span class="store-segment">${store.segment}</span>
        </div㸮
    `).join('');
}

function renderHighlights() {
    const container = document.getElementById('highlights');
    container.innerHTML = magayverData.highlights.map(item => `
        <div class="highlight-item">
            <span class="highlight-number">${item.number}</span>
            <div class="highlight-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

function renderStores() {
    const container = document.getElementById('storeList');
    container.innerHTML = magayverData.stores.map(store => {
        const statusEmoji = store.status === 'alta' ? '🟢' : 
                           store.status === 'recuperação' ? '🟡' : '⚪';
        return `
            <li class="store-item">
                <div class="store-main"㸾
                    ${statusEmoji} <strong>${store.name}</strong>
                    <span class="trend-badge ${store.trend.startsWith('+') ? 'positive' : 'negative'}">${store.trend}</span>
                </div>
                <div class="store-details">
                    <span class="instagram"㸾📷 ${store.instagram}</span>
                    <span class="highlight-text">${store.highlight}</span>
                </div>
            </li>
        `;
    }).join('');
}

function renderTrends() {
    const container = document.getElementById('trends');
    container.innerHTML = magayverData.trends.map(trend => {
        const directionClass = trend.direction === 'up' ? 'trend-up' : 
                              trend.direction === 'down' ? 'trend-down' : 'trend-neutral';
        const arrow = trend.direction === 'up' ? '↑' : 
                     trend.direction === 'down' ? '↓' : '→';
        return `
            <div class="trend-item"㸾
                <span class="trend-name">${trend.name}</span>
                <span class="trend-value ${directionClass}">${arrow} ${trend.value}</span>
            </div>
        `;
    }).join('');
}

function renderAnalysis() {
    const container = document.getElementById('analysis');
    container.innerHTML = magayverData.analysis;
}

function renderNews() {
    const container = document.getElementById('newsList');
    container.innerHTML = magayverData.news.map(news => {
        // Destaca o nome da loja no início da notícia
        const parts = news.split(':');
        if (parts.length > 1) {
            return `
                <li>
                    <strong class="news-store"㸾${parts[0]}:</strong>
                    ${parts.slice(1).join(':')}
                </li>
            `;
        }
        return `<li>${news}</li>`;
    }).join('');
}

function renderInstagram() {
    const container = document.getElementById('instagramHighlights');
    if (!container) return;
    
    container.innerHTML = magayverData.instagramHighlights.map(item => `
        <div class="instagram-item"㸾
            <div class="instagram-header"㸾
                <span class="instagram-store">@${item.store.toLowerCase().replace(/\s+/g, '')}</span>
                <span class="engagement-badge">${item.engagement}</span>
            </div>
            <p class="instagram-post"㸾${item.post}</p>
        </div>
    `).join('');
}

function renderMetrics() {
    const container = document.getElementById('metrics');
    container.innerHTML = `
        <div class="metric-grid"㸾
            ${magayverData.metrics.map(metric => `
                <div class="metric-item"㸾
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-label"㸾${metric.label}</div>
                </div>
            `).join('')}
        </div>
    `;
}
