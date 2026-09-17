export function initCurrentYear(): void {
  const year = String(new Date().getFullYear());

  document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
    el.textContent = year;
  });
}
