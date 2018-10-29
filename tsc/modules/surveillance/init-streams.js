"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var videoUrlTitles = ["cat", "sosed", "dog", "hall"];
var initVideo = function (video, url) {
    var hls = new Hls();
    video.dataset.source = url;
    hls.loadSource(url);
    hls.attachMedia(video);
    video.muted = true;
    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    var playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(function () {
            console.info(video.title + " \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442");
        }).catch(function (err) {
            console.warn("\u0421 \u0432\u043E\u0441\u043F\u0440\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435\u043C \u0432\u0438\u0434\u0435\u043E \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0438 \u043D\u0435\u043F\u043E\u043B\u0430\u0434\u043A\u0438: " + err);
        });
    }
};
function initStreams(videosArr) {
    videosArr.forEach(function (el, index) {
        initVideo(el, "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2F" + videoUrlTitles[index] + "%2Fmaster.m3u8");
        el.title = "\u041A\u0430\u043C\u0435\u0440\u0430 \u0432\u0438\u0434\u0435\u043E\u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u044F: " + videoUrlTitles[index];
    });
}
exports.default = initStreams;
