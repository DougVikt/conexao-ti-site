import { Fragment } from 'react'

const stats = [
    { value: '240', label: 'ALUNOS ATIVOS' },
    { value: '8', label: 'TRILHAS' },
    { value: '2× mês', label: 'LIVES FECHADAS' },
]

const steps = [
    { title: '1 · Solicite acesso com e-mail da faculdade', text: 'Validação por RA + @faculdade.edu.br. Aprovação em até 24h pela coordenação.' },
    { title: '2 · Estude na biblioteca privada', text: '8 pastas por matéria, listas e projetos que caem na prova. Tudo no Drive restrito.' },
    { title: '3 · Poste e seja repostado', text: 'Concluiu? Poste no LinkedIn/Instagram marcando @conexao.ti. Os melhores ganham destaque no feed oficial.' },
]

function Step({ step, last }) {
    return (
        <div className={`relative pl-7 ${last ? '' : "pb-4 before:absolute before:bottom-[-12px] before:left-[7px] before:top-7 before:w-px before:bg-border before:content-['']"}`}>
            <span className="absolute left-0 top-0.5 h-[15px] w-[15px] rounded-full border-[3px] border-bg bg-accent shadow-[0_0_0_1px_var(--color-border)]"></span>
            <h4 className="font-display text-base font-semibold text-fg">{step.title}</h4>
            <p className="mb-0 text-sm text-muted">{step.text}</p>
        </div>
    )
}

function ComoFunciona() {
    return (
        <section className="mx-auto grid w-full max-w-6xl items-center gap-4 px-4 py-5 lg:grid-cols-12">
            <div className="lg:col-span-5">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-tint">Como entrar</div>
                <h2 className="mb-3 font-display text-[clamp(28px,4vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
                    Privada, mas<br />feita para engajar
                </h2>
                <p className="text-[15px] text-muted">
                    Acesso liberado por e-mail institucional. Dentro, estudo focado. Fora, visibilidade: seus projetos ganham palco no LinkedIn e Instagram do curso.
                </p>
                <div className="mt-4 flex gap-3">
                    {stats.map((stat, i) => (
                        <Fragment key={stat.label}>
                            {i > 0 && <div className="w-px self-stretch bg-border"></div>}
                            <div className="text-center">
                                <div className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-fg">{stat.value}</div>
                                <div className="font-mono text-[11px] tracking-[0.06em] text-muted">{stat.label}</div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border bg-linear-to-b from-surface to-surface-2 p-4 md:p-12">
                    {steps.map((step, i) => (
                        <Step key={step.title} step={step} last={i === steps.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ComoFunciona