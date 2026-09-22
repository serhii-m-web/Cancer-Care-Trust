const ANIMATE_SELECTOR = '[data-animate]';
const INVIEW_CLASS = 'is-inview';
const DEFAULT_STAGGER_MS = 10000;

type AnimateOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wait for the initial hidden styles to paint, then reveal —
 * so elements already in the viewport still play their transition.
 */
function reveal(element: HTMLElement): void {
  if (element.classList.contains(INVIEW_CLASS)) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.classList.add(INVIEW_CLASS);
    });
  });
}

function isAbsolutelyPositioned(element: HTMLElement): boolean {
  const position = window.getComputedStyle(element).position;
  return position === 'absolute' || position === 'fixed';
}

function applyStaggerDelays(): void {
  document.querySelectorAll<HTMLElement>('[data-animate-stagger]').forEach((group) => {
    const step = Number(group.getAttribute('data-animate-stagger') || DEFAULT_STAGGER_MS);
    const items = group.querySelectorAll<HTMLElement>(':scope > [data-animate]');

    items.forEach((item, index) => {
      if (item.hasAttribute('data-animate-delay') || isAbsolutelyPositioned(item)) {
        return;
      }

      item.style.setProperty('--animate-delay', `${index * step}ms`);
    });
  });
}

/**
 * Observes `[data-animate]` elements and adds `.is-inview` when they enter the viewport.
 * Elements already visible on load are animated after the first paint.
 *
 * Attributes:
 * - data-animate="fade-up" | "fade" | "fade-left" | "fade-right" | "scale"
 * - data-animate-delay="150"
 * - data-animate-stagger="100" on a parent of animated children
 * - data-animate-once="false" to toggle when leaving the viewport
 */
export function initViewportObserver(options: AnimateOptions = {}): void {
  applyStaggerDelays();

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(ANIMATE_SELECTOR),
  ).filter(
    (element) =>
      element.getAttribute('data-animate') !== 'false' &&
      !isAbsolutelyPositioned(element),
  );

  if (!elements.length) {
    return;
  }

  if (prefersReducedMotion()) {
    elements.forEach((element) => element.classList.add(INVIEW_CLASS));
    return;
  }

  elements.forEach((element) => {
    const delay = Number(element.getAttribute('data-animate-delay') || 0);

    if (Number.isFinite(delay) && delay > 0) {
      element.style.setProperty('--animate-delay', `${delay}ms`);
    }
  });

  const rootMargin = options.rootMargin ?? '0px 0px -8% 0px';
  const threshold = options.threshold ?? 0.12;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const once = target.getAttribute('data-animate-once') !== 'false';

        if (entry.isIntersecting) {
          reveal(target);

          if (once) {
            observer.unobserve(target);
          }

          return;
        }

        if (!once) {
          target.classList.remove(INVIEW_CLASS);
        }
      });
    },
    { root: null, rootMargin, threshold },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}
