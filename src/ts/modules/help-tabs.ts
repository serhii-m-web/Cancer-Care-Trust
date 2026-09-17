import type Swiper from 'swiper';

export function initHelpTabs(): void {
  const section = document.querySelector<HTMLElement>('.help');

  if (!section) {
    return;
  }

  const buttons = section.querySelectorAll<HTMLButtonElement>('.help__button');
  const panels = section.querySelectorAll<HTMLElement>('.help__panel');
  const title = section.querySelector<HTMLElement>('[data-help-title]');
  const description = section.querySelector<HTMLElement>(
    '[data-help-description]',
  );

  if (!buttons.length || !panels.length) {
    return;
  }

  const activateTab = (button: HTMLButtonElement): void => {
    const panelId = button.getAttribute('aria-controls');

    buttons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === panelId;

      panel.classList.toggle('is-active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });

    if (title && button.dataset.title) {
      title.textContent = button.dataset.title;
    }

    if (description && button.dataset.description) {
      description.textContent = button.dataset.description;
    }

    const activePanel = panelId
      ? section.querySelector<HTMLElement>(`#${panelId}`)
      : null;
    const activeSlider = activePanel?.querySelector<HTMLElement>(
      '.help__content',
    );
    const swiperInstance = (
      activeSlider as HTMLElement & { swiper?: Swiper }
    )?.swiper;

    if (swiperInstance) {
      swiperInstance.update();
      swiperInstance.slideTo(0, 0);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      activateTab(button);
    });
  });
}
