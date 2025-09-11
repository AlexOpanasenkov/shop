const openBtn = document.querySelector('.open-modal');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const closeBtn = document.querySelector('.close-modal');

function openModal() {
  modal.removeAttribute('inert');
  document.documentElement.classList.add('scroll-lock');
  document.body.classList.add('scroll-lock');
}

function closeModal() {
  modal.setAttribute('inert', '');
  document.documentElement.classList.remove('scroll-lock');
  document.body.classList.remove('scroll-lock');
}

if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (openBtn) openBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hasAttribute('inert')) {
    closeModal();
  }
});

const openPopupBtn = document.querySelector('.catalog-popup');
const popup = document.querySelector('.popup');
const popupOverlay = document.querySelector('.popup__overlay');
const closePopupBtn = document.querySelector('.close-popup');

function openPopup() {
  popup.removeAttribute('inert');
  document.documentElement.classList.add('scroll-lock');
  document.body.classList.add('scroll-lock');
}

function closePopup() {
  popup.setAttribute('inert', '');
  document.documentElement.classList.remove('scroll-lock');
  document.body.classList.remove('scroll-lock');
}

if (popupOverlay) popupOverlay.addEventListener('click', closePopup);
if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !popup.hasAttribute('inert')) {
    closePopup();
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
    // ✅ Мобильный экран → включаем слайдер
    if (!sliderMobile) {
      initSwiper();
    }
  } else {
    // ❌ Десктоп → выключаем слайдер
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
      body.classList.toggle('scroll-lock');
    });
  } else {
    console.error('Header button or menu not found');
  }
});

  const modeContainer = document.querySelector(".view-mode__container");
  const modeBtnGrid = document.querySelector(".view-mode__btn-grid");
  const modeBtnLine = document.querySelector(".view-mode__btn-line");

  modeBtnGrid?.addEventListener("click", () => {
    modeContainer.classList.add("view-mode__container--grid");
    modeContainer.classList.remove("view-mode__container--list");
    modeBtnGrid.classList.add("active");
    modeBtnLine.classList.remove("active");
  });

  modeBtnLine?.addEventListener("click", () => {
    modeContainer.classList.add("view-mode__container--list");
    modeContainer.classList.remove("view-mode__container--grid");
    modeBtnLine.classList.add("active");
    modeBtnGrid.classList.remove("active");
  });

const swiper = new Swiper(".accessories__slider", {
  // Optional parameters
  loop: true,
  slidesPerView: 3,
  spaceBetween: 40,
  // Navigation arrows
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
  // Optional parameters
  slidesPerView: 'auto', // Авто-ширина слайдов
  spaceBetween: 10, // Пробел между слайдами, если нужно
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 16,
  // Navigation arrows
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

rangeSlider.noUiSlider?.on("update", (values, handle) => {
    if (handle === 0) {
      rangeMin.value = values[0];
    } else {
      rangeMax.value = values[1];
    }
  });

  rangeMin.addEventListener("change", () => {
    rangeSlider.noUiSlider?.set([rangeMin.value, null]);
  });

  rangeMax.addEventListener("change", () => {
    rangeSlider.noUiSlider?.set([null, rangeMax.value]);
  });
}