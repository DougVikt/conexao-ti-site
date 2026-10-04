import InstagramCard from './InstagramCard.jsx'
import LinkedinCard from './LinkedinCard.jsx'

const tags = [
  { icon: 'bi-hash', text: '#ConexaoTI' },
  { icon: 'bi-hash', text: '#ADSnaVeia' },
  { icon: 'bi-megaphone', text: 'repost toda sexta' },
  { icon: 'bi-trophy', text: 'destaque do mês no LinkedIn' },
]

function Redes() {
  return (
    <section id="redes" className="mx-auto w-full max-w-6xl border-t border-border px-4 py-5">
      <div className="mb-4 text-center">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">Siga e apareça</div>
        <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
          A comunidade vive<br />no LinkedIn e no Instagram
        </h2>
        <p className="mx-auto max-w-[60ch] text-[15px] text-muted">
          Conteúdo exclusivo dentro, engajamento fora. Seguindo nossos perfis você não perde avisos, vagas e os reposts dos projetos dos alunos.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <LinkedinCard />
        <InstagramCard />
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <span key={tag.text} className="inline-flex items-center rounded-full border border-border bg-overlay px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
            <i className={`bi ${tag.icon} me-1`}></i>{tag.text}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Redes