$(document).ready(() => {

    /**
     * Отправка формы
     * @param event
     */
    let submitForm = (event) => {
        let form = $(event.target); // target - это сама форма с её id
        let response = ajaxForm(form); // в переменной response записываем результат обращения к серверу
        event.preventDefault();

        response.done((msg) => { //получаем объект msg, из него можно вытащить два параметра: сам msg и status
            let mes = msg.mes;
            let status = msg.status;
            let response_text = $('.order-modal__form > .order-modal__text');
            if (status === 'OK') {
                response_text.text(mes).addClass('success');
            } else {
                response_text.text(mes).addClass('error');
            }
            delModalOpen();
            delModalClose();
        });

        response.fail((jqXHR, textStatus) => {
            alert("Request failed " + textStatus);
        });
    };

// Универсальная функция для работы с формами
    let ajaxForm = (form) => {
        let data = form.serialize();
        let url = form.attr('action');

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'JSON',
            data: data
        });
    };
    /**
     * Открытие модального окна
     */
    let delModalOpen = () => {
        $('#delivery_overlay.overlay')
            .fadeIn(300, () => {
                $('.order-modal__form').fadeIn("slow");
            });
    };
    /**
     * Закрытие модального окна
     */
    let delModalClose = () => {
        $('#delivery_close.order-modal__close').on('click', () => {
            $('.order-modal__form')
                .fadeOut(200, () => {
                        $('#delivery_overlay.overlay').fadeOut(300);
                    }
                );
        });
    };

    /**
     * Функция обратного вызова
     * @param event
     */
    let validator = (event) => {
        let input = $(event.target); // Получаем input
        let attr = input.attr('pattern'); // Берём pattern (шаблон) из input
        let pattern = new RegExp(attr); // Получаем регулярное выражение (объект RegExp) для шаблона
        let value = input.val(); // Получаем значение из input

        if (!pattern.test(value)) { // Если значение не проходит тест на pattern
            /* То удаляем последний введённый символ */
            let string = value.substring(0, value.length - 1);
            /* И вставляем строку в input */
            input.val(string);
        }
    };

    $('#order-form').on('submit', submitForm);
    $('#user-name').on('input', validator);
    $('#phone-number').inputmask("+7 (999) 999-99-99");
});