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