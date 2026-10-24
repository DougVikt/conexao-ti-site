import { useState } from 'react'

function CtaForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="entrar" className="w-full py-4">
      <div className="rounded-2xl border border-border bg-linear-to-b from-[oklch(28%_0.06_256)] to-[oklch(23%_0.05_256)] p-4 md:p-5">
        <div className="grid items-center gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">
              <i className="bi bi-lock me-1"></i> Acesso privado
            </div>
            <h2 className="mb-3 font-display text-[clamp(26px,4vw,36px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
              Solicite seu acesso à Conexão TI
            </h2>
            <p className="mb-0 text-[15px] text-muted">
              Comunidade privada dos cursos de TI da faculdade. Use seu e-mail institucional — liberamos em até 24h. Enquanto aguarda, siga nossas redes públicas.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-1.5 font-display text-sm font-semibold text-fg transition hover:border-border-strong hover:bg-overlay">
                <i className="bi bi-linkedin me-1"></i> Seguir no LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-1.5 font-display text-sm font-semibold text-fg transition hover:border-border-strong hover:bg-overlay">
                <i className="bi bi-instagram me-1"></i> Seguir no Instagram
              </a>
            </div>
            <ul className="mb-0 mt-3 flex list-none flex-wrap gap-2 p-0 text-[13px] text-muted">
              <li><i className="bi bi-check2-circle me-1 text-blue-tint"></i> Biblioteca privada</li>
              <li><i className="bi bi-check2-circle me-1 text-blue-tint"></i> Vagas e avisos no LinkedIn</li>
              <li><i className="bi bi-check2-circle me-1 text-blue-tint"></i> Bastidores no Instagram</li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-4">
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                Solicitar acesso privado
              </label>
              <input
                placeholder="Seu nome completo"
                required
                className="mb-2 w-full rounded-md border border-border bg-surface-inset px-3 py-2 text-sm text-fg placeholder:text-muted"
              />
              <input
                type="email"
                placeholder="seu.nome@faculdade.edu.br"
                required
                pattern=".*@faculdade\.edu\.br"
                title="Use seu e-mail institucional @faculdade.edu.br"
                className="mb-2 w-full rounded-md border border-border bg-surface-inset px-3 py-2 text-sm text-fg placeholder:text-muted"
              />
              <div className="mb-3 grid grid-cols-2 gap-2">
                <input
                  placeholder="RA"
                  required
                  className="w-full rounded-md border border-border bg-surface-inset px-3 py-2 text-sm text-fg placeholder:text-muted"
                />
                <select className="w-full rounded-md border border-border bg-surface-inset px-3 py-2 text-sm text-muted">
                  <option>Curso</option>
                  <option>ADS</option>
                  <option>Sistemas de Informação</option>
                  <option>Redes de Computadores</option>
                  <option>Eng. de Software</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={sent}
                className="w-full rounded-md border border-[oklch(78%_0.14_244)] bg-accent px-4 py-2 font-display font-semibold text-accent-ink shadow-card transition hover:-translate-y-0.5 hover:brightness-[1.06] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sent ? 'Solicitação enviada ✓' : (<><i className="bi bi-lock me-1"></i> Solicitar acesso</>)}
              </button>
              <p className="mb-0 mt-2 text-center font-mono text-[11px] text-muted">
                {sent
                  ? 'Verifique seu e-mail institucional em até 24h.'
                  : 'Aprovação pela coordenação em até 24h. Fora da faculdade? Siga no LinkedIn/Instagram.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaForm