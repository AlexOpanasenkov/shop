const swiper = new Swiper('.accessories__slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 3,
  spaceBetween: 40,
  // Navigation arrows
  navigation: {
    nextEl: '.accessories__arrow-next',
    prevEl: '.accessories__arrow-prev',
  },
});