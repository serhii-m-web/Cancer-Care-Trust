import { initHeaderBurger } from './modules/header';
import { initHelpTabs } from './modules/help-tabs';
import { initHelpSliders } from './modules/help-slider';
import { initSupportSlider } from './modules/support-slider';
import { initCurrentYear } from './modules/year';
import { initViewportObserver } from './modules/viewport-observer';
import { initCountUp } from './modules/count-up';

function init(): void {
  document.documentElement.classList.add('js');
  initHeaderBurger();
  initHelpTabs();
  initHelpSliders();
  initSupportSlider();
  initCurrentYear();
  initViewportObserver();
  initCountUp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
