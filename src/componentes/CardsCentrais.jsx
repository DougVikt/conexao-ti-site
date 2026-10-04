const dadosCards = [
  {
    icon: 'bi-mortarboard',
    title: 'Calouros de ADS e Sistemas',
    text: 'Trilhas de nivelamento, glossário e biblioteca por matéria para acompanhar desde o 1º semestre sem se perder.',
    pillIcon: 'bi-lock',
    pillText: 'acesso com RA + e-mail institucional',
  },
  {
    icon: 'bi-linkedin',
    title: 'Quem quer ser visto no LinkedIn',
    text: 'Desafios práticos viram posts, certificados compartilháveis e repost no perfil oficial do curso. Networking que conta.',
    pillIcon: 'bi-arrow-up-right',
    pillText: 'destaque no LinkedIn do curso',
  },
  {
    icon: 'bi-instagram',
    title: 'Quem cria e compartilha no Instagram',
    text: <>Bastidores, reels de projetos, enquetes e lives. Marque <strong className="text-fg">@conexao.ti</strong> para aparecer no feed.</>,
    pillIcon: 'bi-hash',
    pillText: '#ConexaoTI na grade',
  },
]

function CardsCentrais() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4">
      <div className="mb-1 text-center">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">
          Só para quem é da casa
        </div>
        <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
          Privada, focada e<br />feita para engajar
        </h2>
        <p className="mx-auto max-w-[56ch] text-[15px] text-muted">
          Acesso restrito a matriculados. Dentro você estuda; fora, você aparece — com reposts no LinkedIn e Instagram da faculdade.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {dadosCards.map((item) => (
          <div key={item.title} className="h-full rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-border bg-tint text-xl text-blue-tint">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em] text-fg">{item.title}</h3>
            <p className="mb-3 text-[15px] text-muted">{item.text}</p>
            <span className="inline-flex items-center rounded-full border border-border bg-overlay px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
              <i className={`bi ${item.pillIcon} me-1`}></i>{item.pillText}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CardsCentrais