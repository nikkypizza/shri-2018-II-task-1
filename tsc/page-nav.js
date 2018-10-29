(function () {
    var menuButton = document.querySelector(".page-header__menu-toggler");
    var navList = document.querySelector(".page-header__nav-list");
    // Закрывает меню по умолчанию, меняет img кнопки
    menuButton.style.backgroundImage = "url(\"img/svg/icon-menu-open.svg\")";
    menuButton.title = "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E";
    navList.style.display = "none";
    // -------------------------
    menuButton.addEventListener("click", function () {
        if (menuButton.title === "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E") {
            menuButton.style.backgroundImage = "url(\"img/svg/icon-menu-open.svg\")";
            menuButton.title = "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E";
            navList.style.display = "";
        }
        else {
            menuButton.style.backgroundImage = "url(\"img/svg/icon-menu-closed.svg\")";
            navList.style.display = "none";
            menuButton.title = "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E";
        }
    });
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(widthChange);
        widthChange(mq);
    }
    // при изменении значения вьюпорта
    function widthChange(mq) {
        if (mq.matches) {
            // при ширине вьюпорта >= 768px
            navList.style.display = "";
            menuButton.style.display = "none";
        }
        else {
            // при ширине вьюпорта меньше 768px
            navList.style.display = "none";
            menuButton.title = "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E";
            menuButton.style.display = "";
            menuButton.style.backgroundImage = "url(\"img/svg/icon-menu-closed.svg\")";
        }
    }
})();
