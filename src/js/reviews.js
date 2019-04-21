// ОТЗЫВЫ

$(document).ready(() => {

    /**
     * Открытие модального окна
     */
    let modalOpen = () => {
        $('button.button__more').on('click', (event) => {
            event.preventDefault();
            $('#reviews_overlay.overlay')
                .fadeIn(300,
                function () {
                    let index = $(event.target).attr('data-long-text');
                    $('.modal-form__name').text(reviews[index].name);
                    $('.modal-form__longText').text(reviews[index].long_text);
                    $('.modal-form')
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%', left: '50%'}, 200);
                });
        });
    };

    /**
     * Закрытие модального окна
     */
    let modalClose = () => {
        $('.modal-close, #reviews_overlay.overlay').click(function () {

            $('.modal-form')
                .animate({opacity: 0, top: '35%'}, 200,
                    function () {
                        $(this).css('display', 'none');
                        $('#reviews_overlay.overlay').fadeOut(300);
                    }
                );
        });
    };

    /**
     * Создание HTML элемента из передаваемого объекта
     * @param element
     * @returns HTMLElement
     */
    let create = (element = {}) => {
        if (element instanceof Object
            && element.hasOwnProperty('name')
        ) {
            let elem = document.createElement(element.name);
            if (element.hasOwnProperty('text')) {
                elem.textContent = element.text;
            }
            if (
                'a' === element.name
                && element.hasOwnProperty('link')
            ) {
                elem.setAttribute('href', element.link);
            }
            if (element.hasOwnProperty('style')) {
                elem.style = element.style;
            }
            if (
                'img' === element.name
                && element.hasOwnProperty('src')
                && element.hasOwnProperty('alt')
            ) {
                elem.src = element.src;
            }
            if (element.hasOwnProperty('value')) {
                elem.value = element.value;
            }
            if (element.hasOwnProperty('className')) {
                elem.className = element.className;
            }
            return elem;
        }
        return create({
            name: 'div',
            text: 'Error!',
        });
    };

    /**
     * Создаем и возвращаем reviews__item
     * @param index
     * @param dataJson
     * @returns {HTMLElement}
     */
    let renderEl = (index, dataJson) => {
        let modal_form_name = create({
            name: 'p',
            className: 'modal-form__name',
            text: dataJson.name
        });
        let long_text = create({
            name: 'p',
            className: 'modal-form__longText',
            text: dataJson.long_text
        });
        let reviews__item = create({
            name: 'li',
            className: 'reviews__item'
        });
        let review = create({
            name: 'div',
            className: 'review'
        });
        let review__picture = create({
            name: 'div',
            className: 'review__picture',
            style: 'background-image: url(' + dataJson.pic + ');'
        });
        let review__hover = create({
            name: 'div',
            className: 'review__hover'
        });
        let review__name = create({
            name: 'div',
            className: 'review__name',
            text: dataJson.name
        });
        let review__text = create({
            name: 'span',
            className: 'review__text',
            text: dataJson.short_text
        });
        let button = $(create({
            name: 'button',
            value: 'More',
            className: 'button button_color_black button__more'
        })).attr('data-long-text', index);

        $(review__hover).append(review__name).append(review__text).append(button);
        $(review).append(review__picture).append(review__hover);
        $(reviews__item).append(review);
        return reviews__item;
    };

    /**
     * Заполняем reviews__list из массива объектов
     */
    let render = () => {
        $(reviews).each((index,element) => {
            $('.reviews__list').append(renderEl(index,element));
        });
    };

    render();
    modalOpen();
    modalClose();
});