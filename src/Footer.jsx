function Footer() {
  return (
    <footer className="w-full border-t border-border py-4 font-mono text-xs tracking-[0.02em] text-muted">
      <div className="flex flex-wrap justify-between gap-3">
        <span>
          Conexão TI · Comunidade privada dos cursos de TI ·{' '}
          <a href="biblioteca-conexao-ti.html" className="text-blue-tint no-underline">Biblioteca privada</a> · Acesso com @faculdade.edu.br
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="no-underline">
            <i className="bi bi-linkedin me-1"></i> LinkedIn
          </a>
          <span className="opacity-40">·</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="no-underline">
            <i className="bi bi-instagram me-1"></i> Instagram
          </a>
          <span className="opacity-40">·</span>
          <span>Feito com <i className="bi bi-heart-fill text-[10px] text-blue-tint"></i> pela coordenação</span>
        </span>
      </div>
    </footer>
  )
}

export default Footer
