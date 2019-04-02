// АККОРДЕОН Вертикальный
(function () {
    const teamAccoList = document.querySelector('.team-acco__list');
    teamAccoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('team-acco__trigger')) {
            const _this = event.target;
            const item = _this.parentNode;
            const list = item.parentNode;
            const items = list.children;
            const content = _this.nextElementSibling;
            const contentHeight = content.firstElementChild.clientHeight;
            event.preventDefault();

            if (!item.classList.contains('team-acco__item--active')) {
                for (let i = 0; i < items.length; i++) {
                    items[i].classList.remove('team-acco__item--active');
                    items[i].lastElementChild.style.height = 0;
                }
                item.classList.add('team-acco__item--active');
                content.style.height = contentHeight + 'px';
            } else {
                item.classList.remove('team-acco__item--active');
                content.style.height = 0;
            }
        }
    });
})();