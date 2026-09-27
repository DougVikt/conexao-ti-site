// Pastas do drive
export const FOLDERS = [
    { name: "Redes de Computadores", slug: "redes", driveId: "PLACEHOLDER_REDES" },
    { name: "Banco de Dados", slug: "banco-dados", driveId: "PLACEHOLDER_BANCO-DADOS" },
    { name: "Programação em Python", slug: "python", driveId: "PLACEHOLDER_PYTHON" },
    { name: "Segurança da Informação", slug: "seguranca", driveId: "PLACEHOLDER_SEGURANCA" },
    { name: "Inteligência Artificial", slug: "ia", driveId: "PLACEHOLDER_IA" },
    { name: "Infraestrutura de TI", slug: "infraestrutura", driveId: "PLACEHOLDER_INFRAESTRUTURA" },
    { name: "Desenvolvimento Web", slug: "dev-web", driveId: "PLACEHOLDER_DEV-WEB" },
    { name: "Suporte Técnico", slug: "suporte", driveId: "PLACEHOLDER_SUPORTE" }
];

// Arquivos por pasta 
export const SAMPLES = {
    "redes": [
        { name: "Apostila - Modelo OSI.pdf", mimeType: "application/pdf", size: 1240000 },
        { name: "Exercícios de sub-redes.pdf", mimeType: "application/pdf", size: 410000 },
        { name: "Slides - Roteamento TCP-IP.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2300000 },
        { name: "Comandos de rede úteis.txt", mimeType: "text/plain", size: 12000 }
    ],
    "banco-dados": [
        { name: "Modelo Entidade-Relacionamento.pdf", mimeType: "application/pdf", size: 980000 },
        { name: "SQL - consultas básicas a avançadas.pdf", mimeType: "application/pdf", size: 1530000 },
        { name: "Projeto biblioteca - modelo físico.png", mimeType: "image/png", size: 540000 },
        { name: "Slides - Normalização.pptx", mimeType: "application/vnd.google-apps.presentation", size: 1980000 }
    ],
    "python": [
        { name: "Introdução à Python.pdf", mimeType: "application/pdf", size: 870000 },
        { name: "Exercícios resolvidos - listas e laços.ipynb", mimeType: "application/vnd.google-apps.document", size: 76000 },
        { name: "Projeto jogo da velha.py", mimeType: "text/x-python", size: 24000 },
        { name: "Slides - POO em Python.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2100000 }
    ],
    "seguranca": [
        { name: "Apostila - Criptografia básica.pdf", mimeType: "application/pdf", size: 1110000 },
        { name: "Checklist de segurança.pdf", mimeType: "application/pdf", size: 320000 },
        { name: "Slides - Engenharia social.pptx", mimeType: "application/vnd.google-apps.presentation", size: 1850000 },
        { name: "Política de senhas.docx", mimeType: "application/vnd.google-apps.document", size: 90000 }
    ],
    "ia": [
        { name: "Introdução a Machine Learning.pdf", mimeType: "application/pdf", size: 1340000 },
        { name: "Redes neurais - conceitos.pdf", mimeType: "application/pdf", size: 1020000 },
        { name: "Notebook - regressão linear.ipynb", mimeType: "application/vnd.google-apps.document", size: 88000 },
        { name: "Slides - IA generativa.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2400000 }
    ],
    "infraestrutura": [
        { name: "Apostila - Virtualização.pdf", mimeType: "application/pdf", size: 1190000 },
        { name: "Topologia de servidores.pdf", mimeType: "application/pdf", size: 760000 },
        { name: "Slides - Cloud computing.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2050000 },
        { name: "Checklist de backup.docx", mimeType: "application/vnd.google-apps.document", size: 70000 }
    ],
    "dev-web": [
        { name: "HTML e CSS - guia rápido.pdf", mimeType: "application/pdf", size: 940000 },
        { name: "JavaScript essencial.pdf", mimeType: "application/pdf", size: 1280000 },
        { name: "Slides - React para iniciantes.pptx", mimeType: "application/vnd.google-apps.presentation", size: 2200000 },
        { name: "Projeto portfólio.zip", mimeType: "application/zip", size: 3400000 }
    ],
    "suporte": [
        { name: "Manual de atendimento ao usuário.pdf", mimeType: "application/pdf", size: 690000 },
        { name: "Checklist de formatação.pdf", mimeType: "application/pdf", size: 280000 },
        { name: "Slides - Hardware básico.pptx", mimeType: "application/vnd.google-apps.presentation", size: 1750000 },
        { name: "Planilha de chamados.xlsx", mimeType: "application/vnd.google-apps.spreadsheet", size: 60000 }
    ]
};

// icones 
export const MIME_ICON = {
    "application/pdf": "bi-file-earmark-pdf",
    "application/vnd.google-apps.document": "bi-file-earmark-text",
    "application/vnd.google-apps.spreadsheet": "bi-file-earmark-spreadsheet",
    "application/vnd.google-apps.presentation": "bi-file-earmark-slides",
    "application/vnd.google-apps.folder": "bi-folder2",
    "image/": "bi-file-earmark-image",
    "video/": "bi-file-earmark-play",
    "default": "bi-file-earmark"
};