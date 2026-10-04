function InstagramCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-instagram text-lg text-white">
            <i className="bi bi-instagram"></i>
          </span>
          <strong className="font-display font-bold">@conexao.ti</strong>
        </span>
        <span className="rounded-full border border-border bg-overlay px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">3.1k seguidores</span>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop" alt="Reel bastidores" className="h-full w-full object-cover" />
          <span className="absolute left-[6px] top-[6px] rounded-full bg-black/60 px-[6px] py-[3px] font-mono text-[10px] text-white"><i className="bi bi-play-fill"></i> REEL</span>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop" alt="Carrossel projeto" className="h-full w-full object-cover" />
          <span className="absolute left-[6px] top-[6px] rounded-full bg-accent px-[6px] py-[3px] text-[10px] font-bold text-accent-ink">CARROSSEL</span>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd690979bc?w=300&h=300&fit=crop" alt="Stories enquete" className="h-full w-full object-cover" />
          <span className="absolute left-[6px] top-[6px] rounded-full bg-black/60 px-[6px] py-[3px] text-[10px] text-white"><i className="bi bi-question-circle me-1"></i>ENQUETE</span>
        </div>
        <div className="col-span-3 rounded-2xl border border-border bg-overlay p-3">
          <p className="m-0 text-[13px]"><strong className="text-fg">Bastidores de hoje:</strong> <span className="text-muted">monitoria de Python lotada no lab 3. Quem faltou, o resumo está na biblioteca → Python. Marca a gente nos stories! </span><span className="text-blue-tint">#ConexaoTI</span></p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="grow rounded-md border border-transparent bg-instagram px-3 py-1.5 text-center font-display text-sm font-semibold text-white transition hover:brightness-110">
          <i className="bi bi-instagram me-1"></i> Seguir no Instagram
        </a>
        <a href="#" className="rounded-md border border-border px-3 py-1.5 font-display text-sm font-semibold text-fg transition hover:border-border-strong hover:bg-overlay">
          Ver grade
        </a>
      </div>
      <p className="mb-0 mt-2 font-mono text-[11px] text-muted">Use #ConexaoTI e marque @conexao.ti para aparecer no nosso feed.</p>
    </div>
  )
}

export default InstagramCard