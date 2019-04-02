// АККОРДЕОН горизонтальный
$(document).ready(function () {

    var menuTrigger = function (e) {
        let $this = $(this);
        let containerM = $this.closest('.menu-acco__list');
        let itemM = $this.closest('.menu-acco__item');
        let itemsM = containerM.find('.menu-acco__item');
        let activeItemM = itemsM.filter('.menu-acco__item--active');
        let contentM = itemM.find('.menu-acco__content');
        let activeContentM = activeItemM.find('.menu-acco__content');
        e.preventDefault();

        if (itemM.hasClass('menu-acco__item--active')) {
            itemM.removeClass('menu-acco__item--active');
            contentM.slideUp('3000');
        } else {
            itemsM.removeClass('menu-acco__item--active');
            itemM.addClass('menu-acco__item--active');
            activeContentM.slideDown('3000');
            contentM.slideDown('3000');
        }
    };

    $('.menu-acco__trigger').on('click', menuTrigger);
    $('.menu-acco__img').on('click', menuTrigger);

});
