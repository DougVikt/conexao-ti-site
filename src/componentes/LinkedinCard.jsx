function LinkedinCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-linkedin text-lg text-white">
            <i className="bi bi-linkedin"></i>
          </span>
          <strong className="font-display font-bold">LinkedIn — Conexão TI</strong>
        </span>
        <span className="rounded-full border border-border bg-overlay px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">2.4k seguidores</span>
      </div>

      <div className="mb-3 rounded-2xl border border-border bg-overlay p-3">
        <div className="mb-2 flex items-center gap-2">
          <img src="https://i.pravatar.cc/100?img=12" alt="" className="h-9 w-9 rounded-full object-cover" />
          <div className="text-[13px] leading-[1.2]">
            <strong>Conexão TI · Faculdade</strong><br />
            <span className="text-xs text-muted">1.280 impressões · há 2 dias</span>
          </div>
          <span className="ms-auto text-lg text-blue-tint"><i className="bi bi-linkedin"></i></span>
        </div>
        <p className="mb-2 text-[13px] leading-[1.5]">
          Nossos alunos de <strong>Banco de Dados</strong> entregaram o projeto final da biblioteca — modelo ER + SQL validado. Orgulho da turma 2025.2 👏 <span className="text-blue-tint">#ConexaoTI #ADS</span>
        </p>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=280&fit=crop" alt="Alunos em laboratório" className="h-[160px] w-full rounded-[10px] border border-border object-cover" />
        <div className="mt-2 flex gap-3 text-xs text-muted">
          <span><i className="bi bi-hand-thumbs-up me-1"></i> 183</span>
          <span><i className="bi bi-chat me-1"></i> 22 comentários</span>
          <span><i className="bi bi-repeat me-1"></i> 14 reposts</span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="grow rounded-md border border-[oklch(78%_0.14_244)] bg-accent px-3 py-1.5 text-center font-display text-sm font-semibold text-accent-ink shadow-card transition hover:-translate-y-0.5 hover:brightness-[1.06]">
          <i className="bi bi-linkedin me-1"></i> Seguir no LinkedIn
        </a>
        <a href="#" className="rounded-md border border-border px-3 py-1.5 font-display text-sm font-semibold text-fg transition hover:border-border-strong hover:bg-overlay">
          <i className="bi bi-box-arrow-up-right me-1"></i> Ver publicações
        </a>
      </div>
      <p className="mb-0 mt-2 font-mono text-[11px] text-muted">Dica: poste seu certificado e marque a página — repostamos toda sexta.</p>
    </div>
  )
}

export default LinkedinCard