// Curadoria de cursos livres e recursos complementares.
// Para adicionar um curso, copie um objeto e preencha os campos.
//
// categoria: "programacao" | "dados" | "infra" | "seguranca" | "gestao" | "ingles" | "design"
// acesso: "gratuito" | "freemium" | "pago"
//
// Links e condições de acesso verificados em 31/10/2026 nas páginas oficiais.
// Plataformas podem mudar planos e catálogos; revise esta lista periodicamente.

const cursosComplementaresDados = [
    // ── Programação ──────────────────────────────────────────────────────
    {
        titulo: "Algoritmos e Lógica de Programação",
        plataforma: "Curso em Vídeo",
        categoria: "programacao",
        descricao: "Primeiros passos em lógica, variáveis, condições e laços, com exercícios práticos e linguagem simples.",
        nivel: "Iniciante",
        duracao: "40h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.cursoemvideo.com/curso/curso-de-algoritmo/",
        tags: ["Lógica", "Base"]
    },
    {
        titulo: "Python 3 — do zero ao avançado",
        plataforma: "Curso em Vídeo",
        categoria: "programacao",
        descricao: "Trilha completa de Python em três módulos, cobrindo sintaxe, estruturas de dados, funções e módulos.",
        nivel: "Iniciante",
        duracao: "120h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.cursoemvideo.com/curso/python-3-mundo-1/",
        tags: ["Python", "Back-end"]
    },
    {
        titulo: "Certificações de programação",
        plataforma: "freeCodeCamp",
        categoria: "programacao",
        descricao: "Trilhas práticas de HTML, CSS, JavaScript, Python e banco de dados, com projetos e certificados gratuitos.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português e inglês",
        url: "https://www.freecodecamp.org/portuguese/learn/",
        tags: ["Web", "Projetos", "Certificado"]
    },
    {
        titulo: "CS50 — Introdução à Ciência da Computação",
        plataforma: "Harvard",
        categoria: "programacao",
        descricao: "Um dos cursos introdutórios mais respeitados do mundo, com aulas de algoritmos, C, Python e SQL.",
        nivel: "Intermediário",
        duracao: "12 semanas",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://cs50.harvard.edu/x/",
        tags: ["Algoritmos", "Ciência da Computação"]
    },
    {
        titulo: "JavaScript moderno, do básico ao avançado",
        plataforma: "JavaScript.info",
        categoria: "programacao",
        descricao: "Tutorial textual completo com exemplos executáveis, ideal para consolidar a linguagem e o ecossistema.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://javascript.info/",
        tags: ["JavaScript", "Front-end"]
    },
    {
        titulo: "Aprender desenvolvimento web",
        plataforma: "MDN Web Docs",
        categoria: "programacao",
        descricao: "Guia oficial da Mozilla para HTML, CSS e JavaScript, com exemplos, referências e boas práticas de acessibilidade.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        titulo: "Prática de código com mentoria",
        plataforma: "Exercism",
        categoria: "programacao",
        descricao: "Exercícios em dezenas de linguagens com revisão de mentores e trilhas guiadas por conceito.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://exercism.org/",
        tags: ["Exercícios", "Mentoria"]
    },
    {
        titulo: "Pro Git — livro completo",
        plataforma: "Git SCM",
        categoria: "programacao",
        descricao: "Livro oficial e gratuito sobre Git, com capítulos em português sobre branches, merges e fluxos de trabalho.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://git-scm.com/book/pt-br/v2",
        tags: ["Git", "Versionamento"]
    },
    {
        titulo: "GitHub Skills",
        plataforma: "GitHub",
        categoria: "programacao",
        descricao: "Cursos interativos direto no GitHub para aprender Git, GitHub Actions, Pages e colaboração em projetos.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://skills.github.com/",
        tags: ["GitHub", "CI/CD"]
    },
    {
        titulo: "Bootcamps e desafios de código",
        plataforma: "DIO",
        categoria: "programacao",
        descricao: "Bootcamps gratuitos com empresas parceiras, desafios de código e projetos para montar portfólio.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://www.dio.me/",
        tags: ["Bootcamp", "Portfólio"]
    },
    {
        titulo: "Formação Full Stack",
        plataforma: "Rocketseat",
        categoria: "programacao",
        descricao: "Trilhas de desenvolvimento web e mobile com foco em projeto real, comunidade e preparação para o mercado.",
        nivel: "Intermediário",
        duracao: "Assinatura",
        acesso: "pago",
        idioma: "Português",
        url: "https://www.rocketseat.com.br/",
        tags: ["Full Stack", "React", "Node.js"]
    },
    {
        titulo: "Escola de tecnologia",
        plataforma: "Alura",
        categoria: "programacao",
        descricao: "Assinatura com centenas de cursos de programação, dados, infraestrutura, design e gestão.",
        nivel: "Todos os níveis",
        duracao: "Assinatura",
        acesso: "pago",
        idioma: "Português",
        url: "https://www.alura.com.br/",
        tags: ["Cursos", "Carreira"]
    },

    {
        titulo: "Cursos livres com certificado",
        plataforma: "Prime Cursos",
        categoria: "programacao",
        descricao: "Cursos gratuitos de informática, programação, administração e outras áreas; o certificado é opcional e pago.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://www.primecursos.com.br/cursos/",
        tags: ["Cursos livres", "Certificado", "Informática"]
    },
    {
        titulo: "Cursos livres MOOC",
        plataforma: "Centro Paula Souza",
        categoria: "programacao",
        descricao: "Cursos gratuitos na modalidade MOOC, com certificado e opções em tecnologia, comunicação e áreas aplicadas.",
        nivel: "Iniciante",
        duracao: "6 a 40h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://cursosmooc.cps.sp.gov.br/",
        tags: ["MOOC", "Tecnologia", "Certificado"]
    },
    {
        titulo: "Programa Senac de Gratuidade",
        plataforma: "Senac EAD",
        categoria: "programacao",
        descricao: "Cursos livres e técnicos gratuitos, incluindo JavaScript, estrutura de dados com Python e LGPD, com certificação.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.ead.senac.br/gratuito/",
        tags: ["Programação", "Python", "Certificado"]
    },
    {
        titulo: "Cursos de universidades",
        plataforma: "edX",
        categoria: "programacao",
        descricao: "Cursos online de universidades como Harvard, MIT e Berkeley; a auditoria é gratuita e o certificado é pago.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Inglês",
        url: "https://www.edx.org/",
        tags: ["Universidades", "Ciência da Computação", "Certificado"]
    },
    {
        titulo: "Cursos gratuitos",
        plataforma: "Udemy",
        categoria: "programacao",
        descricao: "Catálogo de cursos gratuitos de programação, dados, design e gestão, com opção de comprar cursos pagos.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português e inglês",
        url: "https://www.udemy.com/courses/free/",
        tags: ["Cursos livres", "Programação", "Online"]
    },

    // ── Dados & IA ───────────────────────────────────────────────────────
    {
        titulo: "Micro-cursos de dados e machine learning",
        plataforma: "Kaggle Learn",
        categoria: "dados",
        descricao: "Cursos curtos e práticos de Python, pandas, SQL, visualização e introdução a machine learning.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://www.kaggle.com/learn",
        tags: ["Python", "Pandas", "ML"]
    },
    {
        titulo: "Python for Everybody",
        plataforma: "py4e",
        categoria: "dados",
        descricao: "Curso clássico e gratuito de Python com foco em dados, web scraping, SQL e visualização.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://www.py4e.com/",
        tags: ["Python", "Dados"]
    },
    {
        titulo: "Machine Learning Crash Course",
        plataforma: "Google",
        categoria: "dados",
        descricao: "Curso intensivo do Google com vídeos, laboratórios e exercícios sobre modelos de machine learning.",
        nivel: "Intermediário",
        duracao: "15h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://developers.google.com/machine-learning/crash-course?hl=pt-br",
        tags: ["Machine Learning", "TensorFlow"]
    },
    {
        titulo: "Elements of AI",
        plataforma: "University of Helsinki",
        categoria: "dados",
        descricao: "Introdução conceitual à inteligência artificial, sem exigir programação, com foco em impacto e ética.",
        nivel: "Iniciante",
        duracao: "30h",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://www.elementsofai.com/",
        tags: ["IA", "Conceitos"]
    },
    {
        titulo: "Practical Deep Learning for Coders",
        plataforma: "fast.ai",
        categoria: "dados",
        descricao: "Curso prático de deep learning que começa com modelos prontos e avança para treinamento e deploy.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://course.fast.ai/",
        tags: ["Deep Learning", "PyTorch"]
    },
    {
        titulo: "Cursos gratuitos de data science",
        plataforma: "Data Science Academy",
        categoria: "dados",
        descricao: "Seleção de cursos introdutórios gratuitos em português sobre Python, estatística, SQL e business intelligence.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.datascienceacademy.com.br/cursosgratuitos",
        tags: ["Data Science", "BI"]
    },
    {
        titulo: "SQLBolt — SQL interativo",
        plataforma: "SQLBolt",
        categoria: "dados",
        descricao: "Lições curtas e interativas para aprender SQL direto no navegador, do SELECT aos JOINs.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://sqlbolt.com/",
        tags: ["SQL", "Banco de Dados"]
    },
    {
        titulo: "OpenAI Academy",
        plataforma: "OpenAI",
        categoria: "dados",
        descricao: "Materiais e cursos sobre fundamentos de IA, engenharia de prompt e construção de aplicações com modelos.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://academy.openai.com/",
        tags: ["IA generativa", "Prompt"]
    },

    {
        titulo: "Inteligência Artificial: impactos nos negócios e na sociedade",
        plataforma: "Insper",
        categoria: "dados",
        descricao: "Curso online gratuito do Insper com a AWS sobre fundamentos de IA, aplicações nos negócios e impacto social, com certificado.",
        nivel: "Iniciante",
        duracao: "22h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://ee.insper.edu.br/cursos/tecnologia-data-science/inteligencia-artificial-e-seus-impactos-nos-negocios-e-na-sociedade/",
        tags: ["IA", "AWS", "Certificado"]
    },

    // ── Infraestrutura & Cloud ───────────────────────────────────────────
    {
        titulo: "Cursos de redes e infraestrutura",
        plataforma: "Cisco Networking Academy",
        categoria: "infra",
        descricao: "Trilhas de networking, cybersecurity e IoT com laboratórios e certificações reconhecidas pelo mercado.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português e inglês",
        url: "https://www.netacad.com/",
        tags: ["Redes", "Cisco", "Certificação"]
    },
    {
        titulo: "Introduction to Linux",
        plataforma: "Linux Foundation",
        categoria: "infra",
        descricao: "Curso gratuito sobre fundamentos do Linux, linha de comando, arquivos, processos e administração básica.",
        nivel: "Iniciante",
        duracao: "40h",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://training.linuxfoundation.org/training/introduction-to-linux/",
        tags: ["Linux", "Sistemas"]
    },
    {
        titulo: "Docker — Get Started",
        plataforma: "Docker",
        categoria: "infra",
        descricao: "Documentação guiada para criar imagens, rodar containers e publicar aplicações com Docker Compose.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://docs.docker.com/get-started/",
        tags: ["Docker", "Containers"]
    },
    {
        titulo: "Tutoriais de Kubernetes",
        plataforma: "Kubernetes",
        categoria: "infra",
        descricao: "Tutoriais oficiais em português para entender pods, deployments, serviços e escalabilidade.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://kubernetes.io/pt-br/docs/tutorials/",
        tags: ["Kubernetes", "Orquestração"]
    },
    {
        titulo: "Treinamentos digitais AWS",
        plataforma: "AWS Skill Builder",
        categoria: "infra",
        descricao: "Cursos digitais gratuitos e trilhas de certificação para AWS Cloud, arquitetura e serviços gerenciados.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português e inglês",
        url: "https://skillbuilder.aws/",
        tags: ["AWS", "Cloud", "Certificação"]
    },
    {
        titulo: "Trilhas de aprendizado Microsoft",
        plataforma: "Microsoft Learn",
        categoria: "infra",
        descricao: "Módulos gratuitos de Azure, segurança, Dynamics e Power Platform, com laboratórios e certificações.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://learn.microsoft.com/pt-br/training/",
        tags: ["Azure", "Microsoft", "Cloud"]
    },
    {
        titulo: "Google Cloud Skills Boost",
        plataforma: "Google Cloud",
        categoria: "infra",
        descricao: "Trilhas e laboratórios práticos de Google Cloud, com conteúdos gratuitos e desafios de certificação.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português e inglês",
        url: "https://www.skills.google/",
        tags: ["Google Cloud", "Labs"]
    },
    {
        titulo: "Roadmap de DevOps",
        plataforma: "roadmap.sh",
        categoria: "infra",
        descricao: "Mapa visual e gratuito com as habilidades, ferramentas e conceitos necessários para atuar com DevOps.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://roadmap.sh/devops",
        tags: ["DevOps", "Trilha"]
    },

    {
        titulo: "Cursos EaD gratuitos",
        plataforma: "SENAI Findes",
        categoria: "infra",
        descricao: "Cursos a distância gratuitos e pagos do SESI/SENAI Espírito Santo em tecnologia, indústria, gestão e segurança do trabalho.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://eadsenaies.com.br/",
        tags: ["Indústria", "Tecnologia", "EAD"]
    },

    // ── Segurança ────────────────────────────────────────────────────────
    {
        titulo: "Laboratórios de cibersegurança",
        plataforma: "TryHackMe",
        categoria: "seguranca",
        descricao: "Salas guiadas e laboratórios práticos de Linux, redes, web e pentest, com trilhas para iniciantes.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Inglês",
        url: "https://tryhackme.com/",
        tags: ["Pentest", "Linux", "Labs"]
    },
    {
        titulo: "Hack The Box Academy",
        plataforma: "Hack The Box",
        categoria: "seguranca",
        descricao: "Máquinas e laboratórios desafiadores para praticar exploração, escalação de privilégios e segurança ofensiva.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Inglês",
        url: "https://www.hackthebox.com/",
        tags: ["Pentest", "Ofensiva"]
    },
    {
        titulo: "OWASP Top 10",
        plataforma: "OWASP",
        categoria: "seguranca",
        descricao: "Referência mundial das dez principais riscos de segurança em aplicações web, com exemplos e mitigações.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://owasp.org/projects/top-ten",
        tags: ["AppSec", "Web"]
    },
    {
        titulo: "Certificado profissional em cibersegurança",
        plataforma: "Google / Coursera",
        categoria: "seguranca",
        descricao: "Programa com fundamentos de segurança, redes, Linux, SIEM e resposta a incidentes, voltado ao primeiro emprego.",
        nivel: "Iniciante",
        duracao: "6 meses",
        acesso: "pago",
        idioma: "Inglês",
        url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        tags: ["SOC", "Carreira", "Certificado"]
    },

    {
        titulo: "Introdução ao Hacking e Pentest 3.0",
        plataforma: "Solyd",
        categoria: "seguranca",
        descricao: "Curso gratuito de 16 horas com laboratórios práticos de reconhecimento, exploração web, Kali Linux e certificado.",
        nivel: "Iniciante",
        duracao: "16h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://solyd.com.br/p/introducao-ao-hacking-e-pentest-3/",
        tags: ["Pentest", "Kali Linux", "Certificado"]
    },

    // ── Gestão & Carreira ────────────────────────────────────────────────
    {
        titulo: "Scrum Guide oficial",
        plataforma: "Scrum.org",
        categoria: "gestao",
        descricao: "Guia oficial e gratuito do Scrum, com papéis, eventos e artefatos explicados de forma direta.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português e inglês",
        url: "https://scrumguides.org/",
        tags: ["Scrum", "Ágil"]
    },
    {
        titulo: "Cursos gratuitos com certificado",
        plataforma: "Fundação Bradesco",
        categoria: "gestao",
        descricao: "Cursos livres em português de Excel, gestão de projetos, informática e empreendedorismo, com certificado.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.ev.org.br/",
        tags: ["Excel", "Projetos", "Certificado"]
    },
    {
        titulo: "Certificado profissional em gestão de projetos",
        plataforma: "Google / Coursera",
        categoria: "gestao",
        descricao: "Programa com metodologias ágeis e tradicionais, planejamento, riscos e comunicação com stakeholders.",
        nivel: "Iniciante",
        duracao: "6 meses",
        acesso: "pago",
        idioma: "Inglês",
        url: "https://www.coursera.org/professional-certificates/google-project-management",
        tags: ["Projetos", "Carreira", "Certificado"]
    },
    {
        titulo: "Cursos online de gestão",
        plataforma: "Sebrae",
        categoria: "gestao",
        descricao: "Cursos gratuitos de empreendedorismo, finanças, liderança e gestão para quem quer abrir ou organizar um negócio.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://loja.sebrae.com.br/cursos/cursos-online",
        tags: ["Gestão", "Empreendedorismo"]
    },
    {
        titulo: "Escola Virtual de Governo",
        plataforma: "Governo Federal",
        categoria: "gestao",
        descricao: "Catálogo público de cursos livres com certificado, incluindo gestão, dados, tecnologia e administração.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.escolavirtual.gov.br/",
        tags: ["Certificado", "Cursos livres"]
    },

    {
        titulo: "Cursos gratuitos online",
        plataforma: "FGV",
        categoria: "gestao",
        descricao: "Mais de 200 cursos gratuitos da FGV em administração, direito, economia, estratégia, tecnologia e outras áreas, com certificado.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://cursosgratuitos.fgv.br/",
        tags: ["Gestão", "Certificado", "Online"]
    },
    {
        titulo: "Cursos e pós-graduações",
        plataforma: "Conquer",
        categoria: "gestao",
        descricao: "Cursos curtos, imersões e pós-graduações em gestão, liderança, marketing e tecnologia, com conteúdos gratuitos no blog.",
        nivel: "Todos os níveis",
        duracao: "Cursos curtos",
        acesso: "pago",
        idioma: "Português",
        url: "https://escolaconquer.com.br/",
        tags: ["Gestão", "Liderança", "Carreira"]
    },
    {
        titulo: "Cursos gratuitos de gestão",
        plataforma: "FM2S",
        categoria: "gestao",
        descricao: "Cursos gratuitos de Lean Six Sigma, qualidade, gestão de projetos e melhoria contínua, com certificação.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.fm2s.com.br/cursos/gratuitos",
        tags: ["Lean Six Sigma", "Qualidade", "Certificado"]
    },
    {
        titulo: "Cursos e imersões de negócios",
        plataforma: "StartSe",
        categoria: "gestao",
        descricao: "Imersões, cursos e programas de educação executiva em negócios, liderança, inovação e IA aplicada.",
        nivel: "Intermediário",
        duracao: "Imersões e cursos",
        acesso: "pago",
        idioma: "Português",
        url: "https://www.startse.com/vitrine/",
        tags: ["Negócios", "Liderança", "IA"]
    },
    {
        titulo: "Cursos abertos da UFRGS",
        plataforma: "Lúmina",
        categoria: "gestao",
        descricao: "Mais de 100 MOOCs gratuitos da UFRGS em diversas áreas, com cronograma flexível e certificado da universidade.",
        nivel: "Todos os níveis",
        duracao: "20 a 40h",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://lumina.ufrgs.br/",
        tags: ["UFRGS", "MOOC", "Certificado"]
    },
    {
        titulo: "Cursos de gestão e melhoria contínua",
        plataforma: "Voitto",
        categoria: "gestao",
        descricao: "Cursos de Lean Six Sigma, gestão de projetos e melhoria contínua, com opções gratuitas e certificação.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://www.voitto.com.br/",
        tags: ["Lean Six Sigma", "Projetos", "Certificado"]
    },
    {
        titulo: "Cursos EAD gratuitos de logística",
        plataforma: "SEST SENAT",
        categoria: "gestao",
        descricao: "Cursos a distância gratuitos com certificado em logística, transporte, gestão e desenvolvimento profissional.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://ead.sestsenat.org.br/",
        tags: ["Logística", "Transporte", "Certificado"]
    },
    {
        titulo: "Cursos gratuitos com professores da USP",
        plataforma: "Veduca",
        categoria: "gestao",
        descricao: "Cursos online gratuitos de professores da USP e de outras instituições, com opção de certificado pago.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://veduca.org/",
        tags: ["USP", "Gestão", "Certificado"]
    },
    {
        titulo: "Cursos gratuitos de carreira",
        plataforma: "Nube",
        categoria: "gestao",
        descricao: "Cursos rápidos e gratuitos de administração do tempo, gestão de carreira, currículo e preparação para o mercado.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Português",
        url: "https://www.nube.com.br/cursos-gratuitos",
        tags: ["Carreira", "Currículo", "Mercado"]
    },

    // ── Inglês ───────────────────────────────────────────────────────────
    {
        titulo: "Inglês diário e gamificado",
        plataforma: "Duolingo",
        categoria: "ingles",
        descricao: "Lições curtas para praticar vocabulário, leitura e escuta todos os dias, com trilha adaptativa.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "freemium",
        idioma: "Português",
        url: "https://www.duolingo.com/",
        tags: ["Vocabulário", "Rotina"]
    },
    {
        titulo: "BBC Learning English",
        plataforma: "BBC",
        categoria: "ingles",
        descricao: "Aulas, vídeos e áudios gratuitos com inglês do dia a dia, notícias e pronúncia para todos os níveis.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://www.bbc.co.uk/learningenglish/",
        tags: ["Listening", "Speaking"]
    },
    {
        titulo: "Recursos gratuitos de inglês",
        plataforma: "Cambridge English",
        categoria: "ingles",
        descricao: "Atividades, testes de nível e materiais oficiais para praticar leitura, escrita, escuta e pronúncia.",
        nivel: "Todos os níveis",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://www.cambridgeenglish.org/learners/",
        tags: ["Cambridge", "Exercícios"]
    },

    // ── Design & UX ──────────────────────────────────────────────────────
    {
        titulo: "Figma Learn",
        plataforma: "Figma",
        categoria: "design",
        descricao: "Tutoriais oficiais de Figma, prototipagem, design systems e colaboração para começar em UI/UX.",
        nivel: "Iniciante",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Figma-learn",
        tags: ["Figma", "UI"]
    },
    {
        titulo: "Laws of UX",
        plataforma: "Laws of UX",
        categoria: "design",
        descricao: "Coleção gratuita de princípios de psicologia aplicados ao design de interfaces e experiências.",
        nivel: "Intermediário",
        duracao: "Autoestudo",
        acesso: "gratuito",
        idioma: "Inglês",
        url: "https://lawsofux.com/",
        tags: ["UX", "Princípios"]
    },
    {
        titulo: "Certificado profissional em UX Design",
        plataforma: "Google / Coursera",
        categoria: "design",
        descricao: "Programa com pesquisa com usuários, wireframes, protótipos e estudos de caso para montar portfólio.",
        nivel: "Iniciante",
        duracao: "6 meses",
        acesso: "pago",
        idioma: "Inglês",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        tags: ["UX", "Pesquisa", "Certificado"]
    }
];

const cursosComplementaresCategorias = [
    { slug: "all", label: "Todos", icon: "bi-grid" },
    { slug: "programacao", label: "Programação", icon: "bi-code-slash" },
    { slug: "dados", label: "Dados & IA", icon: "bi-graph-up-arrow" },
    { slug: "infra", label: "Infra & Cloud", icon: "bi-hdd-network" },
    { slug: "seguranca", label: "Segurança", icon: "bi-shield-check" },
    { slug: "gestao", label: "Gestão & Carreira", icon: "bi-briefcase" },
    { slug: "ingles", label: "Inglês", icon: "bi-translate" },
    { slug: "design", label: "Design & UX", icon: "bi-palette" }
];

const cursosComplementaresAcessoLabels = {
    gratuito: "Gratuito",
    freemium: "Freemium",
    pago: "Pago"
};
