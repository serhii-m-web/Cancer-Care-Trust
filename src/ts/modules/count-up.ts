const COUNT_SELECTOR =
  '.support__content-footer-count, .diagnosis__column-title';

type CountTarget = {
  element: HTMLElement;
  value: number;
  suffix: string;
  prefix: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, decimals: number): string {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }

  return String(Math.round(value));
}

function parseCountElement(element: HTMLElement): CountTarget | null {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.visually-hidden').forEach((node) => node.remove());

  const raw = clone.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const match = raw.match(/^([^\d+-]*)([+-]?\d+(?:[.,]\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const prefix = match[1] ?? '';
  const numeric = (match[2] ?? '').replace(',', '.');
  const suffix = (match[3] ?? '').trimStart();
  const value = Number(numeric);

  if (!Number.isFinite(value)) {
    return null;
  }

  return { element, value, suffix, prefix };
}

function setCountText(
  target: CountTarget,
  current: number,
  decimals: number,
): void {
  const visible = `${target.prefix}${formatValue(current, decimals)}${target.suffix}`;
  const hidden = target.element.querySelector('.visually-hidden');

  if (hidden) {
    target.element.innerHTML = `${hidden.outerHTML}${visible}`;
    return;
  }

  target.element.textContent = visible;
}

function animateCount(target: CountTarget, duration = 1600): void {
  const decimals = String(target.value).includes('.')
    ? String(target.value).split('.')[1]?.length ?? 0
    : 0;

  if (prefersReducedMotion() || duration <= 0) {
    setCountText(target, target.value, decimals);
    return;
  }

  const start = performance.now();

  setCountText(target, 0, decimals);

  const tick = (now: number): void => {
    const progress = Math.min((now - start) / duration, 1);
    const current = target.value * easeOutCubic(progress);

    setCountText(target, current, decimals);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

/**
 * Animates statistic numbers in `.support__content-footer-count`
 * and `.diagnosis__column-title` when they enter the viewport.
 */
export function initCountUp(): void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>(COUNT_SELECTOR))
    .map(parseCountElement)
    .filter((item): item is CountTarget => Boolean(item));

  if (!targets.length) {
    return;
  }

  if (prefersReducedMotion()) {
    targets.forEach((target) => {
      const decimals = String(target.value).includes('.')
        ? String(target.value).split('.')[1]?.length ?? 0
        : 0;
      setCountText(target, target.value, decimals);
    });
    return;
  }

  // Show zero before the first paint of the count animation
  targets.forEach((target) => {
    const decimals = String(target.value).includes('.')
      ? String(target.value).split('.')[1]?.length ?? 0
      : 0;
    setCountText(target, 0, decimals);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const target = targets.find((item) => item.element === entry.target);

        if (!target) {
          return;
        }

        animateCount(target);
        observer.unobserve(target.element);
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.35 },
  );

  targets.forEach((target) => observer.observe(target.element));
}
