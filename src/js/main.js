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

//accordeon-team

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


//accordeon-menu

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
