const dadosDepoimentos = [
    {
        img: 'https://i.pravatar.cc/100?img=5',
        alt: 'Ana',
        quote: 'Entrei sem base nenhuma em redes. Com a biblioteca e as lives, fechei a matéria da faculdade e ainda montei meu primeiro lab.',
        name: 'Ana, 19',
        detail: 'Redes · 2º semestre'
    },
    {
        img: 'https://i.pravatar.cc/100?img=15',
        alt: 'Rafael',
        quote: 'O review de portfólio me fez reescrever meu GitHub inteiro. Uma semana depois consegui meu primeiro freela de site.',
        name: 'Rafael, 24',
        detail: 'Dev Web · em transição'
    },
    {
        img: 'https://i.pravatar.cc/100?img=9',
        alt: 'Letícia',
        quote: 'Gosto da organização por pastas no Drive. Cada matéria tem o que preciso, sem link quebrado nem PDF perdido no WhatsApp.',
        name: 'Letícia, 21',
        detail: 'Banco de Dados'
    },
]

function Depoimentos() {
    return (
        <section className="mx-auto w-full max-w-6xl border-t border-border px-4 py-5">
            <div className="mb-2 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">O que dizem</div>
            <h2 className="mb-4 text-center font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
                Quem estuda junto, vai mais longe
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
                {dadosDepoimentos.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
                        <div className="font-display text-[42px] leading-none text-blue-tint opacity-50">“</div>
                        <p className="text-sm leading-[1.6]">{item.quote}</p>
                        <div className="mt-3 flex items-center gap-2">
                            <img src={item.img} alt={item.alt} className="h-9 w-9 rounded-full object-cover" />
                            <div className="text-[13px]">
                                <strong>{item.name}</strong><br />
                                <span className="text-muted">{item.detail}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Depoimentos