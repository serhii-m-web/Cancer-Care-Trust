import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HELP_SLIDER_MQ = '(max-width: 1023px)';

function createHelpSlider(element: HTMLElement): Swiper {
  const pagination = element.querySelector<HTMLElement>('.help__pagination');
  const nextEl = element.querySelector<HTMLElement>('.btn-nav--next');
  const prevEl = element.querySelector<HTMLElement>('.btn-nav--prev');

  return new Swiper(element, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    watchOverflow: true,
    pagination: pagination
      ? {
          el: pagination,
          clickable: true,
        }
      : undefined,
    navigation:
      nextEl && prevEl
        ? {
            nextEl,
            prevEl,
          }
        : undefined,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1.4,
      },
      768: {
        slidesPerView: 1.8,
      },
    },
  });
}

export function initHelpSliders(): void {
  const mediaQuery = window.matchMedia(HELP_SLIDER_MQ);
  const sliders = document.querySelectorAll<HTMLElement>('.help__content');
  const instances = new Map<HTMLElement, Swiper>();

  const syncSliders = (): void => {
    sliders.forEach((element) => {
      const existing = instances.get(element);

      if (mediaQuery.matches) {
        if (!existing) {
          instances.set(element, createHelpSlider(element));
        } else {
          existing.update();
        }

        return;
      }

      if (existing) {
        existing.destroy(true, true);
        instances.delete(element);
      }
    });
  };

  syncSliders();

  mediaQuery.addEventListener('change', syncSliders);
}
