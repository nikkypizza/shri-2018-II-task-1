(function() {

  const cameraNode = document.querySelector(`.widget-cam__img`);
  var evtCache = [];
  var prevDiff = -1;

  const initTouchScroll = (node) => {
    let currentBackgroundPosition = 0;
    let currentBackgroundZoom = 0;
    let startX = 0;

    const onPointeMove = (evt) => {
      let xDiff = evt.x - startX;
      let newBackgroundPosition = currentBackgroundPosition + xDiff;
      for (var i = 0; i < evtCache.length; i++) {
        if (evt.pointerId == evtCache[i].pointerId) {
          evtCache[i] = evt;
          break;
        };
      };

      switch (evtCache.length) {
        case 1:
          if (newBackgroundPosition > node.offsetWidth) {
            return; // Ограничение левого края
          };
          if (newBackgroundPosition < -node.offsetWidth) {
            return; // Ограничение правого края
          };
          node.style.backgroundPositionX = `${newBackgroundPosition}px`;
          break;

        case 2:
          // Вычисляем расстояние между двумя указателями
          let doubleTouchDiff = Math.abs(evtCache[0].clientX - evtCache[1].clientX);

          if (prevDiff > 0) {
            if (doubleTouchDiff > prevDiff) {
              // Зум внутрь, если расстояние между указателями увеличилось
              let newBackgroundZoomIn = currentBackgroundZoom + doubleTouchDiff; //TODO - Ограничить зум внутрь background-size: 850px
              node.style.backgroundSize = `${newBackgroundZoomIn}px`;
            };
            if (doubleTouchDiff < prevDiff) {
              // Зум наружу, если расстояние между указателями уменьшилось
              let newBackgroundZoomOut = currentBackgroundZoom - doubleTouchDiff; //TODO - Ограничить зум наружу background-size: 165px
              node.style.backgroundSize = `${newBackgroundZoomOut}px`;
            };
          };
          prevDiff = doubleTouchDiff;
      };
    };

    node.addEventListener(`pointerdown`, (evt) => {
      startX = evt.x;
      evtCache.push(evt);
    });

    node.addEventListener(`pointermove`, (evt) => {
      if (evt.pointerType === `touch`) {
        onPointeMove(evt);
      }
    });

    node.addEventListener(`pointerup`, (evt) => {
      currentBackgroundPosition = parseInt(node.style.backgroundPositionX);
      currentBackgroundZoom = parseInt(node.style.backgroundSize);
      evtCache = [];
      if (evtCache.length < 2) {
        prevDiff = -1
      };
    });
  };

  initTouchScroll(cameraNode);

})();
