const dadosHero = {
  linkLinkedin: 'https://linkedin.com',
  linkInstagram: 'https://instagram.com',
  numAlunos: '1280 alunos',
  turmas: 'TURMAS 2026..2030'
};

function Hero() {
  return (
    <section id="inicio" className="px-4 py-16 text-center">
      <div className="mb-4 flex items-center justify-center gap-2.5 text-[0.68rem] font-bold tracking-[0.19em] text-brand-cyan">
        <span className="inline-block h-px w-[34px] bg-brand-cyan align-middle opacity-55"></span>
        UM ESPAÇO PARA TODOS
        <span className="inline-block h-px w-[34px] bg-brand-cyan align-middle opacity-55"></span>
      </div>

      <img
        src="img/logo.png"
        alt="Logo da comunidade"
        aria-hidden="true"
        className="mx-auto my-3 block h-40 w-40 rounded-full object-cover p-2.5 shadow-[0_0_0_1px_rgba(22,203,226,0.2),0_0_55px_rgba(20,124,245,0.24)]"
      />

      <span className="inline-block rounded-full bg-accent px-[13px] py-[7px] font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
        <i className="bi bi-lock-fill me-1"></i> Comunidade só para alunos de TI
      </span>

      <h1 className="mx-auto mb-[18px] mt-[22px] font-display text-[clamp(38px,6vw,62px)] font-bold leading-[1.04] tracking-[-0.025em] text-fg">
        Ajudamos você aluno <br />
        <span className="font-medium text-muted">Tire duvidas e compartilhe projetos</span>
      </h1>

      <p className="mx-auto max-w-[62ch] text-[clamp(16px,2vw,19px)] text-muted">
        Exclusiva para alunos da Cruzeiro do Sul. Biblioteca organizada no Drive,
        trilhas por matéria e bastidores no <strong className="text-fg">LinkedIn</strong> e{' '}
        <strong className="text-fg">Instagram</strong> — tudo para engajar, compartilhar
        conquistas e fortalecer seu networking ainda na graduação.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <a href="#entrar" className="rounded-md border border-[oklch(78%_0.14_244)] bg-accent px-4 py-2 font-display font-semibold text-accent-ink shadow-card transition hover:-translate-y-0.5 hover:brightness-[1.06]">
          Siga-nos no <i className="bi bi-instagram me-2"></i>Instagram e <i className="bi bi-linkedin me-2"></i>Linkedin
        </a>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <span className="flex items-center -space-x-2">
          <img src="https://i.pravatar.cc/100?img=33" alt="" className="h-8 w-8 rounded-full border-2 border-surface object-cover" />
          <img src="https://i.pravatar.cc/100?img=14" alt="" className="h-8 w-8 rounded-full border-2 border-surface object-cover" />
          <img src="https://i.pravatar.cc/100?img=32" alt="" className="h-8 w-8 rounded-full border-2 border-surface object-cover" />
        </span>
        <span className="text-left text-[13px] leading-[1.3]">
          <strong className="text-fg">{dadosHero.numAlunos}</strong> <span className="text-muted">já dentro</span><br />
          <span className="font-mono text-[11px] tracking-[0.04em] text-muted">{dadosHero.turmas}</span>
        </span>
        <span className="flex gap-1">
          <a href={dadosHero.linkLinkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border px-2 py-1.5 text-fg transition hover:border-border-strong hover:bg-overlay">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href={dadosHero.linkInstagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-border px-2 py-1.5 text-fg transition hover:border-border-strong hover:bg-overlay">
            <i className="bi bi-instagram"></i>
          </a>
        </span>
      </div>

      <p className="mb-0 mt-3 font-mono text-[11px] tracking-[0.04em] text-muted">
        Não é aluno? Siga nossos perfis públicos e acompanhe os destaques.
      </p>
    </section>
  )
}

export default Hero