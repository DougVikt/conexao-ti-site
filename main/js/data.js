// Dados oficiais da comunidade Conexão TI.
// Compatível com abertura direta por duplo clique (file://).

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const SOCIAL_STATS = {
    membersCount: "250+",
    institutions: "ADS · Sistemas · Redes",
    postsCount: "100+",
    materialsCount: "120+"
};

const SOCIAL_CHANNELS = [
    {
        id: "instagram",
        name: "Instagram Oficial",
        handle: "@conexaoti_",
        url: "https://www.instagram.com/conexaoti_/",
        followers: "Novidades & Reels",
        icon: "bi-instagram",
        colorClass: "brand-instagram",
        badge: "Dicas & Bastidores",
        description: "Carrosséis técnicos, novidades da área, enquetes de tecnologia e destaque dos projetos dos alunos.",
        cta: "Seguir @conexaoti_"
    },
    {
        id: "linkedin",
        name: "LinkedIn · Página Oficial",
        handle: "Conexão TI (Company)",
        url: "https://www.linkedin.com/company/conex%C3%A3o-ti/home/",
        followers: "Institucional & Destaques",
        icon: "bi-linkedin",
        colorClass: "brand-linkedin",
        badge: "Página Oficial",
        description: "Acompanhe publicações oficiais, parcerias acadêmicas e novidades institucionais da comunidade.",
        cta: "Seguir Página"
    },
    {
        id: "linkedin-post",
        name: "LinkedIn · Post Oficial",
        handle: "Conexão TI (Company)",
        url: "https://www.linkedin.com/company/conex%C3%A3o-ti/home/",
        followers: "Publicações Recentes",
        icon: "bi-linkedin",
        colorClass: "brand-linkedin",
        badge: "Post Oficial",
        description: "Publicações oficiais da comunidade Conexão TI no LinkedIn.",
        cta: "Seguir Página"
    },
    {
        id: "discord",
        name: "Discord da Comunidade",
        handle: "Servidor de Estudos & Voz",
        url: "https://discord.gg/K5qquv4TfA",
        followers: "Salas de Estudo 24/7",
        icon: "bi-discord",
        colorClass: "brand-discord",
        badge: "Pair Programming & Voz",
        description: "Canais de texto e voz para tirar dúvidas de código, estudar em grupo e trocar ideias.",
        cta: "Entrar no Discord"
    },
    {
        id: "drive",
        name: "Google Drive Coletivo",
        handle: "Biblioteca Central Conexão TI",
        url: "https://drive.google.com/drive/folders/1N5kTne7aYPXn-N57nHIgYAUfW1V-5Uzx",
        followers: "120+ arquivos e pastas",
        icon: "bi-google",
        colorClass: "brand-drive",
        badge: "Material Acadêmico",
        description: "Resumos em PDF, provas anteriores, exercícios resolvidos, slides e materiais de apoio.",
        cta: "Acessar Drive"
    },
    {
        id: "whatsapp",
        name: "WhatsApp da Comunidade",
        handle: "Grupo Oficial Conexão TI",
        url: "https://chat.whatsapp.com/GV7oWrSgWoIJ9DYlEh9h18",
        followers: "Comunicação Direta",
        icon: "bi-whatsapp",
        colorClass: "brand-whatsapp",
        badge: "Grupo Oficial",
        description: "Avisos rápidos, dúvidas de última hora, oportunidades de estágio e networking direto com a comunidade.",
        cta: "Entrar no Grupo"
    }
];

const FEATURED_POSTS = [
    {
        id: "post-1",
        platform: "Instagram",
        platformIcon: "bi-instagram",
        platformColor: "#e1306c",
        author: "@conexaoti_",
        authorAvatar: "img/logo.png",
        timeAgo: "Destaque Recente",
        tag: "Destaque de Projetos",
        title: "Mostre seu código: envie seu repositório do GitHub para ser divulgado!",
        text: "Está desenvolvendo um projeto pessoal ou acadêmico? Compartilhe o link do seu GitHub no post oficial e receba feedback da comunidade.",
        image: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=700&h=380&fit=crop",
        likes: "Participe da votação",
        comments: "Comente seu repositório",
        url: "https://www.instagram.com/conexaoti_/p/DcjHge4o0G3/",
        embedUrl: "https://www.instagram.com/p/DcjHge4o0G3/",
        ctaText: "Ver no Instagram"
    },
    {
        id: "post-2",
        platform: "Instagram",
        platformIcon: "bi-instagram",
        platformColor: "#e1306c",
        author: "@conexaoti_",
        authorAvatar: "img/logo.png",
        timeAgo: "Carrossel de Estudo",
        tag: "Carrossel Técnico",
        title: "Dicas práticas de tecnologia, carreira e ferramentas para universitários",
        text: "Confira o carrossel com dicas de organização para conciliar faculdade, estágios e projetos práticos.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=380&fit=crop",
        likes: "Carrossel interativo",
        comments: "Dicas nos comentários",
        url: "https://www.instagram.com/conexaoti_/p/DeNgAVzFiKJ/",
        embedUrl: "https://www.instagram.com/p/DeNgAVzFiKJ/",
        ctaText: "Abrir Carrossel"
    },
    {
        id: "post-3",
        platform: "LinkedIn",
        platformIcon: "bi-linkedin",
        platformColor: "#0a66c2",
        author: "Conexão TI (Página Oficial)",
        authorAvatar: "img/logo.png",
        timeAgo: "Institucional",
        tag: "Comunidade Acadêmica",
        title: "Conexão TI: conectando estudantes e o mercado de tecnologia",
        text: "Aceleramos a jornada de estudantes com conhecimento prático, materiais, oportunidades e uma rede que ajuda a avançar.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=380&fit=crop",
        likes: "Conexões ativas",
        comments: "Debates abertos",
        url: "https://www.linkedin.com/company/conex%C3%A3o-ti/home/",
        embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7498802938384154625",
        ctaText: "Ver no LinkedIn"
    },
    {
        id: "post-4",
        platform: "LinkedIn",
        platformIcon: "bi-linkedin",
        platformColor: "#0a66c2",
        author: "Conexão TI (Página Oficial)",
        authorAvatar: "img/logo.png",
        timeAgo: "Institucional",
        tag: "Atualização Importante",
        title: "Novidades da Conexão TI: parcerias, eventos e oportunidades exclusivas",
        text: "Estamos anunciando novas parcerias estratégicas, eventos gratuitos e oportunidades exclusivas para nossa comunidade. Confira os detalhes e como participar!",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=380&fit=crop",
        likes: "Visualizações em crescimento",
        comments: "Discussões ativas",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7498799924717793282/",
        embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7498799924717793282",
        ctaText: "Ver no LinkedIn"
    },
    {
        id: "post-5",
        platform: "Discord",
        platformIcon: "bi-discord",
        platformColor: "#5865f2",
        author: "Comunidade Conexão TI",
        authorAvatar: "img/logo.png",
        timeAgo: "Ao vivo / 24/7",
        tag: "Salas de Voz",
        title: "Salas de estudo abertas no Discord para tirar dúvidas e codar junto",
        text: "Entre no servidor para discutir sintaxe, algoritmos, banco de dados e outros temas com estudantes da comunidade.",
        image: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=700&h=380&fit=crop",
        likes: "Canais de voz ativos",
        comments: "Tire dúvidas ao vivo",
        url: "https://discord.gg/K5qquv4TfA",
        ctaText: "Entrar no Discord"
    }
];

const COMMUNITY_PERKS = [
    { icon: "bi-people-fill", title: "Networking Ativo", desc: "Conecte-se com alunos e veteranos no LinkedIn e Discord, trocando experiências reais de mercado." },
    { icon: "bi-folder2-open", title: "Drive Coletivo", desc: "Acesso a resumos, provas anteriores e gabaritos comentados pela comunidade." },
    { icon: "bi-megaphone-fill", title: "Visibilidade dos Seus Projetos", desc: "Seus repositórios do GitHub e conquistas podem ser divulgados nos canais oficiais." },
    { icon: "bi-discord", title: "Tira-Dúvidas 24/7", desc: "Salas de voz e texto para você não travar em um bug antes das entregas." },
    { icon: "bi-people-fill", title: "Coordenação Presente", desc: "ADMs ativos na moderação, na organização de eventos e no apoio aos projetos da comunidade." }
];

// ==============================
// CONFIGURAÇÃO DA API DO DRIVE
// ==============================
// Configuração será carregada de config.js (se existir) ou usar valores padrão vazios
let DRIVE_CONFIG = {
    apiKey: '',
    parentFolderId: ''
};

// Tentar carregar configuração externa
async function loadDriveConfig() {
    try {
        // Tentar importar o módulo de configuração
        const configModule = await import('./config.js');
        if (configModule && configModule.CONEXAO_CONFIG && configModule.CONEXAO_CONFIG.drive) {
            DRIVE_CONFIG = {
                apiKey: configModule.CONEXAO_CONFIG.drive.apiKey || '',
                parentFolderId: configModule.CONEXAO_CONFIG.drive.parentFolderId || ''
            };
            console.log('Configuração do Drive carregada com sucesso');
        } else {
            console.warn('Arquivo de configuração encontrado mas estrutura inválida. Usando configuração vazia.');
        }
    } catch (error) {
        // Se o arquivo de configuração não existir ou houver erro, usar configuração vazia
        // Isso é esperado em ambientes onde config.js não é fornecido
        console.info('Arquivo de configuração não encontrado. Usando valores vazios para Drive API.');
        DRIVE_CONFIG = {
            apiKey: '',
            parentFolderId: ''
        };
    }
}

// Mapeamento de nomes de pastas para ícones Bootstrap Icons
const FOLDER_ICON_MAP = {
    'redes': 'bi-wifi',
    'banco-dados': 'bi-database',
    'python': 'bi-file-earmark-code',
    'seguranca': 'bi-shield-lock',
    'ia': 'bi-brain',
    'desenvolvimento-web': 'bi-code-slash',
    'todas-as-materias': 'bi-folder2-open',
    'default': 'bi-folder2'
};

// Lista de pastas que será preenchida dinamicamente
let FOLDERS = [];

// Criar o objeto CONEXAO_DATA imediatamente com os dados estáticos
// As pastas do Drive serão atualizadas assincronamente
window.CONEXAO_DATA = {
    SOCIAL_STATS,
    SOCIAL_CHANNELS,
    FEATURED_POSTS,
    COMMUNITY_PERKS,
    FOLDERS
};

/**
 * Normaliza string para slug: remove acentos, caracteres não alfanuméricos, converte espaços para hífens
 * @param {string} str
 * @returns {string}
 */
function normalizeSlug(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Busca pastas dentro de uma pasta pai no Google Drive
 * @returns {Promise<Array>} Array de objetos de pasta compatíveis com o formato atual
 */
async function fetchFoldersFromDrive() {
    try {
        // Verifica se as credenciais estão configuradas
        if (DRIVE_CONFIG.apiKey === '' || !DRIVE_CONFIG.parentFolderId) {
            console.warn('Credenciais da API do Drive não configuradas. Usando lista estática de fallback.');
            return getFallbackFolders();
        }

        // Busca pastas e arquivos em paralelo
        const [foldersResponse, filesResponse] = await Promise.all([
            (() => {
                const url = new URL('https://www.googleapis.com/drive/v3/files');
                url.searchParams.set('q', `\"${DRIVE_CONFIG.parentFolderId}\" in parents and mimeType = \"application/vnd.google-apps.folder\" and trashed = false`);
                url.searchParams.set('fields', 'files(id,name)');
                url.searchParams.set('key', DRIVE_CONFIG.apiKey);
                return fetch(url.toString());
            })(),
            (() => {
                const url = new URL('https://www.googleapis.com/drive/v3/files');
                url.searchParams.set('q', `\"${DRIVE_CONFIG.parentFolderId}\" in parents and mimeType != \"application/vnd.google-apps.folder\" and trashed = false`);
                url.searchParams.set('fields', 'files(id,parents)');
                url.searchParams.set('key', DRIVE_CONFIG.apiKey);
                return fetch(url.toString());
            })()
        ]);

        if (!foldersResponse.ok) {
            throw new Error(`Falha na API do Drive (buscando pastas): ${foldersResponse.status}`);
        }

        if (!filesResponse.ok) {
            throw new Error(`Falha na API do Drive (buscando arquivos): ${filesResponse.status}`);
        }

        const foldersData = await foldersResponse.json();
        const filesData = await filesResponse.json();
        const folders = foldersData.files || [];
        const files = filesData.files || [];

        // Conta arquivos por pasta pai
        const fileCountMap = new Map();
        for (const file of files) {
            if (file.parents) {
                for (const parentId of file.parents) {
                    fileCountMap.set(parentId, (fileCountMap.get(parentId) || 0) + 1);
                }
            }
        }

        // Transforma a resposta no formato esperado pelo site
        // Cada folder agora inclui os arquivos dentro dele
        return folders.map(folder => {
            const name = folder.name.trim();
            const slug = normalizeSlug(name);
            const icon = FOLDER_ICON_MAP[slug] || FOLDER_ICON_MAP.default;

            // Filtrar arquivos que pertencem a esta pasta
            const folderFiles = files.filter(file =>
                file.parents && file.parents.includes(folder.id)
            );

            return {
                name,
                slug,
                icon,
                driveId: folder.id,
                filesCount: fileCountMap.get(folder.id) || 0,
                // Include files for rendering in biblioteca
                files: folderFiles.map(file => ({
                    id: file.id,
                    name: file.name,
                    // Determine file icon based on extension
                    getIcon: function() {
                        const ext = (this.name.split('.').pop() || '').toLowerCase() || 'default';
                        let fileIcon = 'bi-folder2';
                        if (ext === 'pdf') fileIcon = 'bi-file-pdf';
                        else if (ext === 'doc' || ext === 'docx') fileIcon = 'bi-file-word';
                        else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') fileIcon = 'bi-image';
                        else if (ext === 'zip' || ext === 'rar') fileIcon = 'bi-file-zip';
                        else if (ext === 'ppt' || ext === 'pptx') fileIcon = 'bi-file-ppt';
                        else if (ext === 'xls' || ext === 'xlsx') fileIcon = 'bi-file-excel';
                        return fileIcon;
                    }
                }))
            };
        });
    } catch (error) {
        console.error('Erro ao buscar pastas do Google Drive:', error);
        // Em caso de erro, retorna lista estática de fallback
        return getFallbackFolders();
    }
}

/**
 * Retorna a lista estática de pastas como fallback
 * @returns {Array} Lista de pastas estáticas
 */
function getFallbackFolders() {
    return [
        {
            name: "Redes",
            slug: "redes",
            icon: "bi-wifi",
            driveId: "1A2B3C4D5E6F7G8H9I0J",
            filesCount: 0,
            files: [
                { id: "fallback-1", name: "Introdução às Redes.pdf", getIcon: function() { const ext = (this.name.split('.').pop() || '').toLowerCase(); return ext === 'pdf' ? 'bi-file-pdf' : 'bi-file-text'; } }
            ]
        },
        {
            name: "Banco de Dados",
            slug: "banco-dados",
            icon: "bi-database",
            driveId: "2B3C4D5E6F7G8H9I0J1A",
            filesCount: 0,
            files: [
                { id: "fallback-2", name: "Exercícios SQL.docx", getIcon: function() { const ext = (this.name.split('.').pop() || '').toLowerCase(); return ext === 'doc' || ext === 'docx' ? 'bi-file-word' : 'bi-file-text'; } }
            ]
        },
        {
            name: "Python",
            slug: "python",
            icon: "bi-file-earmark-code",
            driveId: "3C4D5E6F7G8H9I0J1A2B",
            filesCount: 0,
            files: [
                { id: "fallback-3", name: "exercicio01.py", getIcon: function() { const ext = (this.name.split('.').pop() || '').toLowerCase(); return ext === 'py' ? 'bi-file-code' : 'bi-file-text'; } }
            ]
        },
        {
            name: "Segurança",
            slug: "seguranca",
            icon: "bi-shield-lock",
            driveId: "4D5E6F7G8H9I0J1A2B3C",
            filesCount: 0,
            files: []
        },
        {
            name: "Inteligência Artificial",
            slug: "ia",
            icon: "bi-brain",
            driveId: "5E6F7G8H9I0J1A2B3C4D",
            filesCount: 0,
            files: []
        },
        {
            name: "Desenvolvimento Web",
            slug: "desenvolvimento-web",
            icon: "bi-code-slash",
            driveId: "6F7G8H9I0J1A2B3C4D5E",
            filesCount: 0,
            files: []
        },
        {
            name: "Todas as Matérias",
            slug: "todas-as-materias",
            icon: "bi-folder2-open",
            driveId: DRIVE_CONFIG.parentFolderId,
            filesCount: 0,
            files: []
        }
    ];
}

/**
 * Conta o número de arquivos (não pastas) dentro de cada pasta pai
 * @returns {Promise<Map<string, number>>} Map contendo folderId -> contagem de arquivos
 */
async function getFileCountMap() {
    try {
        if (DRIVE_CONFIG.apiKey === '' || !DRIVE_CONFIG.parentFolderId) {
            return new Map(); // Retorna mapa vazio se não houver configuração
        }

        const url = new URL('https://www.googleapis.com/drive/v3/files');
        url.searchParams.set('q', `\"${DRIVE_CONFIG.parentFolderId}\" in parents and mimeType != \"application/vnd.google-apps.folder\" and trashed = false`);
        url.searchParams.set('fields', 'files(id,parents)');
        url.searchParams.set('key', DRIVE_CONFIG.apiKey);

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Falha na API do Drive (buscando arquivos): ${response.status}`);
        }

        const data = await response.json();
        const files = data.files || [];

        // Conta arquivos por pasta pai
        const countMap = new Map();
        for (const file of files) {
            if (file.parents) {
                for (const parentId of file.parents) {
                    countMap.set(parentId, (countMap.get(parentId) || 0) + 1);
                }
            }
        }

        return countMap;
    } catch (error) {
        console.error('Erro ao contar arquivos no Google Drive:', error);
        return new Map(); // Retorna mapa vazio em caso de erro
    }
}

/**
 * Inicializa o carregamento das pastas do Drive
 * Deve ser chamado assim que o módulo for carregado
 */
async function initializeDriveFolders() {
    try {
        // Primeiro carrega a configuração
        await loadDriveConfig();
        const folders = await fetchFoldersFromDrive();
        // Atualiza a lista de pastas no objeto CONEXAO_DATA
        if (typeof window !== 'undefined' && window.CONEXAO_DATA) {
            // Mutate the existing array to maintain reference with exported FOLDERS
            window.CONEXAO_DATA.FOLDERS.length = 0; // Clear existing items
            window.CONEXAO_DATA.FOLDERS.push(...folders); // Add new items
        }
        // Dispara evento personalizado para que outros scripts saibam que os dados estão prontos
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('drive-data-loaded', { detail: { folders } }));
        }
    } catch (error) {
        console.error('Erro ao inicializar pastas do Drive:', error);
        // Garantir que o evento seja disparado mesmo em erro, usando fallback
        if (typeof window !== 'undefined' && window.CONEXAO_DATA) {
            window.CONEXAO_DATA.FOLDERS.length = 0;
        }
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('drive-data-loaded', { detail: { folders: getFallbackFolders() } }));
        }
    }
}

/**
 * Prepara o feed do Instagram a partir dos posts em destaque.
 * O embed oficial (instagram.com/embed.js) é aplicado no frontend, sem
 * necessidade de token da Graph API.
 */
async function initializeInstagramFeed() {
    try {
        const featuredPosts = (typeof window !== 'undefined' && window.CONEXAO_DATA && window.CONEXAO_DATA.FEATURED_POSTS) || [];
        const instagramPosts = featuredPosts.filter(post => post.platform === 'Instagram');

        if (typeof window !== 'undefined' && window.CONEXAO_DATA) {
            window.CONEXAO_DATA.INSTAGRAM_FEED = instagramPosts;
        }

        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('instagram-data-loaded', { detail: { posts: instagramPosts } }));
        }
    } catch (error) {
        console.error('Erro ao preparar feed do Instagram:', error);
    }
}
/**
 * Fetch Instagram oEmbed data for a post using tokenless Facebook Graph API
 * @param {string} postUrl - Instagram post URL
 * @returns {Promise<string|null>} HTML embed blockquote or null on failure
 */
async function fetchInstagramOEmbed(postUrl) {
    try {
        // Using Facebook Graph API v26.0+ for tokenless Instagram oEmbed
        // As per research: https://developers.facebook.com/blog/post/2026/06/15/tokenless-access-to-meta-oembed-apis/
        const oEmbedUrl = new URL('https://graph.facebook.com/v26.0/instagram_oembed');
        oEmbedUrl.searchParams.set('url', postUrl);
        oEmbedUrl.searchParams.set('hidecaption', 'true'); // Hide caption as required
        oEmbedUrl.searchParams.set('maxwidth', '658'); // Standard width


        const response = await fetch(oEmbedUrl.toString());
        if (!response.ok) {
            throw new Error(`Instagram oEmbed failed: ${response.status}`);
        }
        const data = await response.json();
        return data.html || null;
    } catch (error) {
        console.warn(`Failed to load Instagram oEmbed for ${postUrl}:`, error);
        return null;
    }
}

/**
 * Extract a tag from the caption (first hashtag or default)
 * @param {string} caption - Instagram post caption
 * @returns {string} Tag for the post
 */
function getPostTag(caption) {
    if (!caption) return 'Novidade';

    // Find first hashtag
    const hashtagMatch = caption.match(/#(\w+)/);
    if (hashtagMatch) {
        return hashtagMatch[1].charAt(0).toUpperCase() + hashtagMatch[1].slice(1);
    }

    // Default tags based on content
    if (caption.toLowerCase().includes('dica') || caption.toLowerCase().includes('tip')) return 'Dica';
    if (caption.toLowerCase().includes('projeto') || caption.toLowerCase().includes('project')) return 'Projeto';
    if (caption.toLowerCase().includes('evento') || caption.toLowerCase().includes('event')) return 'Evento';
    if (caption.toLowerCase().includes('aluno') || caption.toLowerCase().includes('student')) return 'Aluno';

    return 'Novidade';
}

/**
 * Extract a title from the caption (first line or first 50 chars)
 * @param {string} caption - Instagram post caption
 * @returns {string} Title for the post
 */
function extractTitleFromCaption(caption) {
    if (!caption) return 'Post do Instagram';

    // Get first line or first 50 characters
    const firstLine = caption.split('\n')[0];
    if (firstLine.length > 0) {
        return firstLine.length > 50 ? firstLine.substring(0, 47) + '...' : firstLine;
    }

    return caption.length > 50 ? caption.substring(0, 47) + '...' : caption;
}

/**
 * Return fallback Instagram posts when API is not available
 * @returns {Array} Array of fallback Instagram post objects
 */
function getFallbackInstagramPosts() {
    return [
        {
            id: 'fallback-1',
            platform: 'Instagram',
            platformIcon: 'bi-instagram',
            platformColor: '#e1306c',
            author: '@conexaoti_',
            authorAvatar: 'img/logo.png',
            timeAgo: 'Há 2 horas',
            tag: 'Dica',
            title: 'Dica de estudo: organização de arquivos',
            text: 'Mantenha seus arquivos organizados por matéria e tipo de conteúdo para facilitar os estudos.',
            image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=700&h=380&fit=crop',
            likes: 'Ver curtidas',
            comments: 'Ver comentários',
            url: 'https://www.instagram.com/conexaoti_/',
            embedUrl: 'https://www.instagram.com/conexaoti_/',
            ctaText: 'Ver no Instagram'
        },
        {
            id: 'fallback-2',
            platform: 'Instagram',
            platformIcon: 'bi-instagram',
            platformColor: '#e1306c',
            author: '@conexaoti_',
            authorAvatar: 'img/logo.png',
            timeAgo: 'Há 5 horas',
            tag: 'Projeto',
            title: 'Projeto em destaque: Sistema de gestão escolar',
            text: 'Confira este incrível projeto desenvolvido por um dos nossos alunos da comunidade.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=380&fit=crop',
            likes: 'Ver curtidas',
            comments: 'Ver comentários',
            url: 'https://www.instagram.com/conexaoti_/',
            embedUrl: 'https://www.instagram.com/conexaoti_/',
            ctaText: 'Ver no Instagram'
        }
    ];
}

// Inicializa automaticamente se estiver no navegador
if (typeof window !== 'undefined') {
    // Initialize both Drive and Instagram data
    Promise.all([
        initializeDriveFolders(),
        initializeInstagramFeed()
    ]).catch(err => {
        console.error('Falha ao inicializar dados:', err);
        // Ensure we have fallback data for both
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('drive-data-loaded', { detail: { folders: getFallbackFolders() } }));
            document.dispatchEvent(new CustomEvent('instagram-data-loaded', { detail: { posts: getFallbackInstagramPosts() } }));
        }
    });
}

// Expose fetchInstagramOEmbed for use in other scripts (e.g., script.js)
if (typeof window !== 'undefined') {
    window.fetchInstagramOEmbed = fetchInstagramOEmbed;
    // Also attach to CONEXAO_DATA for consistency
    if (window.CONEXAO_DATA) {
        window.CONEXAO_DATA.fetchInstagramOEmbed = fetchInstagramOEmbed;
    }
}


// Exportações para uso como módulo ES (index.html e biblioteca.html).
// O objeto window.CONEXAO_DATA continua sendo mantido para scripts clássicos.
export {
    escapeHtml,
    FOLDERS,
    FEATURED_POSTS,
    SOCIAL_STATS,
    SOCIAL_CHANNELS,
    initializeDriveFolders,
    fetchInstagramOEmbed
};
