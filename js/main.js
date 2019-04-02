// $(document).ready(() => {

//     let mainLink = $('a.logo');

//     let isGitHubPages = () => {
//         return location.host === 'kornatalya.github.io';
//     };

//     if (isGitHubPages()) {
//         mainLink.attr('href', '/Burgers-for-LoftSchool/index.html');
//     }
//     else {
//         mainLink.attr('href', '/');
//     }
// });

//YaMaps

// $(function () {

// 	ymaps.ready(init);
//     var myMap;

//     function init(){     
//         myMap = new ymaps.Map("map", {
//             center: [59.91817154482064,30.30557799999997],
//             zoom: 11,
//             controls: []
//         });

//         myMap.behaviors.disable('scrollZoom');

// 		var coords = [
// 		    [59.94554327989287,30.38935262114668],
// 		    [59.91142323563909,30.50024587065841],
// 		    [59.88693161784606,30.319658102103713],
// 		    [59.97033574821672,30.315194906302924]
// 		],
// 		    myCollection = new ymaps.GeoObjectCollection({}, {
// 		    	iconLayout: 'default#image',
// 	        	iconImageHref: 'icons/map-marker.svg',
// 	        	iconImageSize: [46, 57],
// 	        	iconImageOffset: [-26, -52],
// 		    	draggable: false
// 		    });

// 		for (var i = 0; i < coords.length; i++) {
// 		    myCollection.add(new ymaps.Placemark(coords[i]));
// 		}

// 		myMap.geoObjects.add(myCollection);
//     }
// })

ymaps.ready(init);

let map;


let placemarks = [
        {
            latitude: 59.97,
            longitude: 30.31,
            hintContent: '<div class="map__hint">Ресторан <span>Mr. Burger</span></div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<h3>Ресторан Mr. Burger</h3>',
                '<p>Набережная реки Карповки, 21<br />',
                'Санкт-Петербург, Россия, 197022</p>',
                '<p>тел. +7 (812) 377-13-70</p>',
                '<p>Часы работы: 08:00 - 22:00</p>',
                '</div>'
            ]
        },
        {
            latitude: 59.94,
            longitude: 30.38,
            hintContent: '<div class="map__hint">Ресторан <span>Mr. Burger</span></div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<h3>Ресторан Mr. Burger</h3>',
                '<p>Заячий переулок, 4к1<br />',
                'Санкт-Петербург, Россия, 191015</p>',
                '<p>тел. +7 (812) 377-13-71</p>',
                '<p>Часы работы: 08:00 - 22:00</p>',
                '</div>'
            ]
        },

        {
            latitude: 59.92,
            longitude: 30.49,
            hintContent: '<div class="map__hint">Ресторан <span>Mr. Burger</span></div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<h3>Ресторан Mr. Burger</h3>',
                '<p>проспект Солидарности, 13к1<br />',
                'Санкт-Петербург, Россия, 193312</p>',
                '<p>тел. +7 (812) 377-13-72</p>',
                '<p>Часы работы: 09:00 - 23:00</p>',
                '</div>'
            ]
        },

        {
            latitude: 59.89,
            longitude: 30.317,
            hintContent: '<div class="map__hint">Ресторан <span>Mr. Burger</span></div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<h3>Ресторан Mr. Burger</h3>',
                '<p>Московский проспект, 107к4<br />',
                'Санкт-Петербург, Россия, 196084</p>',
                '<p>тел. +7 (812) 377-13-73</p>',
                '<p>Часы работы: 7:30 - 22:00</p>',
                '</div>'
            ]
        },
    ],
    geoObjects = [];


function init() {

    var zoom = 12;

    if (window.innerWidth > 480
        || window.innerWidth <= 768
    ) {

        zoom = 11;
    }
    if (window.innerWidth <= 480) {
        zoom = 10;
    }
    map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: zoom,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '././icons/mapMarker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57]
            });
    }
    let clusterer = new ymaps.Clusterer({});

    map.geoObjects.add(clusterer);
    // map.geoObjects.add(placemark);
    clusterer.add(geoObjects);
}
//hamburger-menu

$(function() {
  const menuHam = $('.hamburger-menu');
  const buttonHam = $('.hamburger-menu-link');
  const closeHam = $('.hamburger-menu__close');
  const itemHam = $('.hamburger-menu__link');

  let inProcess = false;

  buttonHam.on('click touchstart', e => {
   menuHam.addClass('hamburger-menu_visible');

   if (inProcess) return

   inProcess = true

   setTimeout(() => {
     inProcess = false
  }, 1000);

  });

  closeHam.on('click touchstart', e => {
   if (inProcess) return

   inProcess = true

   setTimeout(() => {
     inProcess = false
  }, 1000);

  menuHam.removeClass('hamburger-menu_visible');
  });

  itemHam.on('click touchstart', e => {
    e.preventDefault();
    menuHam.removeClass('hamburger-menu_visible');
    window.location.href = e.currentTarget.href;

  })
});


//slider

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


//acco-team

$(function () {

$('.team-acco__trigger').on('click', e => {
  e.preventDefault()

  const $this = $(e.currentTarget);
  const container = $this.closest('.team-acco');
  const item = $this.closest('.team-acco__item');
  const items = $('.team-acco__item', container);
  const content = $('.team-acco__content', item);
  const otherContent = $('.team-acco__content', container);
  const textBlock = $('.team-acco__content-block', item);
  const reqHeight = textBlock.outerHeight();

  if (!item.hasClass('team-active')) {
    items.removeClass('team-active')
    item.addClass('team-active')

    otherContent.css({
      'height': 0
    })

    content.css({
      'height': reqHeight
    })

  } else {

    item.removeClass('team-active');
    content.css({
      'height' : 0
    })
  }

})

})


//acco-menu

$(function () {

$('.menu__link').click (
  function(e){
    e.preventDefault();
    if ($(this).parent().hasClass('menu__item--active')) {

      $('.menu__item').removeClass('menu__item--active');

    } else {

      $('.menu__item').removeClass('menu__item--active');

      $(this).parent().addClass('menu__item--active');
          
    }

})

})


//OnePageScroll

$(function () {


const display = $('.maincontent');
const sections = $('.section');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchMenuActiveClass = sectionEq => {
  $('.fixed-menu__item').eq(sectionEq).addClass('active')
    .siblings().removeClass('active');
}

const performTransition = sectionEq => {
  if (inScroll) return
  inScroll = true

  const position = (sectionEq * -100) + '%';

  display.css({
    'transform': `translate(0, ${position})`,
    '-webkit-transform': `translate(0, ${position})`
  })

  sections.eq(sectionEq).addClass('active')
    .siblings().removeClass('active');

  setTimeout(() => {
    inScroll = false;
    switchMenuActiveClass(sectionEq);
  }, 1300);
}

const defineSections = sections => {
  const activeSection = sections.filter('.active');
  return {
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }    
}

const scrollToSection = direction => {
  const section = defineSections(sections)

  if (inScroll) return;

  if (direction === 'up' && section.nextSection.length) {
    performTransition(section.nextSection.index())
  }

  if (direction === 'down' && section.prevSection.length) {
    performTransition(section.prevSection.index())
  }
}

$('.wrapper').on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    let direction = (deltaY > 0)
      ? 'up'
      : 'down'

    scrollToSection(direction);
  },
  touchmove: e => (e.preventDefault())
});


$(document).on('keydown', e => {
  const section = defineSections(sections);

  if (inScroll) return 

  switch (e.keyCode) {
    case 40: //вверх
      if (!section.nextSection.length) return;
      performTransition(section.nextSection.index());
      break;

    case 38: //вниз
      if (!section.prevSection.length) return;
      performTransition(section.prevSection.index());
      break;
  }
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  });
}

$('[data-scroll-to]').on('click touchstart', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const sectionIndex = parseInt($this.attr('data-scroll-to'));

  performTransition(sectionIndex);
});


})


//fancybox

$(function () {
  $("[data-fancybox]").fancybox({
    // Options will go here
  });

})