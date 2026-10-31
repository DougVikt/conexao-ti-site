/**
 * Página de cursos complementares.
 *
 * Filtra a curadoria por categoria, busca textual e acesso gratuito.
 * Todos os links levam para a plataforma oficial do curso.
 */
(function initCursosComplementares() {
    "use strict";

    const resources = typeof cursosComplementaresDados !== "undefined" && Array.isArray(cursosComplementaresDados)
        ? cursosComplementaresDados
        : [];
    const categories = typeof cursosComplementaresCategorias !== "undefined" && Array.isArray(cursosComplementaresCategorias)
        ? cursosComplementaresCategorias
        : [{ slug: "all", label: "Todos", icon: "bi-grid" }];
    const accessLabels = typeof cursosComplementaresAcessoLabels !== "undefined"
        ? cursosComplementaresAcessoLabels
        : { gratuito: "Gratuito", freemium: "Freemium", pago: "Pago" };

    const grid = document.getElementById("recursosGrid");
    const filters = document.getElementById("recursosFilters");
    const searchInput = document.getElementById("recursosSearch");
    const freeOnlyInput = document.getElementById("freeOnly");
    const countEl = document.getElementById("recursosCount");
    const emptyEl = document.getElementById("recursosEmpty");
    const resetBtn = document.getElementById("recursosReset");
    const statTotal = document.getElementById("statTotal");
    const statFree = document.getElementById("statFree");
    const statPlatforms = document.getElementById("statPlatforms");

    if (!grid || !filters) return;

    let activeCategory = "all";
    let query = "";
    let freeOnly = false;

    function escapeHtml(value) {
        if (value === null || value === undefined) return "";
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    }

    function normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function hasFreeAccess(resource) {
        return resource.acesso === "gratuito" || resource.acesso === "freemium";
    }

    function resourceMatches(resource) {
        if (activeCategory !== "all" && resource.categoria !== activeCategory) return false;
        if (freeOnly && !hasFreeAccess(resource)) return false;
        if (!query) return true;

        const haystack = normalize([
            resource.titulo,
            resource.plataforma,
            resource.descricao,
            resource.nivel,
            resource.idioma,
            ...(resource.tags || [])
        ].join(" "));

        return haystack.includes(query);
    }

    function getVisibleResources() {
        return resources.filter(resourceMatches);
    }

    function updateStats() {
        if (statTotal) statTotal.textContent = String(resources.length);
        if (statFree) statFree.textContent = String(resources.filter(hasFreeAccess).length);
        if (statPlatforms) {
            statPlatforms.textContent = String(new Set(resources.map((item) => item.plataforma)).size);
        }
    }

    function renderFilters() {
        const counts = resources.reduce((acc, resource) => {
            acc[resource.categoria] = (acc[resource.categoria] || 0) + 1;
            return acc;
        }, {});

        filters.innerHTML = categories.map((category) => {
            const count = category.slug === "all" ? resources.length : (counts[category.slug] || 0);
            const isActive = category.slug === activeCategory;
            return `
                <button type="button" class="roadmap-tab-btn${isActive ? " active" : ""}" data-category="${escapeHtml(category.slug)}" aria-pressed="${isActive}">
                    <i class="bi ${escapeHtml(category.icon)} me-1" aria-hidden="true"></i>
                    ${escapeHtml(category.label)}
                    <span class="course-filter__count">${count}</span>
                </button>
            `;
        }).join("");
    }

    function renderCards() {
        const visible = getVisibleResources();

        grid.innerHTML = visible.map((resource) => {
            const tags = (resource.tags || []).slice(0, 3).map((tag) =>
                `<span class="badge-tag">${escapeHtml(tag)}</span>`
            ).join("");
            const accessClass = ["gratuito", "freemium", "pago"].includes(resource.acesso)
                ? resource.acesso
                : "pago";
            const accessLabel = accessLabels[accessClass] || "Pago";

            return `
                <div class="col-md-6 col-xl-4">
                    <article class="resource-card h-100">
                        <div class="resource-card__head">
                            <span class="resource-card__provider">${escapeHtml(resource.plataforma)}</span>
                            <span class="resource-card__access is-${accessClass}">${escapeHtml(accessLabel)}</span>
                        </div>
                        <h3 class="resource-card__title">${escapeHtml(resource.titulo)}</h3>
                        <p class="resource-card__desc">${escapeHtml(resource.descricao)}</p>
                        <div class="resource-card__meta">
                            <span><i class="bi bi-bar-chart" aria-hidden="true"></i> ${escapeHtml(resource.nivel)}</span>
                            <span><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(resource.duracao)}</span>
                            <span><i class="bi bi-translate" aria-hidden="true"></i> ${escapeHtml(resource.idioma)}</span>
                        </div>
                        <div class="resource-card__tags">${tags}</div>
                        <a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer"
                            class="btn-modern-ghost resource-card__action">
                            Acessar curso
                            <span class="visually-hidden">: ${escapeHtml(resource.titulo)} — ${escapeHtml(resource.plataforma)} (abre em nova aba)</span>
                            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        </a>
                    </article>
                </div>
            `;
        }).join("");

        if (countEl) {
            countEl.textContent = visible.length === 1
                ? "1 curso encontrado"
                : `${visible.length} cursos encontrados`;
        }

        if (emptyEl) emptyEl.classList.toggle("d-none", visible.length > 0);
    }

    function render() {
        renderFilters();
        renderCards();
    }

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-category]");
        if (!button) return;

        activeCategory = button.dataset.category || "all";
        render();
    });

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            query = normalize(event.target.value);
            render();
        });
    }

    if (freeOnlyInput) {
        freeOnlyInput.addEventListener("change", (event) => {
            freeOnly = event.target.checked;
            render();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            activeCategory = "all";
            query = "";
            freeOnly = false;
            if (searchInput) searchInput.value = "";
            if (freeOnlyInput) freeOnlyInput.checked = false;
            render();
            if (searchInput) searchInput.focus();
        });
    }

    const hash = (window.location.hash || "").replace("#", "");
    if (hash && categories.some((category) => category.slug === hash)) activeCategory = hash;

    updateStats();
    render();
})();
