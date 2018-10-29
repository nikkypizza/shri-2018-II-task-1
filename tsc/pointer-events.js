(function () {
    var cameraNode = document.querySelector(".widget-cam__img");
    var evtCache = [];
    var prevDiff = -1;
    var initTouchScroll = function (node) {
        var currentBackgroundPosition = 0;
        var currentBackgroundZoom = 0;
        var startX = 0;
        var onPointeMove = function (evt) {
            var xDiff = evt.x - startX;
            var newBackgroundPosition = currentBackgroundPosition + xDiff;
            for (var i = 0; i < evtCache.length; i++) {
                if (evt.pointerId === evtCache[i].pointerId) {
                    evtCache[i] = evt;
                    break;
                }
            }
            switch (evtCache.length) {
                case 1:
                    if (newBackgroundPosition > node.offsetWidth) {
                        return; // Ограничение левого края
                    }
                    if (newBackgroundPosition < -node.offsetWidth) {
                        return; // Ограничение правого края
                    }
                    node.style.backgroundPositionX = newBackgroundPosition + "px";
                    break;
                case 2:
                    // Вычисляем расстояние между двумя указателями
                    var doubleTouchDiff = Math.abs(evtCache[0].clientX - evtCache[1].clientX);
                    if (prevDiff > 0) {
                        if (doubleTouchDiff > prevDiff) {
                            // Зум внутрь, если расстояние между указателями увеличилось
                            var newBackgroundZoomIn = currentBackgroundZoom + doubleTouchDiff; // TODO - Ограничить зум внутрь background-size: 850px
                            node.style.backgroundSize = newBackgroundZoomIn + "px";
                        }
                        if (doubleTouchDiff < prevDiff) {
                            // Зум наружу, если расстояние между указателями уменьшилось
                            var newBackgroundZoomOut = currentBackgroundZoom - doubleTouchDiff; // TODO - Ограничить зум наружу background-size: 165px
                            node.style.backgroundSize = newBackgroundZoomOut + "px";
                        }
                    }
                    prevDiff = doubleTouchDiff;
            }
        };
        node.addEventListener("pointerdown", function (evt) {
            startX = evt.x;
            evtCache.push(evt);
        });
        node.addEventListener("pointermove", function (evt) {
            if (evt.pointerType === "touch") {
                onPointeMove(evt);
            }
        });
        node.addEventListener("pointerup", function () {
            currentBackgroundPosition = parseInt(node.style.backgroundPositionX, 10);
            currentBackgroundZoom = parseInt(node.style.backgroundSize, 10);
            evtCache = [];
            if (evtCache.length < 2) {
                prevDiff = -1;
            }
        });
    };
    initTouchScroll(cameraNode);
})();
