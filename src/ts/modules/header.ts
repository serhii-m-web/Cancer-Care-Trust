export function initHeaderBurger(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const burger = document.querySelector<HTMLButtonElement>(
    '.site-header__burger-button',
  );
  const nav = document.querySelector<HTMLElement>('#header-nav');

  if (!header || !burger || !nav) {
    return;
  }

  const mediaQuery = window.matchMedia('(max-width: 1023px)');

  const setMenuOpen = (isOpen: boolean): void => {
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    header.classList.toggle('is-menu-open', isOpen);
    document.body.classList.toggle('is-scroll-locked', isOpen && mediaQuery.matches);
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  nav.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (burger.getAttribute('aria-expanded') !== 'true') {
      return;
    }

    setMenuOpen(false);
    burger.focus();
  });

  mediaQuery.addEventListener('change', () => {
    if (!mediaQuery.matches) {
      setMenuOpen(false);
    }
  });
}
