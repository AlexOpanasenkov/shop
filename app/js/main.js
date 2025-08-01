const modeContainer = document.querySelector('.view-mode__container');
const modeBtnGrid = document.querySelector('.view-mode__btn-grid');
const modeBtnLine = document.querySelector('.view-mode__btn-line');

modeBtnGrid.classList.add('active');

modeBtnGrid.addEventListener('click', () => {
  modeContainer.classList.add('view-mode__container--grid');
  modeContainer.classList.remove('view-mode__container--list');
  modeBtnGrid.classList.add('active');
  modeBtnLine.classList.remove('active');
});

modeBtnLine.addEventListener('click', () => {
  modeContainer.classList.add('view-mode__container--list');
  modeContainer.classList.remove('view-mode__container--grid');
  modeBtnLine.classList.add('active');
  modeBtnGrid.classList.remove('active');
});


const swiper = new Swiper('.accessories__slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 3,
  spaceBetween: 40,
  // Navigation arrows
  navigation: {
    prevEl: '.accessories__arrow-prev',
    nextEl: '.accessories__arrow-next',
  },
});

const swiperReviews = new Swiper('.reviews__slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  // Navigation arrows
  navigation: {
    prevEl: '.reviews__arrow-prev',
    nextEl: '.reviews__arrow-next',
  },
  pagination: {
        el: ".reviews__pagination",
        type: "fraction",
  },
});

const rangeSlider = document.querySelector('.range__slider');
const rangeMin = document.querySelector('.range__min');
const rangeMax = document.querySelector('.range__max');

noUiSlider.create(rangeSlider, {
    start: [300, 3000],
    step: 100,
    range: {
        'min': 300,
        'max': 3000
    },
    format: {
      to: value => Math.round(value),
      from: value => Number(value)
    }
});

rangeSlider.noUiSlider.on('update', (values, handle) => {
  if(handle === 0) {
    rangeMin.value = values[0]
  } else {
    rangeMax.value = values[1]
  }
});

rangeMin.addEventListener('change', () => {
  rangeSlider.noUiSlider.set([rangeMin.value, null])
});

rangeMax.addEventListener('change', () => {
  rangeSlider.noUiSlider.set([null, rangeMax.value])
});

