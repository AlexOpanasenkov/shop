function setupModal(openSelector, modalSelector, closeSelector, overlaySelector) {
  const openBtn = document.querySelector(openSelector);
  const modal = document.querySelector(modalSelector);
  const closeBtn = document.querySelector(closeSelector);
  const overlay = document.querySelector(overlaySelector);

  function open() {
    if (modal) {
      modal.removeAttribute('inert');
      document.body.classList.add('scroll-lock');
    }
  }

  function close() {
    if (modal) {
      modal.setAttribute('inert', '');
      document.body.classList.remove('scroll-lock');
    }
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);

  return { open, close };
}

// Настройка модалки корзины
setupModal('.open-modal', '.modal', '.close-modal', '.modal__overlay');

// Настройка фильтра каталога
setupModal('.catalog-popup', '.popup', '.close-popup', '.popup__overlay');

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal, .popup');
    modals.forEach((m) => {
      if (!m.hasAttribute('inert')) m.setAttribute('inert', '');
    });
    document.body.classList.remove('scroll-lock');
  }
});


const breakpoint = window.matchMedia("(max-width: 650px)");
let sliderMobile = null;

function initSwiper() {
  sliderMobile = new Swiper(".slider-mobile", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      prevEl: ".product__arrow-prev",
      nextEl: ".product__arrow-next",
    },
  });
}

function destroySwiper() {
  if (sliderMobile) {
    sliderMobile.destroy(true, true);
    sliderMobile = null;
  }
}

function handleBreakpointChange(e) {
  if (e.matches) {
    if (!sliderMobile) initSwiper();
  } else {
    destroySwiper();
  }
}

handleBreakpointChange(breakpoint);
breakpoint.addEventListener("change", handleBreakpointChange);

document.addEventListener("DOMContentLoaded", () => {
  const headerBtn = document.querySelector('.header__btn');
  const menu = document.querySelector('.menu');
  const bodyLock = document.querySelector('body');

  if (headerBtn && menu) {
    headerBtn.addEventListener('click', () => {
      menu.classList.toggle('menu--active');
      bodyLock.classList.toggle('scroll-lock');
    });
  } else {
    console.error('Header button or menu not found');
  }

  const modeContainer = document.querySelector(".view-mode__container");
  const modeBtnGrid = document.querySelector(".view-mode__btn-grid");
  const modeBtnLine = document.querySelector(".view-mode__btn-line");

  if (modeBtnGrid) modeBtnGrid.addEventListener("click", () => {
    modeContainer.classList.add("view-mode__container--grid");
    modeContainer.classList.remove("view-mode__container--list");
    modeBtnGrid.classList.add("active");
    modeBtnLine.classList.remove("active");
  });

  if (modeBtnLine) modeBtnLine.addEventListener("click", () => {
    modeContainer.classList.add("view-mode__container--list");
    modeContainer.classList.remove("view-mode__container--grid");
    modeBtnLine.classList.add("active");
    modeBtnGrid.classList.remove("active");
  });
});

const swiper = new Swiper(".accessories__slider", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 40,
  navigation: {
    prevEl: ".accessories__arrow-prev",
    nextEl: ".accessories__arrow-next",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

const swiperReviews = new Swiper(".reviews__slider", {
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  navigation: {
    prevEl: ".reviews__arrow-prev",
    nextEl: ".reviews__arrow-next",
  },
  pagination: {
    el: ".reviews__pagination",
    type: "fraction",
  },
  breakpoints: {
    0: {
      slidesPerView: 6,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 8,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 12,
      spaceBetween: 16,
    },
  },
});

const rangeSlider = document.querySelector(".range__slider");
const rangeMin = document.querySelector(".range__min");
const rangeMax = document.querySelector(".range__max");

if (rangeSlider && rangeMin && rangeMax) {
  noUiSlider.create(rangeSlider, {
    start: [300, 3000],
    step: 100,
    range: {
      min: 300,
      max: 3000,
    },
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  rangeSlider.noUiSlider.on("update", (values, handle) => {
    if (handle === 0) {
      rangeMin.value = values[0];
    } else {
      rangeMax.value = values[1];
    }
  });

  rangeMin.addEventListener("change", () => {
    rangeSlider.noUiSlider.set([rangeMin.value, null]);
  });

  rangeMax.addEventListener("change", () => {
    rangeSlider.noUiSlider.set([null, rangeMax.value]);
  });
}