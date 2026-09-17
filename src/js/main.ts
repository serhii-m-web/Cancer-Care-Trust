function initHeaderBurger(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const burger = document.querySelector<HTMLButtonElement>(
    '.site-header__burger-button',
  );

  if (!header || !burger) {
    return;
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';

    burger.setAttribute('aria-expanded', String(!isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    header.classList.toggle('is-menu-open', !isOpen);
  });
}

function init(): void {
  document.documentElement.classList.add('js');
  initHeaderBurger();

  const year = String(new Date().getFullYear());
  document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

