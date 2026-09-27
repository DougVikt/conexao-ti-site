import { SAMPLES, FOLDERS, MIME_ICON } from './data.js';


function mimeIcon(mime) {
    if (!mime) return MIME_ICON.default;
    for (const k in MIME_ICON) { if (k !== "default" && mime.startsWith(k)) return MIME_ICON[k]; }
    return MIME_ICON.default;
}
function fmtSize(n) {
    if (!n) return "";
    const u = ["B", "KB", "MB", "GB"]; let i = 0;
    while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
    return (Math.round(n * 10) / 10) + " " + u[i];
}

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const modalEl = document.getElementById("folderModal");
const modal = new bootstrap.Modal(modalEl);

FOLDERS.forEach((f) => {
    const col = document.createElement("div");
    col.className = "col";
    const card = document.createElement("div");
    card.className = "folder-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.dataset.odId = "folder-card-" + f.slug;
    card.dataset.name = f.name.toLowerCase();
    card.innerHTML =
        '<span class="folder-icon"><i class="bi bi-folder2"></i></span>' +
        '<span class="folder-name">' + f.name + '</span>' +
        '<span class="folder-meta"><span>Pasta · Drive</span>' +
        '<span class="open">ver arquivos <i class="bi bi-box-arrow-up-right"></i></span></span>';
    const open = () => openFolder(f);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    col.appendChild(card);
    grid.insertBefore(col, empty);
});

function openFolder(f) {
    document.getElementById("folderModalTitle").textContent = f.name;
    document.getElementById("folderModalSub").textContent = "Pasta do Drive";
    const driveUrl = "https://drive.google.com/drive/folders/" + encodeURIComponent(f.driveId);
    document.getElementById("folderModalDrive").href = driveUrl;
    const body = document.getElementById("folderModalBody");
    loadFiles(f, body);
    modal.show();
}

function loadFiles(f, body) {
    // Listagem manual (edite o objeto SAMPLES abaixo quando quiser trocar os arquivos)
    const files = SAMPLES[f.slug] || [
        { name: "Resumo — " + f.name + ".pdf", mimeType: "application/pdf", size: 820000 },
        { name: "Lista de exercícios.pdf", mimeType: "application/pdf", size: 340000 },
        { name: "Slides — aula 01.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2100000 }
    ];
    renderFiles(body, files);
}

function renderFiles(body, files) {
    if (!files.length) {
        body.innerHTML = '<div class="text-center text-secondary py-4">Pasta vazia.</div>';
        return;
    }
    // Listagem apenas dos nomes (sem linkar os arquivos), conforme pedido
    let html = '<ul class="list-group" style="--bs-list-group-bg:transparent;--bs-list-group-border-color:var(--border);">';
    files.forEach((file) => {
        html += '<li class="list-group-item d-flex align-items-center gap-3" style="background:transparent;border-color:var(--border);color:var(--fg);">'
            + '<i class="bi ' + mimeIcon(file.mimeType) + ' fs-5" style="color:var(--blue-tint);"></i>'
            + '<div class="flex-grow-1 text-truncate"><div class="text-truncate">' + file.name + '</div>'
            + '<small class="text-secondary font-monospace" style="font-size:11px;">' + (fmtSize(file.size) || "Drive") + '</small></div>'
            + '</li>';
    });
    html += '</ul>';
    body.innerHTML = html;
}

document.getElementById("filter").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll(".folder-card").forEach((c) => {
        const match = c.dataset.name.includes(q);
        c.closest(".col").style.display = match ? "" : "none";
        if (match) visible++;
    });
    empty.hidden = visible > 0;
});