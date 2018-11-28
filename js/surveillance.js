import initStreams from "./modules/surveillance/init-streams.js";
import initCanvasVolumeGraph from "./modules/surveillance/init-canvas-volume-graph.js";
import {keyCodes, initialFilterValues} from "./modules/surveillance/constants.js";
const videoNodes = document.querySelectorAll(`.cameras__list-item-video`); // ?
const camerasListItemNodes = document.querySelectorAll(`.cameras__list-item`); // ?
const camerasHeaderNode = document.querySelector(`.cameras__header`);
const CAMERAS_HEADER_NODE_TITLE = camerasHeaderNode.innerHTML;
let brightnessValue = initialFilterValues.BRIGHTNESS;
let contrastValue = initialFilterValues.CONTRAST;
let videoClickCounter = 0;
for (let el of videoNodes) {
  const onVideoNodeClick = (evt) => {
    videoClickCounter++;
    if (videoClickCounter > 1) {
      return;
    }
    const videoNode = evt.target;
    const cameraListItem = videoNode.parentNode;
    const videoControlsNode = cameraListItem.querySelector(`.video-controls`);
    const showAllBtn = cameraListItem.querySelector(`.video-controls__return-btn`);
    const videoInputNodes = cameraListItem.querySelectorAll(`.video-controls__input`); // ?
    videoControlsNode.removeAttribute(`style`);
    camerasHeaderNode.textContent = el.title;
    // Прячем неактивные видео списка
    cameraListItem.classList.add(`cameras__list-item--active`);
    for (let elem of camerasListItemNodes) {
      if (!elem.classList.contains(`cameras__list-item--active`)) {
        elem.style.display = `none`;
      }
    }
    // Добавляем контролы <video>, показываем меню
    cameraListItem.style.position = `absolute`;
    cameraListItem.style.left = `10vw`;
    cameraListItem.style.width = `80vw`;
    videoNode.setAttribute(`controls`, ``);
    videoNode.muted = false;
    videoControlsNode.style.display = `flex`;
    videoControlsNode.style.opacity = `1`;
    // CSS фильтры
    videoInputNodes.forEach((element) => {
      const inputId = element.getAttribute(`id`);
      element.addEventListener(`input`, () => {
        if (inputId.startsWith(`brightness`)) {
          brightnessValue = parseFloat(element.value) / 100;
        }
        if (inputId.startsWith(`contrast`)) {
          contrastValue = parseFloat(element.value);
        }
        videoNode.style.filter = `brightness(${brightnessValue}) contrast(${contrastValue}%)`;
      });
    });
    const onModalClose = () => {
      cameraListItem.removeAttribute(`style`);
      videoControlsNode.removeAttribute(`style`);
      videoClickCounter = 0;
      brightnessValue = initialFilterValues.BRIGHTNESS;
      contrastValue = initialFilterValues.CONTRAST;
      camerasHeaderNode.textContent = CAMERAS_HEADER_NODE_TITLE;
      videoNode.removeAttribute(`controls`);
      videoNode.muted = true;
      // Показываем неактивные видео списка
      for (let elem of camerasListItemNodes) {
        if (!elem.classList.contains(`cameras__list-item--active`)) {
          elem.style.display = ``;
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
  };
  el.addEventListener(`click`, onVideoNodeClick);
  el.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === keyCodes.SPACE || evt.keyCode === keyCodes.ENTER) {
      onVideoNodeClick(evt);
    }
  });
}
initStreams(videoNodes);
for (let videoEl of videoNodes) {
  const currentElCanvas = videoEl.parentNode.querySelector(`.video-controls__sound-level`);
  initCanvasVolumeGraph(videoEl, currentElCanvas);
}
