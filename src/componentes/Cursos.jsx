const dadosCursos = [
    {
        slug: 'redes',
        icon: 'bi-hdd-network',
        title: 'Redes de Computadores',
        text: 'Modelo OSI, TCP/IP, sub-redes e laboratórios com Packet Tracer.'
    },
    {
        slug: 'banco-dados',
        icon: 'bi-database',
        title: 'Banco de Dados',
        text: 'MER, SQL, normalização e projeto prático de biblioteca.'
    },
    {
        slug: 'python',
        icon: 'bi-braces',
        title: 'Programação em Python',
        text: 'Do básico à POO, com exercícios resolvidos e mini-projetos.'
    },
    {
        slug: 'seguranca',
        icon: 'bi-shield-lock',
        title: 'Segurança da Informação',
        text: 'Criptografia, políticas de senha e checklist de hardening.'
    },
    {
        slug: 'ia',
        icon: 'bi-cpu',
        title: 'Inteligência Artificial',
        text: 'ML introdutório, redes neurais e notebooks práticos.'
    },
    {
        slug: 'infraestrutura',
        icon: 'bi-server',
        title: 'Infraestrutura de TI',
        text: 'Virtualização, cloud e rotinas de backup.'
    },
    {
        slug: 'dev-web',
        icon: 'bi-window',
        title: 'Desenvolvimento Web',
        text: 'HTML, CSS, JS e React para montar seu portfólio.'
    },
    {
        slug: 'suporte',
        icon: 'bi-headset',
        title: 'Suporte Técnico',
        text: 'Hardware, atendimento e planilha de chamados.'
    },
]

function Cursos() {
    return (
        <section id="Cursos" className="mx-auto w-full max-w-6xl border-t border-border px-4 py-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">
                        Só para alunos · Biblioteca propria
                    </div>
                    <h2 className="mb-2 font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
                        Cursos da Comunidade
                    </h2>
                    <p className="mb-0 max-w-[56ch] text-[15px] text-muted">
                        Todos os cursos unidos com um so objetivo
                    </p>
                </div>
                <a href="biblioteca-conexao-ti.html" className="font-display text-sm font-semibold text-muted transition hover:text-fg">
                    Abrir biblioteca privada <i className="bi bi-lock ms-1"></i>
                </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {dadosCursos.map((cursos) => (
                    <div key={cursos.slug} className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4 text-fg no-underline">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-tint text-xl text-blue-tint">
                            <i className={`bi ${cursos.icon}`}></i>
                        </span>
                        <strong className="font-display tracking-[-0.01em]">{cursos.title}</strong>
                        <span className="text-[13px] text-muted">{cursos.text}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Cursos