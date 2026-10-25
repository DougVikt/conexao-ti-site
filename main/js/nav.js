/**
 * Destaque dos links de navegação que apontam para seções da página atual.
 *
 * Os links "Nossas Redes" e "Destaques & Posts" levam para as seções
 * #redes e #posts. Este script mantém o link correspondente em azul,
 * tanto ao clicar quanto ao rolar a página.
 */
(function initSectionNav() {
  const nav = document.querySelector('.nav-header');
  if (!nav) return;

  const sections = ['redes', 'posts']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  const links = Array.from(
    nav.querySelectorAll('a.small.fw-semibold[href*="#"]')
  ).filter((link) => {
    const hash = link.getAttribute('href').split('#')[1];
    return sections.some((section) => section.id === hash);
  });
  if (!links.length) return;

  let lockUntil = 0;

  function setActive(id) {
    links.forEach((link) => {
      const isActive = Boolean(id) && link.getAttribute('href').split('#')[1] === id;

      link.classList.toggle('text-primary', isActive);
      link.classList.toggle('text-secondary', !isActive);
      link.classList.toggle('active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateFromScroll() {
    if (Date.now() < lockUntil) return;

    const offset = nav.offsetHeight + 24;
    let current = '';

    sections.forEach((section) => {
      if (window.scrollY + offset >= section.offsetTop) {
        current = section.id;
      }
    });

    const atBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) {
      current = sections[sections.length - 1].id;
    }

    setActive(current);
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href').split('#')[1];
      setActive(id);
      // Mantém o destaque durante a rolagem suave até a seção.
      lockUntil = Date.now() + 800;
    });
  });

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  window.addEventListener('hashchange', updateFromScroll);
  window.addEventListener('load', updateFromScroll);

  updateFromScroll();
  window.requestAnimationFrame(updateFromScroll);
})();
