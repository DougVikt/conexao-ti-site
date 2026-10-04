const dadosEventos = [
    {
        date: '12 Set · 19h30',
        title: 'Oficina: Redes na prática',
        text: 'Configure uma rede com 2 VLANs no Packet Tracer com a galera. Traga dúvidas de sub-rede.',
        meta: 'com Prof. Douglas · 60 vagas'
    },
    {
        date: '19 Set · 19h30',
        title: 'Review de portfólios',
        text: 'Traga seu GitHub/portfólio. Revisão coletiva com checklist do que recrutadores olham.',
        meta: 'com mentores da comunidade'
    },
    {
        date: '26 Set · 19h30',
        title: 'Python do zero — ao vivo',
        text: 'Live coding: do primeiro script ao jogo da velha. Código fica na biblioteca depois.',
        meta: 'com monitores de Python'
    },
]

function Eventos() {
    return (
        <section id="eventos" className="mx-auto w-full max-w-6xl border-t border-border px-4 py-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                    <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">Agenda</div>
                    <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
                        Próximos encontros
                    </h2>
                </div>
                <span className="inline-flex items-center rounded-full border border-border bg-overlay px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                    <i className="bi bi-broadcast me-1"></i> ao vivo no Discord
                </span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                {dadosEventos.map((evento) => (
                    <div key={evento.title} className="rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
                        <span className="inline-block rounded-full border border-border bg-tint-soft px-2 py-1 font-mono text-xs uppercase tracking-[0.06em] text-blue-tint">
                            {evento.date}
                        </span>
                        <h4 className="mt-3 font-display text-[17px] font-semibold text-fg">{evento.title}</h4>
                        <p className="text-[13px] text-muted">{evento.text}</p>
                        <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
                            <i className="bi bi-person"></i> {evento.meta}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Eventos