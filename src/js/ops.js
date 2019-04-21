//ONE PAGE SCROLL
$(document).ready(() => {

    const sections = $('.section');
    const display = $('.maincontent');
    let inScroll = false;
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

//функция, которая добавляет класс active к item при нажатии на link в sidebar
    let setActiveMenuItem = itemEq => {
        $('.sidebar__item').eq(itemEq).addClass('active') //передаем номер кнопки для навешивания active
            .siblings().removeClass('active'); //удаляем класс active у соседних item
    };

    const performTransition = sectionEq => {
        const position = `${sectionEq * -100}%`;

        if (inScroll) return; //условие выхода из функции, код ниже return не выполняется
        inScroll = true;

        sections
            .eq(sectionEq)
            .addClass('active')
            .siblings()
            .removeClass('active');

        display.css({
            transform: `translate(0, ${position})`,
            '-webkit-transform': `translate(0, ${position})`
        });

        setTimeout(() => {
            inScroll = false;
            setActiveMenuItem(sectionEq)
        }, 1150);
        //номер точки(кнопки) совпадает с номером секции. загорится активная кнопка в sidebar
        //продолжительность анимации +150ms, потому что закончится инерция
    };


    const scrollToSection = direction => {
        const activeSection = sections.filter('.active');
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        if (direction === 'up' && prevSection.length) { //проверка на существование секции через lenght
            performTransition(prevSection.index());
        }

        if (direction === 'down' && nextSection.length) {
            performTransition(nextSection.index());
        }
    };

    $(document).on({ //когда навешиваем несколько событий, код записываем в {} - как объект
        wheel: e => { //'function(e){}' === 'e =>{}'
            //стрелочная функция (ES6) передает в this родительский контекст
            const deltaY = e.originalEvent.deltaY;
            const direction = deltaY > 0
                ? 'down' //если больше 0, то down
                : 'up'; //иначе (если меньше 0), то up

            scrollToSection(direction);
        },
        keydown: e => {
            switch (e.keyCode) {
                // console.log(e.keyCode); //способ отследить код кнопки
                //кнопка вниз - 40
                case 40:
                    scrollToSection('down');
                    break;
                //кнопка вверх - 38
                case 38:
                    scrollToSection('up');
                    break;
            }
        },
        touchmove: e => e.preventDefault()

        //touchstart touchend touchmove
    });
    $('[data-scroll-to]').on('click', e => {
        e.preventDefault();
        //берем текущий элемент и приписываем ему значение атрибута
        const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
        //применяем функцию к цели
        //так как ф-ция принимает (ожидает) число, нужно преобразовать string в number с помощью parseInt
        performTransition(target);
    });

    if (isMobile) {
        $(document).swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                /**
                 * плагин возвращает фактическое движение пальца,
                 * а функция от нас ждёт направление движения страницы
                 */
                 //если в direction вернется down, то записываем up и наоборот
                const scrollDirection = direction === 'down' ? 'up' : 'down';
                scrollToSection(scrollDirection);
            }
        });
    }
});


