import initStreams from "./modules/surveillance/init-streams.js";
import initCanvasVolumeGraph from "./modules/surveillance/init-canvas-volume-graph.js";
import { keyCodes, initialFilterValues } from "./modules/surveillance/constants.js";

const videoNodes = (document.querySelectorAll(`.cameras__list-item-video`) as unknown as Array<HTMLVideoElement>); //?
const camerasListItemNodes = (document.querySelectorAll(`.cameras__list-item`) as unknown as Array<HTMLLinkElement>); //?
const camerasHeaderNode = <HTMLHeadingElement>document.querySelector(`.cameras__header`);
const CAMERAS_HEADER_NODE_TITLE: string = camerasHeaderNode.innerHTML;

let brightnessValue = initialFilterValues.BRIGHTNESS;
let contrastValue = initialFilterValues.CONTRAST;
let videoClickCounter = 0;

for (let el of videoNodes) {
  el.addEventListener(`click`, (evt) => {

    videoClickCounter++;
    if (videoClickCounter > 1) {
      return;
    }

    const videoNode = <HTMLVideoElement>evt.target;
    const cameraListItem = <HTMLLinkElement>videoNode.parentNode;
    const videoControlsNode = <HTMLDivElement>cameraListItem.querySelector(`.video-controls`);
    const showAllBtn = <HTMLButtonElement>cameraListItem.querySelector(`.video-controls__return-btn`);
    const videoInputNodes = (cameraListItem.querySelectorAll(`.video-controls__input`) as unknown as Array<HTMLInputElement>); //?

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
      const inputId = <string>element.getAttribute(`id`);

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
  });
}

initStreams(videoNodes);
for (let videoEl of videoNodes) {
  const currentElCanvas = <HTMLCanvasElement>(videoEl.parentNode as HTMLDivElement).querySelector(`.video-controls__sound-level`);
  initCanvasVolumeGraph(videoEl, currentElCanvas);
}
