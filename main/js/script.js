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
  // Import fetchInstagramOEmbed from data.js for use in renderFeaturedPosts
// Since data.js doesn't use ES6 exports, we access it through the global data object
const { fetchInstagramOEmbed } = window.CONEXAO_DATA || {};

document.addEventListener('DOMContentLoaded', async () => {
    const data = window.CONEXAO_DATA;
    if (!data) {
        showDataError();
        return;
    }

    renderSocialChannels(data.SOCIAL_CHANNELS);
    renderFeaturedPosts(data.FEATURED_POSTS);
    renderPerks(data.COMMUNITY_PERKS);
    
    renderTestimonials(data.TESTIMONIALS || []); // New testimonials section
    initMentorshipInterestForm();
    initFilters(data.FEATURED_POSTS);
    initMentorFilters(data.MENTORSHIP_PROGRAMS);

    // Add event listeners for data updates
    document.addEventListener('drive-data-loaded', handleDriveDataLoaded);
    document.addEventListener('instagram-data-loaded', handleInstagramDataLoaded);
});

/* ==========================================================================
   Event listeners for data updates
   ========================================================================== */
function handleInstagramDataLoaded(event) {
    const posts = event.detail?.posts || [];
    // Re-render featured posts when Instagram data is loaded
    renderFeaturedPosts(CONEXAO_DATA?.FEATURED_POSTS || []);
}

function handleDriveDataLoaded(event) {
    // Main page does not render Drive data; this listener is for consistency
    // with biblioteca.html but does nothing here.
    // console.log('Drive data loaded event received on main page (no-op)');
}

/* ==========================================================================
   1. RenderizaÃ§Ã£o dos Canais e Redes Sociais Oficiais
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

    container.innerHTML = channels.map(channel => `
        <div class="col-lg-4 col-md-6">
            <a href="${channel.url}" ${channel.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="social-hub-card">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="social-icon-box ${iconMap[channel.id] || 'icon-linkedin'}">
                        <i class="bi ${channel.icon}"></i>
                    </div>
                    <span class="badge social-badge">${channel.badge}</span>
                </div>
                <h3 class="social-card-title">${channel.name}</h3>
                <div class="social-card-handle">${channel.handle}</div>
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
   2. RenderizaÃ§Ã£o de Posts Recentes e com Alto Engajamento
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
                Nenhum conteÃºdo encontrado para este filtro no momento.
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
                Nenhum conteÃºdo encontrado para este filtro no momento.
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

                // Special handling for Instagram posts - use oEmbed
                if (safePost.platform === 'Instagram') {
                    // Use pre-loaded oEmbed HTML if available (from initializeInstagramFeed)
                    if (safePost._oEmbedHtml) {
                        return `
                            <div class="${columnClasses}">
                                <article class="social-embed-card">
                                    ${safePost._oEmbedHtml}
                                </article>
                            </div>
                        `;
                    }
                    // Fallback to fetching oEmbed on demand
                    else if (safePost.embedUrl) {
                        try {
                            const embedHtml = await fetchInstagramOEmbed(safePost.embedUrl);
                            if (embedHtml) {
                                return `
                                    <div class="${columnClasses}">
                                        <article class="social-embed-card">
                                            ${embedHtml}
                                        </article>
                                    </div>
                                `;
                            }
                        } catch (embedError) {
                            console.warn('Failed to load Instagram oEmbed, falling back to regular card:', embedError);
                        }
                    }
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

        // Process Instagram embeds after loading script robustly
        function processInstagramEmbedsRobust() {
            // Ensure script is loaded only once
            if (!document.getElementById('instagram-embed-script')) {
                const script = document.createElement('script');
                script.id = 'instagram-embed-script';
                script.async = true;
                script.src = 'https://www.instagram.com/embed.js';
                
                // Handle script load/error
                script.onload = () => {
                    // Small delay to ensure script is fully initialized
                    setTimeout(() => {
                        if (window.instgrm?.Embeds) {
                            window.instgrm.Embeds.process();
                        }
                    }, 100);
                };
                
                script.onerror = () => {
                    console.warn('Instagram embed script failed to load');
                    // Retry once after delay
                    setTimeout(() => {
                        if (window.instgrm?.Embeds) {
                            window.instgrm.Embeds.process();
                        }
                    }, 2000);
                };
                
                document.body.appendChild(script);
            } else {
                // Script already loaded, just process
                if (window.instgrm?.Embeds) {
                    window.instgrm.Embeds.process();
                }
            }
        }

        // Call the robust Instagram embed processor
        processInstagramEmbedsRobust();

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

function renderInstagramEmbed(post) {
    return `
        <article class="social-embed-card" aria-label="PublicaÃ§Ã£o recente de ${escapeHtml(post.author)}">
            <div class="social-embed-heading">
                <span><i class="bi bi-instagram"></i> Post real do Instagram</span>
                <a href="${post.url}" target="_blank" rel="noopener">Abrir <i class="bi bi-box-arrow-up-right"></i></a>
            </div>
            <blockquote class="instagram-media"
                data-instgrm-permalink="${post.embedUrl}"
                data-instgrm-version="14"
                data-instgrm-captioned>
                <a href="${post.url}" target="_blank" rel="noopener">Ver publicaÃ§Ã£o de ${escapeHtml(post.author)}</a>
            </blockquote>
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
                        ${escapeHtml(post.ctaText || 'Ver PublicaÃ§Ã£o')} <i class="bi bi-box-arrow-up-right ms-1"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function processInstagramEmbeds() {
    if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
        return;
    }

    const existingScript = document.getElementById('instagram-embed-script');
    if (existingScript) {
        // Script is already loading, wait and retry
        setTimeout(() => {
            if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process();
            } else {
                // Try again after another delay
                setTimeout(processInstagramEmbeds, 2000);
            }
        }, 1000);
        return;
    }

    const script = document.createElement('script');
    script.id = 'instagram-embed-script';
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    script.onload = () => {
        // Give it a moment to initialize, then process
        setTimeout(() => {
            if (window.instgrm?.Embeds) {
                window.instgrm.Embeds.process();
            } else {
                // Fallback: try once more after a delay
                setTimeout(processInstagramEmbeds, 3000);
            }
        }, 500);
    };
    script.onerror = () => {
        console.warn('Instagram embed script failed to load');
        // Retry after error
        setTimeout(processInstagramEmbeds, 5000);
    };
    document.body.appendChild(script);
}

function renderLinkedInEmbed(post) {
    const embedUrl = post.embedUrl || post.url;
    return `
        <article class="social-embed-card" aria-label="PublicaÃ§Ã£o recente de ${escapeHtml(post.author)}">
            <div class="social-embed-heading">
                <span><i class="bi bi-linkedin"></i> Post real do LinkedIn</span>
                <a href="${escapeHtml(post.url)}" target="_blank" rel="noopener">Abrir <i class="bi bi-box-arrow-up-right"></i></a>
            </div>
            <div class="linkedin-embed-wrapper">
                <iframe src="${escapeHtml(embedUrl)}" 
                        height="550" 
                        width="100%" 
                        frameborder="0" 
                        allowfullscreen 
                        title="Embedded post"
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
   3. RenderizaÃ§Ã£o de BenefÃ­cios da Comunidade
   ========================================================================== */
function renderPerks(perks) {
    const container = document.getElementById('perksGrid');
    if (!container) return;

    container.innerHTML = perks.map(perk => `
        <div class="col-md-3 col-sm-6">
            <div class="perk-box">
                <i class="bi ${perk.icon} perk-icon"></i>
                <h5 class="fw-bold text-light mb-2" style="font-family: var(--font-title); font-size: 1.05rem;">${escapeHtml(perk.title)}</h5>
                <p class="text-muted small mb-0" style="line-height: 1.5;">${escapeHtml(perk.desc)}</p>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   4. Interesse em Mentoria
   O protÃ³tipo abre uma mensagem pronta no WhatsApp oficial. NÃ£o armazena dados
   pessoais no navegador nem envia informaÃ§Ãµes a terceiros.
   ========================================================================== */
function initMentorshipInterestForm() {
    const form = document.getElementById('mentorshipInterestForm');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const whatsapp = formData.get('whatsapp').trim();
        const profile = formData.get('profile');
        const area = formData.get('area');
        const message = formData.get('message').trim();

        const confirmation = document.getElementById('mentorshipFormFeedback');
        if (!name || !email || !whatsapp || !profile || !area) {
            confirmation.textContent = 'Preencha os campos obrigatÃ³rios para continuar.';
            confirmation.className = 'mentorship-form-feedback is-error';
            return;
        }

        const whatsAppMessage = [
            'OlÃ¡, ConexÃ£o TI! Tenho interesse no programa Mentoria com Mestres.',
            `Nome: ${escapeHtml(name)}`,
            `E-mail: ${escapeHtml(email)}`,
            `WhatsApp: ${escapeHtml(whatsapp)}`,
            `Perfil: ${escapeHtml(profile)}`,
            `Ãrea de interesse: ${escapeHtml(area)}`,
            message ? `Mensagem: ${escapeHtml(message)}` : ''
        ].filter(Boolean).join('\n');

        confirmation.textContent = 'Abrindo o WhatsApp da comunidade com seus dados preenchidos.';
        confirmation.className = 'mentorship-form-feedback is-success';
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppMessage)}`, '_blank', 'noopener');
        form.reset();
    });
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
            container.innerHTML = '<div class="col-12 text-center text-muted py-4">NÃ£o foi possÃ­vel carregar os dados da comunidade.</div>';
        }
    });
}

/* ==========================================================================
   5. RenderizaÃ§Ã£o da SeÃ§Ã£o de Mentoria com Mestres
   ========================================================================== */
function renderMentorshipPrograms(programs) {
    const container = document.getElementById('mentorshipGrid');
    if (!container) return;

    container.innerHTML = programs.map(program => `
        <div class="col-lg-4 col-md-6">
            <div class="mentor-card">
                <img src="${program.avatar}" alt="${escapeHtml(program.name)}" class="mentor-avatar" />
                <h5 class="mentor-name">${escapeHtml(program.name)}</h5>
                <p class="mentor-role text-muted">${escapeHtml(program.role)} na ${escapeHtml(program.company)}</p>
                <div class="mentor-topics">
                    ${program.topics.map(topic => `<span class="badge bg-subtle text-muted small">${escapeHtml(topic)}</span>`).join('')}
                </div>
                <p class="mentor-slots"><span class="badge bg-secondary">${escapeHtml(program.slots)}</span></p>
                <p class="mentor-bio">${escapeHtml(program.bio)}</p>
                <a href="${program.ctaUrl}" target="_blank" rel="noopener" class="btn-cta-primary w-100 mt-3">Agendar SessÃ£o</a>
            </div>
        </div>
    `).join('');
}


/* ==========================================================================
   5. RenderizaÃ§Ã£o dos ADMs da Comunidade (inserido após mentoria)
   ========================================================================== */
function renderADMs(adms) {
    const container = document.getElementById("admGrid");
    if (!container) return;

    container.innerHTML = adms.map(adm => `
        <div class="col-lg-3 col-md-6">
            <div class="bento-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="bento-icon-wrapper mb-3">
                        <i class="bi ${adm.icon}"></i>
                    </div>
                    <h5 class="bento-card-title text-light">${escapeHtml(adm.name)}</h5>
                    <span class="badge-tag">${escapeHtml(adm.handle)}</span>
                </div>
                <div class="mt-2">
                    <div class="d-flex gap-2">
                        ${adm.instagram ? `<a href="${escapeHtml(adm.instagram.url)}" target="_blank" rel="noopener" class="text-decoration-none"><i class="bi bi-instagram me-1" style="color: #e1306c;"></i> Instagram</a>` : ""}
                        ${adm.linkedin ? `<a href="${escapeHtml(adm.linkedin.url)}" target="_blank" rel="noopener" class="text-decoration-none"><i class="bi bi-linkedin me-1" style="color: #0a66c2;"></i> LinkedIn</a>` : ""}
                        ${adm.github ? `<a href="${escapeHtml(adm.github.url)}" target="_blank" rel="noopener" class="text-decoration-none"><i class="bi bi-github me-1" style="color: #333;"></i> GitHub</a>` : ""}
                    </div>
                </div>
                <div class="pt-4 mt-auto">
                    <p class="text-muted small mb-0" style="font-size: 0.85rem;">${escapeHtml(adm.description || "")}</p>
                </div>
            </div>
        </div>
    `).join("");
}function renderTestimonials(testimonials) {
    const container = document.getElementById('testimoniosGrid');
    if (!container) return;

    if (!testimonials.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted">Ainda nÃ£o temos depoimentos publicados. Se vocÃª jÃ¡ participou de nossa mentoria, compartilhe sua experiÃªncia conosco!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = testimonials.map(testimonial => `
        <div class="col-lg-4 col-md-6">
            <div class="mentor-card" style="border-left: 4px solid var(--brand-primary);">
                <div class="mentor-avatar" style="background: var(--brand-primary); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                    <i class="bi bi-chat-left-quote text-white" style="font-size: 2rem;"></i>
                </div>
                <h5 class="mentor-name">${escapeHtml(testimonial.name)}</h5>
                <p class="mentor-role text-muted">${escapeHtml(testimonial.role)}</p>
                <div class="mentor-topics">
                    ${testimonial.topics.map(topic => `<span class="badge bg-subtle text-muted small">${escapeHtml(topic)}</span>`).join('')}
                </div>
                <p class="mentor-bio" style="font-style: italic;">"${escapeHtml(testimonial.message)}"</p>
                <div class="mentor-slots">
                    <span class="badge bg-secondary">${escapeHtml(testimonial.date || 'Recente')}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function initMentorFilters(programs) {
    const filterButtons = document.querySelectorAll('.mentor-filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter mentors
            const filter = button.dataset.filter;
            const mentorCards = document.querySelectorAll('.mentor-card');

            mentorCards.forEach(card => {
                const mentorName = card.querySelector('.mentor-name').textContent.toLowerCase();
                const mentorRole = card.querySelector('.mentor-role').textContent.toLowerCase();
                const mentorTopics = card.querySelector('.mentor-topics').textContent.toLowerCase();

                let matches = false;

                if (filter === 'all') {
                    matches = true;
                } else {
                    // Check if mentor matches the filter category
                    switch(filter) {
                        case 'frontend':
                            matches = mentorName.includes('front') || mentorRole.includes('front') || mentorTopics.includes('front-end') || mentorTopics.includes('frontend');
                            break;
                        case 'backend':
                            matches = mentorName.includes('back') || mentorRole.includes('back') || mentorTopics.includes('back-end') || mentorTopics.includes('backend');
                            break;
                        case 'data':
                            matches = mentorName.includes('data') || mentorRole.includes('data') || mentorTopics.includes('dados') || mentorTopics.includes('data') || mentorTopics.includes('ia') || mentorTopics.includes('ai');
                            break;
                        case 'infra':
                            matches = mentorName.includes('infra') || mentorRole.includes('infra') || mentorTopics.includes('infraestrutura') || mentorTopics.includes('redes') || mentorTopics.includes('cloud');
                            break;
                        case 'uxui':
                            matches = mentorName.includes('ux') || mentorName.includes('ui') || mentorRole.includes('ux') || mentorRole.includes('ui') || mentorTopics.includes('ux/ui') || mentorTopics.includes('produto') || mentorTopics.includes('ux') || mentorTopics.includes('ui');
                            break;
                        case 'carreira':
                            matches = mentorName.includes('carreira') || mentorRole.includes('carreira') || mentorTopics.includes('carreira') || mentorTopics.includes('primeiro emprego') || mentorTopics.includes('emprego');
                            break;
                        default:
                            matches = true;
                    }
                }

                card.parentElement.style.display = matches ? '' : 'none';
            });
        });
    });
}






