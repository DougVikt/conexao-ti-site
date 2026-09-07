document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#librarySearch');
  const items = [...document.querySelectorAll('.library-item')];
  const empty = document.querySelector('#emptySearch');

  search?.addEventListener('input', (event) => {
    const term = event.target.value.trim().toLowerCase();
    let visible = 0;
    items.forEach((item) => {
      const matches = item.dataset.search.includes(term);
      item.classList.toggle('d-none', !matches);
      if (matches) visible += 1;
    });
    empty?.classList.toggle('d-none', visible > 0);
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('#mainNav');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
