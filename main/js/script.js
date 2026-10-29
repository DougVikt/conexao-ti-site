/**
 * Escapes HTML special characters to prevent XSS and rendering issues
 * @param {string} text - The text to escape
 * @returns {string} - The escaped HTML text
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Os posts do Instagram usam o script oficial de embed (sem token de acesso).

document.addEventListener('DOMContentLoaded', async () => {
    const data = window.CONEXAO_DATA;
    if (!data) {
        showDataError();
        return;
    }

    renderSocialChannels(data.SOCIAL_CHANNELS);
    renderFeaturedPosts(data.FEATURED_POSTS);
    renderPerks(data.COMMUNITY_PERKS);
    initFilters(data.FEATURED_POSTS);

    // Add event listeners for data updates
    document.addEventListener('drive-data-loaded', handleDriveDataLoaded);
    document.addEventListener('instagram-data-loaded', handleInstagramDataLoaded);
});

/* ==========================================================================
   Event listeners for data updates
   ========================================================================== */
function handleInstagramDataLoaded() {
    // The Instagram feed now uses static post URLs rendered with the official
    // embed script, so keep the complete featured posts grid (Instagram,
    // LinkedIn and Discord) when this event fires.
    renderFeaturedPosts(window.CONEXAO_DATA?.FEATURED_POSTS || []);
}

function handleDriveDataLoaded(event) {
    // Main page does not render Drive data; this listener is for consistency
    // with biblioteca.html but does nothing here.
    // console.log('Drive data loaded event received on main page (no-op)');
}

/* ==========================================================================
   1. Renderização dos Canais e Redes Sociais Oficiais
   ========================================================================== */
function renderSocialChannels(channels) {
    const container = document.getElementById('socialChannelsGrid');
    if (!container) return;

    const iconMap = {
        instagram: 'icon-instagram',
        linkedin: 'icon-linkedin',
        'linkedin-group': 'icon-linkedin-group',
        discord: 'icon-discord',
        drive: 'icon-drive',
        whatsapp: 'icon-whatsapp'
    };

    container.innerHTML = channels.map((channel, index) => `
        <div class="col-lg-4 col-md-6">
            <a href="${channel.url}" ${channel.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="social-hub-card">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="social-icon-box ${iconMap[channel.id] || 'icon-linkedin'}">
                        <i class="bi ${channel.icon}"></i>
                    </div>
                    <span class="social-card-index">
                        <span class="social-card-index__dot" aria-hidden="true"></span>
                        Canal ${String(index + 1).padStart(2, '0')}
                    </span>
                </div>
                <h3 class="social-card-title">${channel.name}</h3>
                <div class="social-card-handle">${channel.handle}</div>
                <div class="social-card-tagline">${channel.badge}</div>
                <p class="social-card-desc">${channel.description}</p>
                <div class="social-card-action">
                    <span class="cta-text">${channel.cta}</span>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </a>
        </div>
    `).join('');
}

/* ==========================================================================
   2. Renderização de Posts Recentes e com Alto Engajamento
   ========================================================================== */
async function renderFeaturedPosts(posts, filter = 'all') {
    const container = document.getElementById('featuredPostsGrid');
    if (!container) {
        console.error('Container element not found for featuredPostsGrid');
        return;
    }

    // Handle invalid posts input
    if (!Array.isArray(posts)) {
        console.error('Invalid posts data: expected array, got', typeof posts);
        container.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-inbox fs-2 mb-2 d-block"></i>
                Nenhum conteúdo encontrado para este filtro no momento.
            </div>
        `;
        return;
    }

    console.log('Rendering featured posts with filter:', filter, 'Total posts:', posts.length);

    // Get the posts to render and reverse them so the most recent (last in original) is first (leftmost)
    let postsToRender = [...posts];
    if (filter !== 'all') {
        postsToRender = postsToRender.filter(post =>
            post &&
            typeof post === 'object' &&
            post.platform &&
            typeof post.platform === 'string' &&
            post.platform.toLowerCase() === filter.toLowerCase()
        );
    }
    postsToRender = postsToRender.reverse();

    console.log('Posts after filtering and reversing:', postsToRender.length);

    if (!postsToRender.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-inbox fs-2 mb-2 d-block"></i>
                Nenhum conteúdo encontrado para este filtro no momento.
            </div>
        `;
        return;
    }

    // Log the first few posts for debugging
    postsToRender.slice(0, 3).forEach((post, index) => {
        console.log(`Post ${index}:`, {
            id: post.id,
            platform: post.platform,
            textLength: post.text ? post.text.length : 0,
            textPreview: post.text ? post.text.substring(0, 50) + '...' : '(no text)',
            hasImage: !!post.image
        });
    });

    // Render all posts with special handling for Instagram (oEmbed) and LinkedIn (embed)
    try {
        // Process posts and collect their HTML
        const postHTMLPromises = postsToRender.map(async (post) => {
            try {
                // Validate post object
                if (!post || typeof post !== 'object') {
                    console.warn('Skipping invalid post:', post);
                    return '';
                }

                // Create a safe copy of the post for rendering
                const safePost = { ...post };

                // Safely truncate the text property if it exists and is a string
                if (safePost.text && typeof safePost.text === 'string') {
                    const maxLength = 100;
                    if (safePost.text.length > maxLength) {
                        safePost.text = safePost.text.substring(0, maxLength) + '...';
                    }
                }

                // Responsive column classes: full width on xs, half width on sm, third width on lg and up
                const columnClasses = 'col-12 col-sm-6 col-lg-4 mb-2';

                // Instagram posts usam o iframe oficial de embed (sem token).
                // A altura real é ajustada via postMessage em initInstagramEmbedResize().
                if (safePost.platform === 'Instagram') {
                    return `
                        <div class="${columnClasses}">
                            ${renderInstagramEmbed(safePost)}
                        </div>
                    `;
                }

                // Special handling for LinkedIn posts - use LinkedIn embed
                if (safePost.platform === 'LinkedIn' && safePost.embedUrl) {
                    return `
                        <div class="${columnClasses}">
                            ${renderLinkedInEmbed(safePost)}
                        </div>
                    `;
                }

                // For all other posts or if embeds failed, use regular card rendering
                return `<div class="${columnClasses}">${renderPostCard(safePost)}</div>`;
            } catch (postError) {
                console.error('Error rendering individual post:', postError, post);
                // Return a fallback card to maintain grid structure
                const columnClasses = 'col-12 col-sm-6 col-lg-4 mb-2';
                return `<div class="${columnClasses}">
                    <div class="alert alert-danger">
                        Erro ao renderizar post. Consulte o console para detalhes.
                    </div>
                </div>`;
            }
        });

        // Wait for all promises and then render
        const postHTMLs = await Promise.all(postHTMLPromises);
        container.innerHTML = postHTMLs.filter(Boolean).join('');
        console.log('Successfully rendered featured posts HTML');

        // Garante o ajuste de altura dos iframes do Instagram após cada render.
        initInstagramEmbedResize();

        // LinkedIn embeds are iframes, no processing needed
        // setTimeout(() => {
        //     processLinkedInEmbeds();
        // }, 1000);
    } catch (renderError) {
        console.error('Error rendering featured posts container:', renderError);
        container.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-exclamation-triangle fs-4"></i>
                Erro ao carregar os posts. Consulte o console para detalhes.
            </div>
        `;
    }
}

function getInstagramShortcode(url) {
    if (typeof url !== 'string') return null;
    const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/i)
        || url.match(/^\/(?:p|reel|tv)\/([^/?#]+)/i);
    return match ? match[1] : null;
}

let instagramEmbedResizeInitialized = false;
const instagramEmbedHeights = new WeakMap();

/**
 * O embed oficial em iframe (sem token) começa com altura fixa e informa a
 * altura real via postMessage. Este listener aplica essa altura para evitar
 * que o post fique espremido em cards estreitos.
 */
function initInstagramEmbedResize() {
    if (instagramEmbedResizeInitialized) return;
    instagramEmbedResizeInitialized = true;

    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://www.instagram.com') return;

        let data = event.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (error) {
                return;
            }
        }
        if (!data || typeof data.type !== 'string') return;

        const frame = Array.from(document.querySelectorAll('iframe.instagram-media-rendered'))
            .find((iframe) => iframe.contentWindow === event.source);
        if (!frame) return;

        const height = Number(data.details?.height);
        if (data.type === 'MEASURE' && height > 0) {
            instagramEmbedHeights.set(frame, height);
            frame.height = height;
        } else if (data.type === 'MOUNTED') {
            const measured = instagramEmbedHeights.get(frame);
            if (measured) {
                window.requestAnimationFrame(() => { frame.height = measured; });
            }
        }
    });
}

function renderInstagramEmbed(post) {
    const url = escapeHtml(post.url || post.embedUrl || 'https://www.instagram.com/conexaoti_/');
    const author = escapeHtml(post.author || '@conexaoti_');
    const shortcode = getInstagramShortcode(post.embedUrl || post.url || '');
    const heading = `
        <div class="social-embed-heading">
            <span><i class="bi bi-instagram"></i> Post do Instagram</span>
            <a href="${url}" target="_blank" rel="noopener">Abrir no Instagram <i class="bi bi-box-arrow-up-right"></i></a>
        </div>
    `;

    if (!shortcode) {
        return `
            <article class="social-embed-card" aria-label="Publicação de ${author}">
                ${heading}
                <p class="text-muted small p-3 mb-0">Não foi possível carregar este post. <a href="${url}" target="_blank" rel="noopener">Abrir no Instagram</a>.</p>
            </article>
        `;
    }

    const origin = encodeURIComponent(window.location.origin);
    // Variante sem legenda: exibe apenas a mídia e o cabeçalho do post.
    const embedUrl = `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/embed/?cr=1&v=14&wp=540&rd=${origin}`;

    return `
        <article class="social-embed-card" aria-label="Publicação de ${author}">
            ${heading}
            <iframe
                class="instagram-media instagram-media-rendered"
                src="${embedUrl}"
                height="500"
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                allowfullscreen="true"
                title="Publicação do Instagram de ${author}">
            </iframe>
        </article>
    `;
}

function renderPostCard(post) {
    return `
        <article class="post-feed-card">
            <div class="post-feed-header">
                <div class="d-flex align-items-center gap-2">
                    <img src="${post.authorAvatar}" alt="${escapeHtml(post.author)}" class="post-author-img" />
                    <div>
                        <div class="fw-bold text-light small">${escapeHtml(post.author)}</div>
                        <div class="text-muted" style="font-size: 11px;">${escapeHtml(post.timeAgo)}</div>
                    </div>
                </div>
                <span class="d-flex align-items-center gap-1 small fw-semibold" style="color: ${post.platformColor};">
                    <i class="bi ${post.platformIcon}"></i> ${escapeHtml(post.platform)}
                </span>
            </div>
            <div class="post-image-container">
                <img src="${post.image}" alt="${escapeHtml(post.title)}" class="post-feed-media" loading="lazy" />
                <span class="post-tag-floating">${escapeHtml(post.tag)}</span>
            </div>
            <div class="post-feed-body">
                <h4 class="post-title">${escapeHtml(post.title)}</h4>
                <p class="post-snippet">${escapeHtml(post.text)}</p>
                <div class="post-engagement-bar">
                    <div class="d-flex align-items-center gap-3">
                        <span><i class="bi bi-heart-fill me-1" style="color: #ff3366;"></i> ${escapeHtml(post.likes)}</span>
                        <span><i class="bi bi-chat-dots-fill me-1" style="color: var(--brand-primary);"></i> ${escapeHtml(post.comments)}</span>
                    </div>
                    <a href="${post.url}" target="_blank" rel="noopener" class="post-cta-btn">
                        ${escapeHtml(post.ctaText || 'Ver Publicação')} <i class="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function renderLinkedInEmbed(post) {
    const embedUrl = post.embedUrl || post.url;
    return `
        <article class="social-embed-card" aria-label="Publicação de ${escapeHtml(post.author)}">
            <div class="social-embed-heading">
                <span><i class="bi bi-linkedin"></i> Post do LinkedIn</span>
                <a href="${escapeHtml(post.url)}" target="_blank" rel="noopener">Abrir no LinkedIn <i class="bi bi-box-arrow-up-right"></i></a>
            </div>
            <div class="linkedin-embed-wrapper">
                <iframe src="${escapeHtml(embedUrl)}" 
                        height="550" 
                        width="100%" 
                        frameborder="0" 
                        allowfullscreen 
                        title="Publicação do LinkedIn de ${escapeHtml(post.author)}"
                        loading="lazy">
                </iframe>
            </div>
        </article>
    `;
}

function processLinkedInEmbeds() {
    // If LinkedIn embed script is already loaded, process immediately
    if (window.ININ && window.ININ.EMBED && window.ININ.EMBED.process) {
        try {
            window.ININ.EMBED.process();
        } catch (e) {
            console.warn('LinkedIn embed process failed', e);
        }
        return;
    }

    // If script is already loading, wait and retry
    const existingScript = document.getElementById('linkedin-embed-script');
    if (existingScript) {
        setTimeout(() => {
            if (window.ININ && window.ININ.EMBED && window.ININ.EMBED.process) {
                try {
                    window.ININ.EMBED.process();
                } catch (e) {
                    console.warn('LinkedIn embed process failed', e);
                }
            } else {
                // Try again after another delay
                setTimeout(processLinkedInEmbeds, 2000);
            }
        }, 1000);
        return;
    }

    // Load the LinkedIn embed script
    const script = document.createElement('script');
    script.id = 'linkedin-embed-script';
    script.type = 'IN/unparsed';
    script.src = 'https://platform.linkedin.com/in.js';
    script.async = true;

    script.onload = () => {
        // Give it a moment to initialize, then process with retry logic
        setTimeout(() => {
            if (window.ININ && window.ININ.EMBED && window.ININ.EMBED.process) {
                try {
                    window.ININ.EMBED.process();
                } catch (e) {
                    console.warn('LinkedIn embed process failed', e);
                }
            } else {
                // Fallback: try once more after a delay
                setTimeout(processLinkedInEmbeds, 3000);
            }
        }, 500);
    };

    script.onerror = () => {
        console.error('Failed to load LinkedIn embed script');
        // Retry after error
        setTimeout(processLinkedInEmbeds, 5000);
    };

    document.body.appendChild(script);
}

/* ==========================================================================
   3. Renderização de Benefícios da Comunidade
   ========================================================================== */
function renderPerks(perks) {
    const container = document.getElementById('perksGrid');
    if (!container) return;

    container.innerHTML = perks.map(perk => `
        <div class="col-md-3 col-sm-6">
            <div class="perk-box">
                <i class="bi ${perk.icon} perk-icon"></i>
                <h3 class="fw-bold text-light mb-2 h5" style="font-family: var(--font-title); font-size: 1.05rem;">${escapeHtml(perk.title)}</h3>
                <p class="text-muted small mb-0" style="line-height: 1.5;">${escapeHtml(perk.desc)}</p>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   5. Filtros de Plataforma para os Posts
   ========================================================================== */
function initFilters(posts) {
    const filterButtons = document.querySelectorAll('.post-filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(filterButton => {
                filterButton.classList.remove('btn-cta-primary');
                filterButton.classList.add('btn-cta-secondary');
            });
            button.classList.remove('btn-cta-secondary');
            button.classList.add('btn-cta-primary');
            renderFeaturedPosts(posts, button.dataset.platform);
        });
    });
}

function showDataError() {
    document.querySelectorAll('#socialChannelsGrid, #featuredPostsGrid, #perksGrid').forEach(container => {
        if (container) {
            container.innerHTML = '<div class="col-12 text-center text-muted py-4">Não foi possível carregar os dados da comunidade.</div>';
        }
    });
}
