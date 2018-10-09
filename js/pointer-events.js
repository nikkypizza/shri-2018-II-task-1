  const cameraNode = document.querySelector(`.widget-cam__img`);
  let currentBackgroundPosition = 0;
  let startX = 0;

  const initTouchScroll = (node) => {
    const onPointeMove = (evt) => {
      let xDiff = evt.x - startX;
      node.style.backgroundPositionX = `${currentBackgroundPosition + xDiff}px`;
    };

    node.addEventListener(`pointerdown`, (evt) => {
      startX = evt.x
    });

    node.addEventListener(`pointermove`, (evt) => {
      if (evt.pointerType === `touch`) {
        onPointeMove(evt);
      }
    });

    node.addEventListener(`pointerup`, (evt) => {
      currentBackgroundPosition = parseInt(node.style.backgroundPositionX);
    });
  }

  initTouchScroll(cameraNode);
