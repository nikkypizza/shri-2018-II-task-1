import initStreams from "./modules/surveillance/init-streams.js";
import initCanvasVolumeGraph from "./modules/surveillance/init-canvas-volume-graph.js";
import {keyCodes, initialFilterValues} from "./modules/surveillance/constants.js";

const videoNodes = document.querySelectorAll(`.cameras__list-item-video`);
const camerasListItemNodes = document.querySelectorAll(`.cameras__list-item`);
const camerasHeaderNode = document.querySelector(`.cameras__header`);
const CAMERAS_HEADER_NODE_TITLE = camerasHeaderNode.innerHTML;

let brightnessValue = initialFilterValues.BRIGHTNESS;
let contrastValue = initialFilterValues.CONTRAST;
let videoClickCounter = 0;

for (let el of videoNodes) {
  el.addEventListener(`click`, (evt) => {

    videoClickCounter++;
    if (videoClickCounter > 1) {
      return;
    }

    const videoNode = evt.target;
    const cameraListItem = videoNode.parentNode;
    const videoControlsNode = cameraListItem.querySelector(`.video-controls`);
    const showAllBtn = cameraListItem.querySelector(`.video-controls__return-btn`);
    const videoInputNodes = cameraListItem.querySelectorAll(`.video-controls__input`);

    videoControlsNode.style = ``;
    camerasHeaderNode.textContent = el.title;

    // Прячем неактивные видео списка
    cameraListItem.classList.add(`cameras__list-item--active`);
    for (let elem of camerasListItemNodes) {
      if (!elem.classList.contains(`cameras__list-item--active`)) {
        elem.classList.add(`visually-hidden`);
      }
    }

    // Добавляем контролы <video>, показываем меню
    cameraListItem.style.webkitAnimationName = `videoItemOpenAnim`;
    cameraListItem.style.animationPlayState = `running`;
    videoNode.setAttribute(`controls`, ``);
    videoNode.muted = false;

    videoControlsNode.classList.remove(`visually-hidden`);
    videoControlsNode.style.animationPlayState = `running`;

    // CSS фильтры
    videoInputNodes.forEach((element) => {
      const inputId = element.getAttribute(`id`);

      element.addEventListener(`input`, () => {
        if (inputId.startsWith(`brightness`)) {
          brightnessValue = element.value / 100;
        }
        if (inputId.startsWith(`contrast`)) {
          contrastValue = element.value;
        }
        videoNode.style.filter = `brightness(${brightnessValue}) contrast(${contrastValue}%)`;
      });
    });

    const onModalClose = () => {
      cameraListItem.style = ``;
      videoControlsNode.style = ``;
      videoClickCounter = 0;
      brightnessValue = initialFilterValues.BRIGHTNESS;
      contrastValue = initialFilterValues.CONTRAST;
      camerasHeaderNode.textContent = CAMERAS_HEADER_NODE_TITLE;

      // Убираем контролы <video>, прячем меню
      cameraListItem.style.webkitAnimationName = `videoItemCloseAnim`;
      cameraListItem.style.animationPlayState = `running`;
      videoNode.removeAttribute(`controls`);
      videoNode.muted = true;

      videoControlsNode.style.webkitAnimationName = `videoControlsCloseAnim`;
      videoControlsNode.classList.add(`visually-hidden`);

      // Показываем неактивные видео списка
      for (let elem of camerasListItemNodes) {
        if (!elem.classList.contains(`cameras__list-item--active`)) {
          elem.classList.remove(`visually-hidden`);
        }
      }
      cameraListItem.classList.remove(`cameras__list-item--active`);
    };

    showAllBtn.addEventListener(`click`, onModalClose);

    window.addEventListener(`keydown`, (e) => {
      if (e.keyCode === keyCodes.ESC) {
        if (document.querySelector(`.cameras__list-item--active`)) {
          onModalClose();
        }
      }
    });
  });

  el.addEventListener(`keyup`, (evt) => {
    if (evt.keyCode === keyCodes.ENTER) {
      // Развернуть модельное окно по нажатию на ENTER;
    }
  });
}

// -- //
initStreams(videoNodes);
for (let videoEl of videoNodes) {
  const currentElCanvas = videoEl.parentNode.querySelector(`canvas`);
  initCanvasVolumeGraph(videoEl, currentElCanvas);
}
