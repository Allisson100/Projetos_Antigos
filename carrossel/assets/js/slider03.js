const swiper = new Swiper('.swiper', {
    slidesPerView: 6,
    spaceBetween: 40,
    slidesPerGroup: 3,
    direction: 'horizontal',
    loop: true,
    loopFillGroupWithBlank: true,

  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });