/**
 * Cursor personalizado da Conexão TI.
 *
 * Substitui o ponteiro nativo por um ponto ciano + anel que persegue o mouse
 * com suavidade. O anel reage a elementos interativos (links, botões, cards),
 * fica pressionado no clique e se esconde sobre campos de texto, onde o
 * cursor nativo de digitação é restaurado via CSS.
 *
 * Só é ativado em dispositivos com ponteiro preciso (mouse/trackpad) e
 * respeita prefers-reduced-motion (sem atraso do anel).
 */
(function initCustomCursor() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!finePointer.matches) return;

  const INTERACTIVE_SELECTOR =
    'a, button, [role="button"], summary, label, .bento-card, .card, .adm-card, .roadmap-tab-btn';
  const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

  const root = document.documentElement;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  document.body.append(ring, dot);
  root.classList.add('has-custom-cursor');

  // Luz ambiente do fundo espacial: só existe se a página tiver .bg-space.
  const spaceBg = document.querySelector('.bg-space');
  const spotlight = spaceBg ? document.createElement('div') : null;
  if (spotlight) {
    spotlight.className = 'bg-space__spotlight';
    spotlight.setAttribute('aria-hidden', 'true');
    spaceBg.append(spotlight);
  }

  let pointerX = 0;
  let pointerY = 0;
  let ringX = 0;
  let ringY = 0;
  let lightX = 0;
  let lightY = 0;
  let visible = false;
  let isHovering = false;
  let isPressed = false;
  let overText = false;
  let frameId = 0;

  function setVisible(value) {
    visible = value;
    applyState();
  }

  function applyState() {
    // O ponto/anel só aparecem sobre a página e fora de campos de texto.
    const shown = visible && !overText;

    dot.classList.toggle('is-visible', visible);
    ring.classList.toggle('is-visible', visible);

    if (spotlight) {
      spotlight.classList.toggle('is-visible', visible);
    }

    dot.classList.toggle('is-hidden', !shown);
    ring.classList.toggle('is-hidden', !shown);

    dot.classList.toggle('is-hover', isHovering && !overText);
    ring.classList.toggle('is-hover', isHovering && !overText);

    dot.classList.toggle('is-pressed', isPressed);
    ring.classList.toggle('is-pressed', isPressed);
  }

  function render() {
    // Em prefers-reduced-motion o anel acompanha o mouse sem atraso.
    const ease = reducedMotion.matches ? 1 : 0.22;
    ringX += (pointerX - ringX) * ease;
    ringY += (pointerY - ringY) * ease;

    // A luz tem mais inércia que o anel para parecer ambiente, não um cursor.
    const lightEase = reducedMotion.matches ? 1 : 0.08;
    lightX += (pointerX - lightX) * lightEase;
    lightY += (pointerY - lightY) * lightEase;

    dot.style.setProperty('--x', pointerX + 'px');
    dot.style.setProperty('--y', pointerY + 'px');
    ring.style.setProperty('--x', ringX + 'px');
    ring.style.setProperty('--y', ringY + 'px');

    if (spotlight) {
      spotlight.style.setProperty('--x', lightX + 'px');
      spotlight.style.setProperty('--y', lightY + 'px');
    }

    frameId = window.requestAnimationFrame(render);
  }

  function onPointerMove(event) {
    if (!visible) {
      // Evita o cursor "voando" da posição inicial até o ponteiro.
      ringX = event.clientX;
      ringY = event.clientY;
      lightX = event.clientX;
      lightY = event.clientY;
      setVisible(true);
    }

    pointerX = event.clientX;
    pointerY = event.clientY;
  }

  function onPointerOver(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    overText = Boolean(target.closest(TEXT_SELECTOR));
    isHovering = !overText && Boolean(target.closest(INTERACTIVE_SELECTOR));
    applyState();
  }

  function onPointerDown() {
    isPressed = true;
    applyState();
  }

  function onPointerUp() {
    isPressed = false;
    applyState();
  }

  function onLeaveWindow() {
    setVisible(false);
    applyState();
  }

  function onEnterWindow() {
    setVisible(true);
    applyState();
  }

  function teardown() {
    if (!root.classList.contains('has-custom-cursor')) return;

    window.cancelAnimationFrame(frameId);
    root.classList.remove('has-custom-cursor');
    dot.remove();
    ring.remove();
    if (spotlight) spotlight.remove();

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerover', onPointerOver);
    document.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointerleave', onLeaveWindow);
    root.removeEventListener('pointerenter', onEnterWindow);
    window.removeEventListener('blur', onLeaveWindow);
    window.removeEventListener('focus', onEnterWindow);
  }

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerover', onPointerOver, { passive: true });
  document.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.addEventListener('pointerup', onPointerUp, { passive: true });

  root.addEventListener('pointerleave', onLeaveWindow);
  root.addEventListener('pointerenter', onEnterWindow);
  window.addEventListener('blur', onLeaveWindow);
  window.addEventListener('focus', onEnterWindow);

  if (typeof finePointer.addEventListener === 'function') {
    finePointer.addEventListener('change', (event) => {
      if (!event.matches) teardown();
    });
  }

  applyState();
  frameId = window.requestAnimationFrame(render);
})();
