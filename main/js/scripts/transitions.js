/**
 * Transições suaves entre as páginas do site.
 *
 * A entrada é feita via CSS (animação "page-enter" no body). Aqui apenas
 * adicionamos um fade-out curto antes de navegar para outra página interna,
 * respeitando prefers-reduced-motion e mantendo o comportamento padrão para
 * links externos, novas abas, downloads e âncoras da mesma página.
 */
(function initPageTransitions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) return;

  const LEAVE_DURATION = 180;

  function clearLeavingState() {
    document.body.classList.remove('page-leaving');
  }

  // Ao voltar pelo histórico (inclusive bfcache), garante a página visível.
  window.addEventListener('pageshow', clearLeavingState);

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) {
      return;
    }

    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (destination.origin !== window.location.origin) return;

    // Mesma página (inclusive com hash): deixa o scroll suave nativo agir.
    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search
    ) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-leaving');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, LEAVE_DURATION);
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', (event) => {
      if (event.matches) clearLeavingState();
    });
  }
})();
