// Guia de cursos da Conexão TI.
// Para editar um curso, altere o objeto correspondente. Para adicionar outro,
// copie um bloco inteiro e preencha todos os campos.
//
// area: "dev" | "dados" | "infra" | "seguranca" | "gestao"
// tipo: "Tecnólogo" | "Bacharelado"
// duracao é uma referência e pode variar conforme a instituição.

const cursosDados = [
    {
        slug: "ads",
        nome: "Análise e Desenvolvimento de Sistemas",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "dev",
        icon: "bi-code-square",
        resumo: "Formação prática e rápida para quem quer construir sistemas e entrar no mercado.",
        objetivo: "Formar profissionais para analisar, projetar, desenvolver e manter sistemas de informação, com forte base prática em programação e banco de dados. É o caminho mais direto para quem quer começar a trabalhar em desenvolvimento.",
        grade: [
            "Lógica de programação e algoritmos",
            "Programação web e mobile",
            "Banco de dados e SQL",
            "Engenharia de software e APIs",
            "Infraestrutura, cloud e segurança"
        ],
        exemplo: "Desenvolver um sistema de controle de estoque com cadastro de produtos, login, relatórios e publicação na web.",
        onde: "Desenvolvimento web e back-end, análise de sistemas, suporte a aplicações, testes de software e administração de bancos de dados.",
        pontoForte: "Curso mais curto e direcionado ao mercado, com aprendizado prático desde os primeiros semestres."
    },
    {
        slug: "engenharia-de-software",
        nome: "Engenharia de Software",
        tipo: "Bacharelado",
        duracao: "4 anos",
        semestres: 8,
        area: "dev",
        icon: "bi-braces",
        resumo: "Formação completa para projetar, construir e manter sistemas com qualidade.",
        objetivo: "O principal objetivo desse curso é ensinar a desenvolver sistemas e programas de computador de maneira profissional. O estudante aprende desde a lógica de programação até o planejamento, construção, testes e manutenção de aplicações.",
        grade: [
            "Algoritmos e programação de computadores",
            "Desenvolvimento Front-End e Back-End",
            "Modelagem e desenvolvimento de bancos de dados",
            "Projeto e qualidade de software",
            "Desenvolvimento de aplicativos móveis",
            "Ciência de Dados e aplicações em IA",
            "Arquitetura em nuvem e segurança digital"
        ],
        exemplo: "Desenvolver um sistema de vendas e estoque, com cadastro de clientes, banco de dados, relatórios e controle de acesso.",
        onde: "Desenvolvimento de software, programação back-end, desenvolvimento web, testes de software, automação e, com especialização, segurança de aplicações.",
        pontoForte: "Formação direcionada à construção de sistemas e aplicações utilizadas pelas empresas."
    },
    {
        slug: "ciencia-da-computacao",
        nome: "Ciência da Computação",
        tipo: "Bacharelado",
        duracao: "4 anos",
        semestres: 8,
        area: "dev",
        icon: "bi-cpu",
        resumo: "Fundamentos da computação, algoritmos e IA para resolver problemas complexos.",
        objetivo: "O principal objetivo é compreender profundamente os fundamentos da computação, os algoritmos e as tecnologias utilizadas para resolver problemas. Além de aprender programação, o estudante investiga como os computadores processam informações e como desenvolver soluções eficientes e inteligentes.",
        grade: [
            "Algoritmos e programação",
            "Desenvolvimento de sistemas e bancos de dados",
            "Ciência de Dados",
            "Modelagem e treinamento de Inteligência Artificial",
            "Visão Computacional",
            "Modelagem Matemática Computacional",
            "Análise e otimização de algoritmos",
            "Sistemas embarcados e segurança digital"
        ],
        exemplo: "Desenvolver um programa capaz de analisar milhares de registros, identificar padrões e otimizar o processamento de informações.",
        onde: "Desenvolvimento de software, análise de dados, inteligência artificial, programação, automação e, com formação complementar, cibersegurança.",
        pontoForte: "Formação mais ampla nos fundamentos da computação, com disciplinas específicas de algoritmos, matemática computacional e IA."
    },
    {
        slug: "sistemas-de-informacao",
        nome: "Sistemas de Informação",
        tipo: "Bacharelado",
        duracao: "4 anos",
        semestres: 8,
        area: "dev",
        icon: "bi-diagram-3",
        resumo: "Tecnologia aplicada aos processos, dados e decisões das organizações.",
        objetivo: "Formar profissionais capazes de conectar tecnologia e negócio, entendendo os processos das organizações e projetando sistemas que apoiem a gestão. O curso equilibra programação, banco de dados, infraestrutura e administração.",
        grade: [
            "Programação e estruturas de dados",
            "Banco de dados e modelagem",
            "Engenharia e análise de sistemas",
            "Gestão de projetos e processos",
            "Business Intelligence e análise de dados",
            "Governança de TI e segurança",
            "Redes e infraestrutura"
        ],
        exemplo: "Implantar um sistema de gestão escolar integrando matrículas, notas, financeiro e relatórios gerenciais.",
        onde: "Análise e desenvolvimento de sistemas, consultoria de TI, gestão de projetos, BI, administração de dados e coordenação de equipes.",
        pontoForte: "Visão híbrida entre tecnologia e negócio, útil para quem quer atuar em consultoria, gestão ou análise."
    },
    {
        slug: "ciencia-de-dados",
        nome: "Ciência de Dados",
        tipo: "Tecnólogo",
        duracao: "3 anos",
        semestres: 6,
        area: "dados",
        icon: "bi-graph-up-arrow",
        resumo: "Dados, estatística e programação para transformar informação em decisão.",
        objetivo: "Formar profissionais para coletar, tratar, analisar e interpretar grandes volumes de dados. O foco é transformar dados em informação útil para decisões de negócio, pesquisa e desenvolvimento de produtos.",
        grade: [
            "Python para dados",
            "SQL e modelagem de dados",
            "Estatística e probabilidade",
            "Machine learning",
            "Visualização e storytelling",
            "ETL, big data e cloud",
            "Ética e governança de dados"
        ],
        exemplo: "Analisar dados de vendas, identificar padrões de consumo e construir um dashboard que oriente as decisões da empresa.",
        onde: "Análise e ciência de dados, BI, engenharia de dados, pesquisa de mercado e times de produto.",
        pontoForte: "Base quantitativa forte e foco em resolver problemas reais com dados."
    },
    {
        slug: "ia-e-tecnologia",
        nome: "IA e Tecnologia",
        tipo: "Tecnólogo",
        duracao: "3 anos",
        semestres: 6,
        area: "dados",
        icon: "bi-robot",
        resumo: "Formação aplicada para criar soluções com inteligência artificial.",
        objetivo: "Formar profissionais para aplicar inteligência artificial em produtos e processos, unindo programação, dados e modelos de aprendizado de máquina. O curso prioriza a construção de soluções práticas e o uso responsável da tecnologia.",
        grade: [
            "Python e fundamentos de programação",
            "Estatística e análise de dados",
            "Machine learning e deep learning",
            "Processamento de linguagem natural",
            "Visão computacional",
            "MLOps e deploy de modelos",
            "Ética, LGPD e uso responsável de IA"
        ],
        exemplo: "Criar um assistente que lê documentos da empresa e responde perguntas com base no conteúdo, usando busca e modelos de linguagem.",
        onde: "Ciência e engenharia de dados, desenvolvimento de produtos com IA, automação, análise de dados e pesquisa aplicada.",
        pontoForte: "Foco aplicado em IA e tecnologias emergentes, com espaço para projetos práticos ao longo do curso."
    },
    {
        slug: "redes-de-computadores",
        nome: "Redes de Computadores",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "infra",
        icon: "bi-router",
        resumo: "Infraestrutura, conectividade e segurança para manter tudo online.",
        objetivo: "Formar profissionais para planejar, implantar, administrar e monitorar redes de computadores. O estudante aprende desde a configuração de equipamentos até a segurança e a conectividade em ambientes corporativos.",
        grade: [
            "Fundamentos de redes e TCP/IP",
            "Roteamento e switching",
            "Redes sem fio e mobilidade",
            "Servidores e sistemas operacionais",
            "Segurança de redes e firewalls",
            "Monitoramento e alta disponibilidade",
            "Cloud e redes híbridas"
        ],
        exemplo: "Montar a rede de um escritório com VLANs, Wi-Fi, regras de firewall e monitoramento dos equipamentos.",
        onde: "Administração de redes, infraestrutura, NOC, telecomunicações, cloud networking e suporte especializado.",
        pontoForte: "Base sólida em infraestrutura, com forte demanda e caminho natural para certificações de mercado."
    },
    {
        slug: "computacao-em-nuvem",
        nome: "Computação em Nuvem",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "infra",
        icon: "bi-cloud",
        resumo: "Projetar e operar ambientes em nuvem com escala, custo e segurança.",
        objetivo: "Formar profissionais para projetar, implantar e administrar aplicações e serviços em nuvem. O foco é disponibilidade, automação, segurança e controle de custos em plataformas como AWS, Azure e Google Cloud.",
        grade: [
            "Fundamentos de cloud e virtualização",
            "Redes e segurança em nuvem",
            "Containers e Kubernetes",
            "DevOps e infraestrutura como código",
            "Banco de dados gerenciado",
            "Observabilidade e monitoramento",
            "Arquitetura e custos (FinOps)"
        ],
        exemplo: "Migrar uma aplicação para a nuvem usando containers, banco de dados gerenciado, balanceamento de carga e monitoramento.",
        onde: "Cloud engineer, DevOps, SRE, administração de infraestrutura, arquitetura de soluções e suporte em nuvem.",
        pontoForte: "Demanda crescente e foco nas práticas que as empresas usam para operar em escala."
    },
    {
        slug: "engenharia-da-computacao",
        nome: "Engenharia da Computação",
        tipo: "Bacharelado",
        duracao: "5 anos",
        semestres: 10,
        area: "infra",
        icon: "bi-motherboard",
        resumo: "Programação, eletrônica e hardware para criar soluções completas.",
        objetivo: "O principal objetivo é integrar computadores, programação, eletrônica e equipamentos tecnológicos. Diferentemente dos outros cursos, Engenharia da Computação também prepara o estudante para desenvolver soluções que envolvem componentes físicos, sensores e dispositivos eletrônicos.",
        grade: [
            "Programação de computadores",
            "Sistemas embarcados",
            "Internet das Coisas (IoT)",
            "Programação distribuída",
            "Redes inteligentes e conectividade",
            "Projeto e prototipagem em eletroeletrônica",
            "Modelagem e treinamento de IA",
            "Visão Computacional e fundamentos de engenharia"
        ],
        exemplo: "Desenvolver um dispositivo com sensores que monitore equipamentos industriais e envie informações automaticamente para um sistema.",
        onde: "Automação industrial, sistemas embarcados, desenvolvimento de dispositivos, Internet das Coisas, programação e, com especialização, segurança de sistemas industriais.",
        pontoForte: "Combinação entre programação, eletrônica, infraestrutura e automação de equipamentos."
    },
    {
        slug: "ciberseguranca",
        nome: "Cibersegurança",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "seguranca",
        icon: "bi-shield-lock",
        resumo: "Proteger sistemas, redes e dados contra ameaças reais.",
        objetivo: "Formar profissionais para identificar vulnerabilidades, prevenir ataques e responder a incidentes de segurança. O curso combina fundamentos de redes, sistemas operacionais e práticas ofensivas e defensivas.",
        grade: [
            "Fundamentos de redes e Linux",
            "Segurança ofensiva e pentest",
            "Segurança defensiva e SOC",
            "Criptografia e identidade",
            "Gestão de riscos e normas (ISO 27001, NIST)",
            "Forense digital e resposta a incidentes",
            "Segurança em nuvem"
        ],
        exemplo: "Realizar um teste de invasão controlado em um laboratório, documentar as falhas encontradas e propor as correções.",
        onde: "SOC, pentest, análise de vulnerabilidades, segurança de redes, resposta a incidentes e consultoria em segurança.",
        pontoForte: "Formação prática em uma área com alta demanda e escassez de profissionais."
    },
    {
        slug: "seguranca-da-informacao",
        nome: "Segurança da Informação",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "seguranca",
        icon: "bi-file-earmark-lock",
        resumo: "Políticas, controles e governança para proteger a informação.",
        objetivo: "Formar profissionais para proteger a informação em todo o seu ciclo de vida, combinando tecnologia, processos e conformidade. O curso prepara para definir políticas, avaliar riscos e garantir a continuidade do negócio.",
        grade: [
            "Gestão de segurança da informação",
            "Criptografia e proteção de dados",
            "Redes e segurança de sistemas",
            "Normas, auditoria e LGPD",
            "Gestão de riscos e continuidade",
            "Segurança em nuvem",
            "Resposta a incidentes"
        ],
        exemplo: "Criar uma política de segurança e um plano de resposta a incidentes para uma empresa, incluindo classificação de dados e treinamento da equipe.",
        onde: "Segurança da informação, compliance, auditoria, gestão de riscos, apoio à privacidade e governança de TI.",
        pontoForte: "Visão completa entre tecnologia, normas e proteção de dados, muito valorizada em empresas reguladas."
    },
    {
        slug: "gestao-de-ti",
        nome: "Gestão de TI",
        tipo: "Tecnólogo",
        duracao: "2,5 anos",
        semestres: 5,
        area: "gestao",
        icon: "bi-kanban",
        resumo: "Administrar pessoas, projetos e recursos de tecnologia.",
        objetivo: "Formar profissionais para planejar e administrar a tecnologia dentro das organizações, alinhando recursos, processos e pessoas aos objetivos do negócio. O curso mistura base técnica com gestão.",
        grade: [
            "Fundamentos de TI e infraestrutura",
            "Gestão de projetos e metodologias ágeis",
            "Governança de TI e ITIL",
            "Banco de dados e sistemas",
            "Segurança e LGPD",
            "Orçamento e contratos de TI",
            "Liderança e comunicação"
        ],
        exemplo: "Montar um plano de TI para uma pequena empresa, com orçamento, cronograma, indicadores e políticas de acesso.",
        onde: "Gestão de projetos, analista de TI, governança, coordenação de suporte, consultoria e liderança de equipes técnicas.",
        pontoForte: "Visão de negócio e liderança sem abrir mão da base técnica."
    }
];

const cursosAreas = [
    { slug: "all", label: "Todos os cursos", icon: "bi-grid" },
    { slug: "dev", label: "Desenvolvimento", icon: "bi-code-slash" },
    { slug: "dados", label: "Dados & IA", icon: "bi-graph-up-arrow" },
    { slug: "infra", label: "Infra & Cloud", icon: "bi-hdd-network" },
    { slug: "seguranca", label: "Segurança", icon: "bi-shield-check" },
    { slug: "gestao", label: "Gestão", icon: "bi-briefcase" }
];

const cursosAreaLabels = {
    dev: "Desenvolvimento",
    dados: "Dados & IA",
    infra: "Infraestrutura & Cloud",
    seguranca: "Segurança",
    gestao: "Gestão de TI"
};
