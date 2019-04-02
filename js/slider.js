// SLIDER
// $(document).ready(() => {
//     let left = document.querySelector(".slider__arrow--prev");
//     let right = document.querySelector(".slider__arrow--next");
//     let list = document.querySelector(".slider__list");

//     let minRight = 0;
//     let maxRight = 0;
//     let lis = $("li.slider__item");
//     let stepSlide = lis.width(); //940;
//     let currentRight = 0;


//     lis.each(() => {
//         maxRight += stepSlide;
//     });
//     maxRight -= stepSlide;

//     $(right).on('click', (event) => {
//         event.preventDefault();
//         if (currentRight < maxRight) {
//             currentRight += stepSlide;
//             list.style.right = currentRight + "px";
//         } else {
//             currentRight = 0;
//             list.style.right = currentRight + "px";
//         }
//     });

//     $(left).on('click', (event) => {
//         event.preventDefault();
//         if (currentRight > minRight) {
//             currentRight -= stepSlide;
//             list.style.right = currentRight + "px";
//         } else {
//             currentRight = maxRight;
//             list.style.right = currentRight + "px";
//         }
//     });
// });

$(function() {
    let list = $('.slider__list'),
        sliderItemsCount = $('.slider__item').length;
        sliderWidth = sliderItemsCount * 100 + "%";
            // Определение ширины слайдера в % в зависимости от количества слайдов
        setSliderWidth = function(element, width) {
          $(element).css(width, sliderWidth);
        }
            // анимация движения
        moveSlide = function(container, slideNum) {
          let items = $('.slider__item'),
              activeSlide = items.filter('.active'),
              reqItem = items.eq(slideNum),
              reqIndex = reqItem.index(),
              duration = 500;
  
          if (reqItem.length) {
            list.animate({
              'left': -reqIndex * 100 + '%'}, duration, () => {
                activeSlide.removeClass('active');
                reqItem.addClass('active');
            });
          }
        }
    setSliderWidth(list, 'width');
  
  
    $('.arrow').click(function(e){
      e.preventDefault();
  
      var $this = $(this),
          container = $('.burgers-section__slider'),
          items = $('.slider__item', container),
          activeItem = items.filter('.active'),
          existedItem, edgeItem, reqItem;
  
      if ($this.hasClass('arrow-next')) {
        existedItem = activeItem.next();
        edgeItem = items.first();
      }
      if ($this.hasClass('arrow-prev')) {
        existedItem = activeItem.prev();
        edgeItem = items.last();
      }
  
      reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
  
      moveSlide(container, reqItem);
  
    });
  
  });