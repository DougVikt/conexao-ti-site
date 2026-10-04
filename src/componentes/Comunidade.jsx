const stats = [
{ 
    icon: 'bi-linkedin', 
    iconClass: 'text-linkedin', 
    label: 'LinkedIn', 
    value: '2.4k', 
    text: 'seguidores no perfil oficial. Repost de projetos toda sexta.' 
},
{ 
    icon: 'bi-instagram', 
    iconClass: 'text-instagram', 
    label: 'Instagram', 
    value: '3.1k', 
    text: 'seguidores. Bastidores, reels e enquetes semanais.' 
},
{ 
    icon: 'bi-folder2-open', 
    iconClass: 'text-blue-tint', 
    label: 'Biblioteca privada', 
    value: '200+', 
    text: 'arquivos restritos a alunos, por matéria no Drive.' 
},
]

function Comunidade() {
  return (
    <section id="comunidade" className="mx-auto w-full max-w-6xl border-t border-border px-4 py-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
            <div className="mb-2 flex items-center gap-2">
              <i className={`bi ${stat.icon} ${stat.iconClass}`}></i>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">{stat.label}</span>
            </div>
            <div className="mb-1 font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-fg">{stat.value}</div>
            <p className="mb-0 text-[13px] text-muted">{stat.text}</p>
          </div>
        ))}
        <div className="flex flex-col rounded-2xl border border-[oklch(78%_0.14_244)] bg-accent p-4">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink opacity-70">Acesso privado</div>
          <p className="font-display text-[18px] font-bold leading-[1.2] text-accent-ink">
            Exclusivo para alunos. Solicite com seu e-mail institucional.
          </p>
          <a href="#entrar" className="mt-2 w-full rounded-md bg-accent-ink px-3 py-1.5 text-center text-sm font-semibold text-fg">
            Solicitar acesso <i className="bi bi-lock ms-1"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Comunidade