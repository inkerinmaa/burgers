// ПОЛНОЭКРАННОЕ МЕНЮ

$(document).ready(function () {
    const fullPageNav = document.querySelector('#navTab');
    const maxTop = 0;
    const stepNav = 100;

    let currentTop = -100;


    $('#openMenu').on('click', function () {
        if (currentTop < maxTop) {
            currentTop += stepNav;
            fullPageNav.style.top = currentTop + '%';
        }
    });

    $('#hide').on('click', function () {
        if (currentTop >= maxTop) {
            currentTop -= stepNav;
            fullPageNav.style.top = currentTop + '%';
        }
    });

});