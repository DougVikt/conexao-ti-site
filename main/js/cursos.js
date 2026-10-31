/**
 * Página de cursos de graduação.
 *
 * Renderiza os cards a partir de cursos-dados.js, aplica busca e filtros por
 * área e abre os detalhes completos em um modal acessível do Bootstrap.
 */
(function initCursos() {
    "use strict";

    const courses = typeof cursosDados !== "undefined" && Array.isArray(cursosDados)
        ? cursosDados
        : [];
    const areas = typeof cursosAreas !== "undefined" && Array.isArray(cursosAreas)
        ? cursosAreas
        : [{ slug: "all", label: "Todos os cursos", icon: "bi-grid" }];
    const areaLabels = typeof cursosAreaLabels !== "undefined" ? cursosAreaLabels : {};

    const grid = document.getElementById("cursosGrid");
    const filters = document.getElementById("courseFilters");
    const searchInput = document.getElementById("courseSearch");
    const countEl = document.getElementById("coursesCount");
    const emptyEl = document.getElementById("cursosEmpty");
    const resetBtn = document.getElementById("cursosReset");
    const modalEl = document.getElementById("courseModal");

    if (!grid || !filters) return;

    let activeArea = "all";
    let query = "";
    let lastFocused = null;

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

    function getAreaLabel(slug) {
        return areaLabels[slug] || "Curso";
    }

    function courseMatches(course) {
        if (activeArea !== "all" && course.area !== activeArea) return false;
        if (!query) return true;

        const haystack = normalize([
            course.nome,
            course.resumo,
            course.objetivo,
            getAreaLabel(course.area),
            ...(course.grade || [])
        ].join(" "));

        return haystack.includes(query);
    }

    function getVisibleCourses() {
        return courses.filter(courseMatches);
    }

    function renderFilters() {
        const counts = courses.reduce((acc, course) => {
            acc[course.area] = (acc[course.area] || 0) + 1;
            return acc;
        }, {});

        filters.innerHTML = areas.map((area) => {
            const count = area.slug === "all" ? courses.length : (counts[area.slug] || 0);
            const isActive = area.slug === activeArea;
            return `
                <button type="button" class="roadmap-tab-btn${isActive ? " active" : ""}" data-area="${escapeHtml(area.slug)}" aria-pressed="${isActive}">
                    <i class="bi ${escapeHtml(area.icon)} me-1" aria-hidden="true"></i>
                    ${escapeHtml(area.label)}
                    <span class="course-filter__count">${count}</span>
                </button>
            `;
        }).join("");
    }

    function renderCards() {
        const visible = getVisibleCourses();

        grid.innerHTML = visible.map((course) => {
            const tags = (course.grade || []).slice(0, 3).map((item) =>
                `<span class="badge-tag">${escapeHtml(item)}</span>`
            ).join("");

            return `
                <div class="col-md-6 col-xl-4">
                    <article class="course-card h-100" data-area="${escapeHtml(course.area)}">
                        <div class="course-card__head">
                            <span class="course-card__icon" aria-hidden="true">
                                <i class="bi ${escapeHtml(course.icon)}"></i>
                            </span>
                            <span class="course-card__area">${escapeHtml(getAreaLabel(course.area))}</span>
                        </div>
                        <h3 class="course-card__title">${escapeHtml(course.nome)}</h3>
                        <p class="course-card__summary">${escapeHtml(course.resumo)}</p>
                        <div class="course-card__meta">
                            <span><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(course.duracao)}</span>
                            <span><i class="bi bi-mortarboard" aria-hidden="true"></i> ${escapeHtml(course.tipo)}</span>
                        </div>
                        <div class="course-card__tags">${tags}</div>
                        <button type="button" class="course-card__action" data-course-slug="${escapeHtml(course.slug)}"
                            aria-label="Ver detalhes do curso ${escapeHtml(course.nome)}">
                            Ver detalhes <i class="bi bi-arrow-right" aria-hidden="true"></i>
                        </button>
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

    function openCourse(slug) {
        const course = courses.find((item) => item.slug === slug);
        if (!course || !modalEl) return;

        const titleEl = modalEl.querySelector("#courseModalTitle");
        const areaEl = modalEl.querySelector("#courseModalArea");
        const bodyEl = modalEl.querySelector("#courseModalBody");

        if (titleEl) titleEl.textContent = course.nome;
        if (areaEl) {
            areaEl.innerHTML = `<i class="bi ${escapeHtml(course.icon)} me-1" aria-hidden="true"></i>${escapeHtml(getAreaLabel(course.area))}`;
        }

        if (bodyEl) {
            const grade = (course.grade || []).map((item) =>
                `<li><i class="bi bi-check2" aria-hidden="true"></i>${escapeHtml(item)}</li>`
            ).join("");

            bodyEl.innerHTML = `
                <div class="course-modal__meta">
                    <span class="badge-tag">${escapeHtml(course.tipo)}</span>
                    <span class="badge-tag">${escapeHtml(course.duracao)}</span>
                    <span class="badge-tag">${escapeHtml(course.semestres)} semestres</span>
                </div>

                <p class="course-modal__lead">${escapeHtml(course.objetivo)}</p>

                <h3 class="course-detail__title">Principais assuntos da grade</h3>
                <ul class="course-detail__list">${grade}</ul>

                <div class="course-callout">
                    <i class="bi bi-lightbulb" aria-hidden="true"></i>
                    <div>
                        <strong>Exemplo prático</strong>
                        <p>${escapeHtml(course.exemplo)}</p>
                    </div>
                </div>

                <h3 class="course-detail__title">Onde você pode trabalhar</h3>
                <p class="course-detail__text">${escapeHtml(course.onde)}</p>

                <div class="course-callout is-highlight">
                    <i class="bi bi-star" aria-hidden="true"></i>
                    <div>
                        <strong>Ponto forte</strong>
                        <p>${escapeHtml(course.pontoForte)}</p>
                    </div>
                </div>
            `;
        }

        lastFocused = document.activeElement;
        const modal = window.bootstrap && window.bootstrap.Modal
            ? window.bootstrap.Modal.getOrCreateInstance(modalEl)
            : null;
        if (modal) modal.show();
    }

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-area]");
        if (!button) return;

        activeArea = button.dataset.area || "all";
        render();
    });

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            query = normalize(event.target.value);
            render();
        });
    }

    grid.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-course-slug]");
        if (!button) return;
        openCourse(button.dataset.courseSlug);
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            activeArea = "all";
            query = "";
            if (searchInput) searchInput.value = "";
            render();
            if (searchInput) searchInput.focus();
        });
    }

    if (modalEl) {
        modalEl.addEventListener("hidden.bs.modal", () => {
            if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
        });
    }

    // Permite abrir a página já filtrada por área: cursos.html#seguranca
    const hash = (window.location.hash || "").replace("#", "");
    if (hash && areas.some((area) => area.slug === hash)) activeArea = hash;

    render();
})();
