(function() {
  var menuButton = document.querySelector(`.page-header__menu-toggler`);
  var navList = document.querySelector(`.page-header__nav-list`);

  // Закрывает меню по умолчанию, меняет img кнопки
  menuButton.style.backgroundImage = `url("img/svg/icon-menu-open.svg")`;
  menuButton.title = `Открыть меню`;
  navList.classList.add(`display-none`);
  //-------------------------

  menuButton.addEventListener(`click`, () => {
    if (menuButton.title === `Открыть меню`) {
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-open.svg")`;
      menuButton.title = `Закрыть меню`;
      navList.classList.remove(`display-none`);
    } else {
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-closed.svg")`;
      navList.classList.add(`display-none`);
      menuButton.title = `Открыть меню`;
    };
  });

  if (matchMedia) {
    var mq = window.matchMedia(`(min-width: 768px)`);
    mq.addListener(WidthChange);
    WidthChange(mq);
  };

  // при изменении значения вьюпорта
  function WidthChange(mq) {
    if (mq.matches) {
      // при ширине вьюпорта >= 768px
      navList.classList.add(`display-none`);
      menuButton.classList.add(`display-none`);
    } else {
      // при ширине вьюпорта меньше 768px
      menuButton.title = `Открыть меню`;
      menuButton.classList.remove(`display-none`);
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-closed.svg")`;
    }
  }
})()
