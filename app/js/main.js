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