import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function createSupportSlider(element: HTMLElement): Swiper {
  const pagination = element.querySelector<HTMLElement>('.support__pagination');
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
        spaceBetween: 16,
      },
      480: {
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2.2,
        spaceBetween: 24,
      },
    },
  });
}

export function initSupportSlider(): void {
  const sliders = document.querySelectorAll<HTMLElement>('.support__slider');

  if (!sliders.length) {
    return;
  }

  sliders.forEach((slider) => {
    const instance = createSupportSlider(slider);
    const images = slider.querySelectorAll('img');

    images.forEach((image) => {
      if (image.complete) {
        return;
      }

      image.addEventListener(
        'load',
        () => {
          instance.update();
        },
        { once: true },
      );
    });
  });
}
