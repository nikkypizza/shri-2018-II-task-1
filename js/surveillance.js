(function() {

  const keyCodes = {
    ESC: 27,
    ENTER: 13
  }
  const initialValues = {
    BRIGHTNESS_INITIAL_VALUE: 1,
    CONTRAST_INITIAL_VALUE: 100,
    CLICK_COUNTER_INITIAL: 0
  }
  const camerasListItemNodes = document.querySelectorAll(`.cameras__list-item`);
  const videoNodes = document.querySelectorAll(`.cameras__list-item-video`);
  const canvasNodes = document.querySelectorAll(`.video-controls__sound-level`);
  let videoClickCounter = initialValues.CLICK_COUNTER_INITIAL;
  let brightnessValue = initialValues.BRIGHTNESS_INITIAL_VALUE;
  let contrastValue = initialValues.CONTRAST_INITIAL_VALUE;

  let audioCtx = window.AudioContext || window.webkitAudioContext;
  let canvas, audioContext, canvasContext, analyser, width, height, dataArray, bufferLength;

  for (el of videoNodes) {
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
      videoNode.setAttribute(`controls`, ``);
      videoNode.muted = false;

      videoControlsNode.classList.remove(`visually-hidden`);
      videoControlsNode.style.animationPlayState = `running`;

      //CSS фильтры
      videoInputNodes.forEach((el) => {
        const inputId = el.getAttribute(`id`);

        el.addEventListener(`input`, () => {
          if (inputId.startsWith(`brightness`)) {
            brightnessValue = el.value / 100;
          };
          if (inputId.startsWith(`contrast`)) {
            contrastValue = el.value;
          };
          videoNode.style.filter = `brightness(${brightnessValue}) contrast(${contrastValue}%)`;
        })
      });

      // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
      audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
      });

      const onModalClose = () => {
        cameraListItem.style = ``;
        videoControlsNode.style = ``;
        videoClickCounter = initialValues.CLICK_COUNTER_INITIAL;
        brightnessValue = initialValues.BRIGHTNESS_INITIAL_VALUE;
        contrastValue = initialValues.CONTRAST_INITIAL_VALUE;

        // Убираем контролы <video>, прячем меню
        cameraListItem.style.webkitAnimationName = `videoItemCloseAnim`;
        cameraListItem.style.animationPlayState = `running`;
        videoNode.removeAttribute(`controls`);
        videoNode.muted = true;

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
        if (evt.keyCode === keyCodes.ESC) {
          if (document.querySelector(`.cameras__list-item--active`)) {
            onModalClose();
          }
        };
      });
    });

    el.addEventListener(`keyup`, (evt) => {
      if (evt.keyCode === keyCodes.ENTER) {
        console.log(`Развернуть модельное окно по нажатию на ENTER`);
      };
    })
  };

  const initStreams = (videosArr) => {
    const videoUrlTitles = [`cat`, `sosed`, `dog`, `hall`];

    const initVideo = (video, url) => {
      video.dataset.source = url;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        video.play();
      };
    };

    videosArr.forEach(function(el, index) {
      initVideo(el, `http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2F${videoUrlTitles[index]}%2Fmaster.m3u8`);
    });
  };

  const buildAudioGraph = () => {
    var mediaElement = videoNodes[0];
    var sourceNode = audioContext.createMediaElementSource(mediaElement);

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  };

  const visualizeVolumeLevel = () => {
    requestAnimationFrame(visualizeVolumeLevel);

    analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = `rgb(0, 0, 0)`;
    canvasContext.clearRect(0, 0, width, height);
    let barWidth = (width / bufferLength) * 2;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 6;

      canvasContext.fillStyle = `rgb(${barHeight * 5}, 100, 100)`;
      canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    };
  };

  // --- //

  initStreams(videoNodes);

  window.onload = function() {
    audioContext = new audioCtx();

    canvas = canvasNodes[0];
    width = canvas.width;
    height = canvas.height;
    canvasContext = canvas.getContext(`2d`);

    buildAudioGraph();

    requestAnimationFrame(visualizeVolumeLevel);
  };
})();
