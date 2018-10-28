(function() {
  const menuButton = document.querySelector(`.page-header__menu-toggler`);
  const navList = document.querySelector(`.page-header__nav-list`);

  // Закрывает меню по умолчанию, меняет img кнопки
  menuButton.style.backgroundImage = `url("img/svg/icon-menu-open.svg")`;
  menuButton.title = `Открыть меню`;
  navList.style.display = `none`;
  // -------------------------

  menuButton.addEventListener(`click`, () => {
    if (menuButton.title === `Открыть меню`) {
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-open.svg")`;
      menuButton.title = `Закрыть меню`;
      navList.style.display = ``;
    } else {
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-closed.svg")`;
      navList.style.display = `none`;
      menuButton.title = `Открыть меню`;
    }
  });

  if (matchMedia) {
    let mq = window.matchMedia(`(min-width: 768px)`);
    mq.addListener(widthChange);
    widthChange(mq);
  }

  // при изменении значения вьюпорта
  function widthChange(mq) {
    if (mq.matches) {
      // при ширине вьюпорта >= 768px
      navList.style.display = ``;
      menuButton.style.display = `none`;
    } else {
      // при ширине вьюпорта меньше 768px
      navList.style.display = `none`;
      menuButton.title = `Открыть меню`;
      menuButton.style.display = ``;
      menuButton.style.backgroundImage = `url("img/svg/icon-menu-closed.svg")`;
    }
  }
})();
