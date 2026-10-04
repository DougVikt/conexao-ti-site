import { useState } from 'react'

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Avisos', href: '#avisos' },
  { label: 'Biblioteca', href: '#biblioteca' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(49,38,54,0.7)] bg-[rgba(28,7,51,0.48)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2">
        <a href="#inicio" className="flex items-center gap-2 font-display text-[1.3rem] font-bold tracking-[0.16em] text-fg">
          <img src="img/logo.png" alt="Logo da comunidade" className="h-10 w-10 rounded-full object-cover" />
          <span>Conexão TI</span>
        </a>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-md border border-border px-2 py-1.5 text-fg lg:hidden"
        >
          <i className={open ? 'bi bi-x-lg' : 'bi bi-list'}></i>
        </button>

        <div className={`${open ? 'flex' : 'hidden'} w-full flex-col items-stretch gap-2 lg:flex lg:w-auto lg:flex-row lg:items-center`}>
          <ul className="flex flex-col gap-1 lg:ml-auto lg:flex-row lg:items-center lg:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block px-3 py-1.5 text-[0.96rem] text-fg transition hover:-translate-y-px hover:font-extrabold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#redes" className="rounded-md bg-brand px-3 py-1.5 text-center text-sm font-bold text-white shadow-glow transition hover:-translate-y-px hover:brightness-110">
            Conectar-se ↗
          </a>
          <div className="flex gap-2">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md border border-border px-2 py-1.5 text-fg transition hover:border-border-strong hover:bg-overlay">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-md border border-border px-2 py-1.5 text-fg transition hover:border-border-strong hover:bg-overlay">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar