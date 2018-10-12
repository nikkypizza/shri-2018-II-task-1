const ESC_KEYCODE = 27;
const camerasListItemNodes = document.querySelectorAll(`.cameras__list-item`);
const videoNodes = document.querySelectorAll(`.cameras__list-item-video`);

for (el of videoNodes) {
  el.addEventListener(`click`, (evt) => {
    const videoNode = evt.target;
    const cameraListItem = videoNode.parentNode;
    const videoControlsNode = cameraListItem.querySelector(`.video-controls`);
    const showAllBtn = cameraListItem.querySelector(`.video-controls__return-btn`);

    videoControlsNode.style = ``;
    videoNode.style = ``;

    // Прячем неактивные видео списка
    cameraListItem.classList.add(`cameras__list-item--active`);
    for (elem of camerasListItemNodes) {
      if (!elem.classList.contains(`cameras__list-item--active`)) {
        elem.classList.add(`visually-hidden`);
      };
    };

    // Добавляем контролы <video>, показываем меню
    cameraListItem.style.webkitAnimationName = `videoItemOpenAnim`
    cameraListItem.style.animationPlayState = `running`;
    videoNode.setAttribute(`controls`, `null`);
    videoNode.removeAttribute(`muted`, `null`);

    videoControlsNode.classList.remove(`visually-hidden`);
    videoControlsNode.style.animationPlayState = `running`;


    const onModalClose = () => {
      cameraListItem.style = ``;
      videoControlsNode.style = ``;

      // Убираем контролы <video>, прячем меню
      cameraListItem.style.webkitAnimationName = `videoItemCloseAnim`;
      cameraListItem.style.animationPlayState = `running`;
      videoNode.removeAttribute(`controls`, `null`);
      videoNode.setAttribute(`muted`, `null`);

      videoControlsNode.style.webkitAnimationName = `videoControlsCloseAnim`;
      videoControlsNode.classList.add(`visually-hidden`);

      // Показываем неактивные видео списка
      for (elem of camerasListItemNodes) {
        if (!elem.classList.contains(`cameras__list-item--active`)) {
          elem.classList.remove(`visually-hidden`);
        };
      };
      cameraListItem.classList.remove(`cameras__list-item--active`);
    };

    showAllBtn.addEventListener(`click`, onModalClose);

    window.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        onModalClose();
      }
    });
  });
};
