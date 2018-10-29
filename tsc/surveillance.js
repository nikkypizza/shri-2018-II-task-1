"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_streams_js_1 = __importDefault(require("./modules/surveillance/init-streams.js"));
var init_canvas_volume_graph_js_1 = __importDefault(require("./modules/surveillance/init-canvas-volume-graph.js"));
var constants_js_1 = require("./modules/surveillance/constants.js");
var videoNodes = document.querySelectorAll(".cameras__list-item-video");
var camerasListItemNodes = document.querySelectorAll(".cameras__list-item");
var camerasHeaderNode = document.querySelector(".cameras__header");
var CAMERAS_HEADER_NODE_TITLE = camerasHeaderNode.innerHTML;
var brightnessValue = constants_js_1.initialFilterValues.BRIGHTNESS;
var contrastValue = constants_js_1.initialFilterValues.CONTRAST;
var videoClickCounter = 0;
var _loop_1 = function (el) {
    el.addEventListener("click", function (evt) {
        videoClickCounter++;
        if (videoClickCounter > 1) {
            return;
        }
        var videoNode = evt.target;
        var cameraListItem = videoNode.parentNode;
        var videoControlsNode = cameraListItem.querySelector(".video-controls");
        var showAllBtn = cameraListItem.querySelector(".video-controls__return-btn");
        var videoInputNodes = cameraListItem.querySelectorAll(".video-controls__input");
        videoControlsNode.style = "";
        camerasHeaderNode.textContent = el.title;
        // Прячем неактивные видео списка
        cameraListItem.classList.add("cameras__list-item--active");
        for (var _i = 0, camerasListItemNodes_1 = camerasListItemNodes; _i < camerasListItemNodes_1.length; _i++) {
            var elem = camerasListItemNodes_1[_i];
            if (!elem.classList.contains("cameras__list-item--active")) {
                elem.style.display = "none";
            }
        }
        // Добавляем контролы <video>, показываем меню
        cameraListItem.style.position = "absolute";
        cameraListItem.style.left = "10vw";
        cameraListItem.style.width = "80vw";
        videoNode.setAttribute("controls", "");
        videoNode.muted = false;
        videoControlsNode.style.display = "flex";
        videoControlsNode.style.opacity = 1;
        // CSS фильтры
        videoInputNodes.forEach(function (element) {
            var inputId = element.getAttribute("id");
            element.addEventListener("input", function () {
                if (inputId.startsWith("brightness")) {
                    brightnessValue = element.value / 100;
                }
                if (inputId.startsWith("contrast")) {
                    contrastValue = element.value;
                }
                videoNode.style.filter = "brightness(" + brightnessValue + ") contrast(" + contrastValue + "%)";
            });
        });
        var onModalClose = function () {
            cameraListItem.style = "";
            videoControlsNode.style = "";
            videoClickCounter = 0;
            brightnessValue = constants_js_1.initialFilterValues.BRIGHTNESS;
            contrastValue = constants_js_1.initialFilterValues.CONTRAST;
            camerasHeaderNode.textContent = CAMERAS_HEADER_NODE_TITLE;
            videoNode.removeAttribute("controls");
            videoNode.muted = true;
            // Показываем неактивные видео списка
            for (var _i = 0, camerasListItemNodes_2 = camerasListItemNodes; _i < camerasListItemNodes_2.length; _i++) {
                var elem = camerasListItemNodes_2[_i];
                if (!elem.classList.contains("cameras__list-item--active")) {
                    elem.style.display = "";
                }
            }
            cameraListItem.classList.remove("cameras__list-item--active");
        };
        showAllBtn.addEventListener("click", onModalClose);
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === constants_js_1.keyCodes.ESC) {
                if (document.querySelector(".cameras__list-item--active")) {
                    onModalClose();
                }
            }
        });
    });
};
for (var _i = 0, videoNodes_1 = videoNodes; _i < videoNodes_1.length; _i++) {
    var el = videoNodes_1[_i];
    _loop_1(el);
}
init_streams_js_1.default(videoNodes);
for (var _a = 0, videoNodes_2 = videoNodes; _a < videoNodes_2.length; _a++) {
    var videoEl = videoNodes_2[_a];
    var currentElCanvas = videoEl.parentNode.querySelector(".video-controls__sound-level");
    init_canvas_volume_graph_js_1.default(videoEl, currentElCanvas);
}
