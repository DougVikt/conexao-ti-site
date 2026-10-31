/**
 * Calendário acadêmico da Conexão TI.
 *
 * - Datas oficiais vêm de calendario-dados.js.
 * - Prazos pessoais são criados pela interface e salvos no localStorage
 *   do navegador (não são enviados para nenhum servidor).
 * - Exporta todos os prazos em .ics e cria links para o Google Agenda.
 */
(function initCalendario() {
    "use strict";

    const STORAGE_KEY = "conexao-ti:prazos:v1";
    const MONTHS = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const TYPE_META = {
        prova: { label: "Prova", icon: "bi-clipboard-check" },
        trabalho: { label: "Trabalho", icon: "bi-journal-code" },
        evento: { label: "Evento", icon: "bi-calendar-event" },
        outro: { label: "Outro", icon: "bi-bookmark" }
    };

    const calBody = document.getElementById("calendarBody");
    if (!calBody) return;

    const monthLabel = document.getElementById("monthLabel");
    const calendarCaption = document.getElementById("calendarCaption");
    const agendaTitle = document.getElementById("agendaTitle");
    const agendaSubtitle = document.getElementById("agendaSubtitle");
    const agendaList = document.getElementById("agendaList");
    const agendaEmpty = document.getElementById("agendaEmpty");
    const agendaPanel = document.getElementById("agendaPanel");
    const clearDayBtn = document.getElementById("clearDayBtn");
    const typeFilters = document.getElementById("typeFilters");
    const showPersonalInput = document.getElementById("showPersonal");
    const personalCountEl = document.getElementById("personalCount");
    const exportBtn = document.getElementById("exportBtn");
    const noticeEl = document.getElementById("calendarNotice");
    const modalEl = document.getElementById("prazoModal");
    const form = document.getElementById("prazoForm");
    const formError = document.getElementById("prazoError");

    const today = startOfDay(new Date());
    const officialEvents = normalizeOfficialEvents();
    let personalEvents = loadPersonalEvents();
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDate = null;
    let activeType = "all";
    let showPersonal = true;
    let noticeTimer = 0;

    // ── Datas e normalização ─────────────────────────────────────────────

    function startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function pad2(value) {
        return String(value).padStart(2, "0");
    }

    function toISODate(date) {
        return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
    }

    function parseISODate(value) {
        if (typeof value !== "string") return null;
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
        if (!match) return null;

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) return null;

        return date;
    }

    function normalizeTime(value) {
        if (typeof value !== "string") return "";
        const match = /^(\d{1,2}):(\d{2})/.exec(value.trim());
        if (!match) return "";

        const hours = Number(match[1]);
        const minutes = Number(match[2]);
        if (hours > 23 || minutes > 59) return "";

        return `${pad2(hours)}:${pad2(minutes)}`;
    }

    function normalizeEvent(raw, origem, fallbackId) {
        if (!raw || typeof raw !== "object") return null;

        const titulo = String(raw.titulo || "").trim();
        const date = parseISODate(raw.data);
        if (!titulo || !date) return null;

        const tipo = TYPE_META[raw.tipo] ? raw.tipo : "outro";

        return {
            id: String(raw.id || fallbackId),
            titulo: titulo.slice(0, 120),
            tipo,
            data: toISODate(date),
            hora: normalizeTime(raw.hora),
            disciplina: String(raw.disciplina || "").trim().slice(0, 80),
            local: String(raw.local || "").trim().slice(0, 120),
            descricao: String(raw.descricao || "").trim().slice(0, 400),
            origem
        };
    }

    function normalizeOfficialEvents() {
        if (typeof calendarioDados === "undefined" || !Array.isArray(calendarioDados)) return [];

        return calendarioDados
            .map((event, index) => normalizeEvent(event, "oficial", `oficial-${index}`))
            .filter(Boolean);
    }

    function loadPersonalEvents() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];

            return parsed
                .map((event, index) => normalizeEvent(event, "pessoal", `pessoal-${index}`))
                .filter(Boolean);
        } catch (error) {
            console.warn("Não foi possível carregar os prazos pessoais:", error);
            return [];
        }
    }

    function savePersonalEvents() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(personalEvents));
            return true;
        } catch (error) {
            console.warn("Não foi possível salvar os prazos pessoais:", error);
            return false;
        }
    }

    function getAllEvents() {
        return officialEvents.concat(personalEvents);
    }

    function eventTimestamp(event) {
        const date = parseISODate(event.data);
        if (!date) return 0;

        if (event.hora) {
            const [hours, minutes] = event.hora.split(":").map(Number);
            date.setHours(hours, minutes, 0, 0);
        }

        return date.getTime();
    }

    function sortEvents(a, b) {
        return eventTimestamp(a) - eventTimestamp(b) || a.titulo.localeCompare(b.titulo, "pt-BR");
    }

    function isVisible(event) {
        if (activeType !== "all" && event.tipo !== activeType) return false;
        if (!showPersonal && event.origem === "pessoal") return false;
        return true;
    }

    function addDays(date, amount) {
        const result = new Date(date);
        result.setDate(result.getDate() + amount);
        return result;
    }

    function capitalize(value) {
        return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    }

    function formatMonthLabel(date) {
        return capitalize(date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
    }

    function formatLongDate(iso) {
        const date = parseISODate(iso);
        if (!date) return "";
        return capitalize(date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }));
    }

    function formatShortMonth(date) {
        return date
            .toLocaleDateString("pt-BR", { month: "short" })
            .replace(".", "")
            .toUpperCase();
    }

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

    // ── Calendário ───────────────────────────────────────────────────────

    function renderCalendar(visibleEvents) {
        const year = view.getFullYear();
        const month = view.getMonth();
        const firstDay = new Date(year, month, 1);
        const startWeekday = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

        const eventsByDate = new Map();
        visibleEvents.forEach((event) => {
            if (!eventsByDate.has(event.data)) eventsByDate.set(event.data, []);
            eventsByDate.get(event.data).push(event);
        });
        eventsByDate.forEach((events) => events.sort(sortEvents));

        let html = "";

        for (let row = 0; row < totalCells / 7; row++) {
            html += "<tr>";

            for (let column = 0; column < 7; column++) {
                const dayNumber = row * 7 + column - startWeekday + 1;

                if (dayNumber < 1 || dayNumber > daysInMonth) {
                    html += '<td class="calendar-cell is-empty" aria-hidden="true"></td>';
                    continue;
                }

                const date = new Date(year, month, dayNumber);
                const iso = toISODate(date);
                const dayEvents = eventsByDate.get(iso) || [];
                const isToday = iso === toISODate(today);
                const isSelected = iso === selectedDate;

                const dots = dayEvents.slice(0, 3).map((event) =>
                    `<span class="calendar-dot is-${escapeHtml(event.tipo)}${event.origem === "pessoal" ? " is-personal" : ""}" aria-hidden="true"></span>`
                ).join("");

                const extra = dayEvents.length > 3
                    ? `<span class="calendar-dot-more" aria-hidden="true">+${dayEvents.length - 3}</span>`
                    : "";

                const labelParts = [`${dayNumber} de ${MONTHS[month]} de ${year}`];
                if (dayEvents.length) {
                    labelParts.push(`${dayEvents.length} ${dayEvents.length === 1 ? "prazo" : "prazos"}`);
                }

                const classes = [
                    "calendar-day",
                    isToday ? "is-today" : "",
                    isSelected ? "is-selected" : ""
                ].filter(Boolean).join(" ");

                html += `
                    <td class="calendar-cell">
                        <button type="button" class="${classes}" data-date="${iso}"
                            aria-label="${escapeHtml(labelParts.join(", "))}"
                            aria-pressed="${isSelected}"
                            ${isToday ? 'aria-current="date"' : ""}>
                            <span class="calendar-day__num">${dayNumber}</span>
                            <span class="calendar-day__dots">${dots}${extra}</span>
                        </button>
                    </td>
                `;
            }

            html += "</tr>";
        }

        calBody.innerHTML = html;

        if (monthLabel) monthLabel.textContent = formatMonthLabel(view);
        if (calendarCaption) calendarCaption.textContent = `Calendário de ${formatMonthLabel(view)}`;
    }

    function renderEmptyState(kind) {
        if (!agendaEmpty) return;

        if (kind === "day") {
            agendaEmpty.innerHTML = `
                <i class="bi bi-calendar-x" aria-hidden="true"></i>
                <h3>Nenhum prazo neste dia</h3>
                <p>Escolha outra data no calendário ou veja os próximos prazos da comunidade.</p>
                <div class="calendar-empty__actions">
                    <button type="button" class="btn-cta-secondary" data-action="clear-day">Ver próximos prazos</button>
                    <button type="button" class="btn-cta-primary" data-bs-toggle="modal" data-bs-target="#prazoModal">
                        <i class="bi bi-plus-lg" aria-hidden="true"></i> Adicionar prazo
                    </button>
                </div>
            `;
        } else {
            agendaEmpty.innerHTML = `
                <i class="bi bi-calendar2-plus" aria-hidden="true"></i>
                <h3>Nenhum prazo por aqui ainda</h3>
                <p>A coordenação ainda não publicou datas. Você já pode adicionar seus próprios prazos — eles ficam salvos neste navegador.</p>
                <div class="calendar-empty__actions">
                    <button type="button" class="btn-cta-primary" data-bs-toggle="modal" data-bs-target="#prazoModal">
                        <i class="bi bi-plus-lg" aria-hidden="true"></i> Adicionar meu prazo
                    </button>
                    <a href="https://discord.gg/K5qquv4TfA" target="_blank" rel="noopener" class="btn-cta-secondary">
                        <i class="bi bi-discord" aria-hidden="true"></i> Avisar no Discord
                    </a>
                </div>
            `;
        }

        agendaEmpty.classList.remove("d-none");
    }

    function renderAgendaEvent(event) {
        const date = parseISODate(event.data);
        if (!date) return "";

        const meta = TYPE_META[event.tipo] || TYPE_META.outro;
        const isPersonal = event.origem === "pessoal";
        const timeLabel = event.hora
            ? `<span class="agenda-event__time"><i class="bi bi-clock" aria-hidden="true"></i> ${escapeHtml(event.hora)}</span>`
            : '<span class="agenda-event__time"><i class="bi bi-calendar3" aria-hidden="true"></i> Dia inteiro</span>';

        const details = [event.disciplina, event.local]
            .filter(Boolean)
            .map((item) => escapeHtml(item))
            .join(' <span aria-hidden="true">·</span> ');

        const description = event.descricao
            ? `<p class="agenda-event__desc">${escapeHtml(event.descricao)}</p>`
            : "";

        return `
            <article class="agenda-event">
                <div class="agenda-event__date" aria-hidden="true">
                    <span class="agenda-event__day">${date.getDate()}</span>
                    <span class="agenda-event__month">${formatShortMonth(date)}</span>
                </div>
                <div class="agenda-event__body">
                    <div class="agenda-event__badges">
                        <span class="event-badge is-${escapeHtml(event.tipo)}">
                            <i class="bi ${meta.icon}" aria-hidden="true"></i> ${meta.label}
                        </span>
                        ${isPersonal ? '<span class="event-badge is-personal"><i class="bi bi-person" aria-hidden="true"></i> Meu prazo</span>' : ""}
                        ${timeLabel}
                    </div>
                    <h3 class="agenda-event__title">${escapeHtml(event.titulo)}</h3>
                    ${details ? `<p class="agenda-event__meta">${details}</p>` : ""}
                    ${description}
                    <div class="agenda-event__actions">
                        <a class="agenda-event__link" href="${escapeHtml(googleCalendarUrl(event))}"
                            target="_blank" rel="noopener noreferrer">
                            <i class="bi bi-google" aria-hidden="true"></i> Google Agenda
                        </a>
                        ${isPersonal ? `
                            <button type="button" class="agenda-event__delete" data-delete-id="${escapeHtml(event.id)}"
                                aria-label="Excluir o prazo ${escapeHtml(event.titulo)}">
                                <i class="bi bi-trash3" aria-hidden="true"></i> Excluir
                            </button>
                        ` : ""}
                    </div>
                </div>
            </article>
        `;
    }

    function renderAgenda(visibleEvents) {
        if (!agendaList) return;

        let events;
        let title;

        if (selectedDate) {
            events = visibleEvents.filter((event) => event.data === selectedDate).sort(sortEvents);
            title = formatLongDate(selectedDate);
            if (clearDayBtn) clearDayBtn.classList.remove("d-none");
        } else {
            const todayIso = toISODate(today);
            events = visibleEvents
                .filter((event) => event.data >= todayIso)
                .sort(sortEvents)
                .slice(0, 8);
            title = "Próximos prazos";
            if (clearDayBtn) clearDayBtn.classList.add("d-none");
        }

        if (agendaTitle) agendaTitle.textContent = title;
        if (agendaSubtitle) {
            agendaSubtitle.textContent = events.length === 0
                ? "Nenhuma data para mostrar"
                : `${events.length} ${events.length === 1 ? "prazo" : "prazos"}`;
        }

        if (!events.length) {
            agendaList.innerHTML = "";
            renderEmptyState(selectedDate ? "day" : "all");
            return;
        }

        if (agendaEmpty) agendaEmpty.classList.add("d-none");
        agendaList.innerHTML = events.map(renderAgendaEvent).join("");
    }

    function updateFilterState() {
        if (!typeFilters) return;

        typeFilters.querySelectorAll("button[data-type]").forEach((button) => {
            const isActive = button.dataset.type === activeType;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function updatePersonalCount() {
        if (personalCountEl) personalCountEl.textContent = String(personalEvents.length);
    }

    function updateExportState() {
        if (!exportBtn) return;

        const hasEvents = getAllEvents().length > 0;
        exportBtn.disabled = !hasEvents;
        exportBtn.title = hasEvents
            ? "Baixar todos os prazos em um arquivo .ics"
            : "Nenhuma data para exportar";
    }

    function renderAll() {
        const visibleEvents = getAllEvents().filter(isVisible);
        renderCalendar(visibleEvents);
        renderAgenda(visibleEvents);
        updateFilterState();
        updatePersonalCount();
        updateExportState();
    }

    // ── Google Agenda e .ics ─────────────────────────────────────────────

    function formatGCalDate(date) {
        return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
    }

    function formatGCalDateTime(date) {
        return `${formatGCalDate(date)}T${pad2(date.getHours())}${pad2(date.getMinutes())}00`;
    }

    function googleCalendarUrl(event) {
        const date = parseISODate(event.data);
        if (!date) return "#";

        let start;
        let end;

        if (event.hora) {
            const [hours, minutes] = event.hora.split(":").map(Number);
            const startDate = new Date(date);
            startDate.setHours(hours, minutes, 0, 0);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
            start = formatGCalDateTime(startDate);
            end = formatGCalDateTime(endDate);
        } else {
            start = formatGCalDate(date);
            end = formatGCalDate(addDays(date, 1));
        }

        const details = [
            TYPE_META[event.tipo] ? TYPE_META[event.tipo].label : "Prazo",
            event.disciplina,
            event.descricao,
            "Adicionado pelo calendário da Conexão TI"
        ].filter(Boolean).join("\n");

        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: event.titulo,
            dates: `${start}/${end}`,
            details,
            location: event.local
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    function icsEscape(value) {
        return String(value || "")
            .replace(/\\/g, "\\\\")
            .replace(/\r?\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");
    }

    function formatIcsDate(date) {
        return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
    }

    function formatIcsDateTime(date) {
        return `${formatIcsDate(date)}T${pad2(date.getHours())}${pad2(date.getMinutes())}00`;
    }

    function formatIcsStamp(date) {
        return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`;
    }

    function buildIcs(events) {
        const stamp = formatIcsStamp(new Date());
        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Conexao TI//Calendario Academico//PT-BR",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "X-WR-CALNAME:Conexão TI — Calendário"
        ];

        events.forEach((event) => {
            const date = parseISODate(event.data);
            if (!date) return;

            lines.push("BEGIN:VEVENT");
            lines.push(`UID:${icsEscape(event.id)}@conexao-ti`);
            lines.push(`DTSTAMP:${stamp}`);

            if (event.hora) {
                const [hours, minutes] = event.hora.split(":").map(Number);
                const start = new Date(date);
                start.setHours(hours, minutes, 0, 0);
                const end = new Date(start.getTime() + 60 * 60 * 1000);
                lines.push(`DTSTART:${formatIcsDateTime(start)}`);
                lines.push(`DTEND:${formatIcsDateTime(end)}`);
            } else {
                lines.push(`DTSTART;VALUE=DATE:${formatIcsDate(date)}`);
                lines.push(`DTEND;VALUE=DATE:${formatIcsDate(addDays(date, 1))}`);
            }

            lines.push(`SUMMARY:${icsEscape(event.titulo)}`);

            const description = [
                TYPE_META[event.tipo] ? TYPE_META[event.tipo].label : "",
                event.disciplina,
                event.descricao
            ].filter(Boolean).join(" — ");

            if (description) lines.push(`DESCRIPTION:${icsEscape(description)}`);
            if (event.local) lines.push(`LOCATION:${icsEscape(event.local)}`);
            lines.push("END:VEVENT");
        });

        lines.push("END:VCALENDAR");
        return `${lines.join("\r\n")}\r\n`;
    }

    function downloadIcs() {
        const events = getAllEvents();
        if (!events.length) return;

        const blob = new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "conexao-ti-calendario.ics";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        showNotice("Calendário exportado em .ics.");
    }

    // ── Avisos e formulário ──────────────────────────────────────────────

    function showNotice(message, isError) {
        if (!noticeEl) return;

        noticeEl.textContent = message;
        noticeEl.classList.remove("d-none");
        noticeEl.classList.toggle("is-error", Boolean(isError));

        window.clearTimeout(noticeTimer);
        noticeTimer = window.setTimeout(() => {
            noticeEl.classList.add("d-none");
        }, 5000);
    }

    function showFormError(message) {
        if (!formError) return;
        formError.textContent = message;
        formError.classList.remove("d-none");
    }

    function clearFormError() {
        if (!formError) return;
        formError.textContent = "";
        formError.classList.add("d-none");
    }

    function changeMonth(offset) {
        view = new Date(view.getFullYear(), view.getMonth() + offset, 1);
        selectedDate = null;
        renderAll();
    }

    // ── Eventos da interface ─────────────────────────────────────────────

    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    const todayBtn = document.getElementById("todayBtn");

    if (prevBtn) prevBtn.addEventListener("click", () => changeMonth(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => changeMonth(1));
    if (todayBtn) {
        todayBtn.addEventListener("click", () => {
            view = new Date(today.getFullYear(), today.getMonth(), 1);
            selectedDate = toISODate(today);
            renderAll();
        });
    }

    calBody.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-date]");
        if (!button) return;

        const iso = button.dataset.date;
        selectedDate = selectedDate === iso ? null : iso;
        renderAll();
    });

    if (typeFilters) {
        typeFilters.addEventListener("click", (event) => {
            const button = event.target.closest("button[data-type]");
            if (!button) return;

            activeType = button.dataset.type || "all";
            renderAll();
        });
    }

    if (showPersonalInput) {
        showPersonal = showPersonalInput.checked;
        showPersonalInput.addEventListener("change", () => {
            showPersonal = showPersonalInput.checked;
            renderAll();
        });
    }

    if (clearDayBtn) {
        clearDayBtn.addEventListener("click", () => {
            selectedDate = null;
            renderAll();
        });
    }

    if (exportBtn) exportBtn.addEventListener("click", downloadIcs);

    if (agendaPanel) {
        agendaPanel.addEventListener("click", (event) => {
            const clearButton = event.target.closest('[data-action="clear-day"]');
            if (clearButton) {
                selectedDate = null;
                renderAll();
                return;
            }

            const deleteButton = event.target.closest("[data-delete-id]");
            if (!deleteButton) return;

            const id = deleteButton.dataset.deleteId;
            const item = personalEvents.find((entry) => entry.id === id);
            if (!item) return;

            if (!window.confirm(`Excluir o prazo "${item.titulo}"?`)) return;

            personalEvents = personalEvents.filter((entry) => entry.id !== id);
            const saved = savePersonalEvents();
            renderAll();
            showNotice(
                saved ? "Prazo excluído." : "Prazo excluído desta sessão, mas o navegador bloqueou o salvamento.",
                !saved
            );
        });
    }

    if (modalEl) {
        modalEl.addEventListener("show.bs.modal", () => {
            clearFormError();
            if (form) {
                form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
                    field.removeAttribute("aria-invalid");
                });
            }
            const dateInput = document.getElementById("prazoData");
            if (dateInput && !dateInput.value) {
                dateInput.value = selectedDate || toISODate(today);
            }
            const titleInput = document.getElementById("prazoTitulo");
            if (titleInput) {
                window.setTimeout(() => titleInput.focus(), 60);
            }
        });

        modalEl.addEventListener("shown.bs.modal", () => {
            const titleInput = document.getElementById("prazoTitulo");
            if (titleInput) titleInput.focus();
        });
    }

    if (form) {
        form.addEventListener("input", (event) => {
            if (event.target.matches("input, select, textarea")) {
                event.target.removeAttribute("aria-invalid");
                clearFormError();
            }
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const titleInput = document.getElementById("prazoTitulo");
            const dateInput = document.getElementById("prazoData");
            const timeInput = document.getElementById("prazoHora");
            const typeInput = document.getElementById("prazoTipo");
            const subjectInput = document.getElementById("prazoDisciplina");
            const placeInput = document.getElementById("prazoLocal");
            const notesInput = document.getElementById("prazoDescricao");

            const titulo = titleInput ? titleInput.value.trim() : "";
            const data = dateInput ? dateInput.value : "";
            const date = parseISODate(data);

            if (!titulo || !date) {
                if (!titulo && titleInput) titleInput.setAttribute("aria-invalid", "true");
                if (!date && dateInput) dateInput.setAttribute("aria-invalid", "true");
                showFormError("Preencha o título e uma data válida para salvar o prazo.");
                if (!titulo && titleInput) titleInput.focus();
                else if (!date && dateInput) dateInput.focus();
                return;
            }

            const newEvent = {
                id: `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
                titulo,
                tipo: typeInput ? typeInput.value : "prova",
                data,
                hora: timeInput ? timeInput.value : "",
                disciplina: subjectInput ? subjectInput.value : "",
                local: placeInput ? placeInput.value : "",
                descricao: notesInput ? notesInput.value : ""
            };

            const normalized = normalizeEvent(newEvent, "pessoal", newEvent.id);
            if (!normalized) {
                showFormError("Não foi possível salvar este prazo. Confira os dados e tente novamente.");
                return;
            }

            personalEvents.push(normalized);
            const saved = savePersonalEvents();

            selectedDate = normalized.data;
            view = new Date(date.getFullYear(), date.getMonth(), 1);
            renderAll();

            const modal = window.bootstrap && window.bootstrap.Modal
                ? window.bootstrap.Modal.getOrCreateInstance(modalEl)
                : null;
            if (modal) modal.hide();

            form.reset();
            clearFormError();
            showNotice(
                saved
                    ? "Prazo adicionado ao seu calendário."
                    : "Prazo adicionado nesta sessão, mas o navegador bloqueou o salvamento.",
                !saved
            );
        });
    }

    // Permite compartilhar um dia específico: calendario.html#2026-11-20
    const hash = (window.location.hash || "").replace("#", "");
    if (parseISODate(hash)) {
        const hashDate = parseISODate(hash);
        selectedDate = toISODate(hashDate);
        view = new Date(hashDate.getFullYear(), hashDate.getMonth(), 1);
    }

    renderAll();
})();
