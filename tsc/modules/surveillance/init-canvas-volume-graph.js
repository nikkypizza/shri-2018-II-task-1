"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initCanvasVolumeGraph(element, elementCanvas) {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioCtx();
    var canvas = elementCanvas;
    var canvasCtx = canvas.getContext("2d");
    var analyser = null;
    var dataArray = null;
    var bufferLength = null;
    var buildAudioGraph = function () {
        var sourceNode = audioContext.createMediaElementSource(element);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);
    };
    var visualizeVolumeLevel = function () {
        var barWidth = (canvas.width / bufferLength) * 2;
        var canvasX = 0;
        requestAnimationFrame(visualizeVolumeLevel);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < bufferLength; i++) {
            var barHeight = dataArray[i] / 6;
            canvasCtx.fillStyle = "rgb(" + barHeight * 5 + ", 50, 150)";
            canvasCtx.fillRect(canvasX, canvas.height - barHeight / 2, barWidth, barHeight);
            canvasX += barWidth + 1;
        }
    };
    buildAudioGraph(element);
    requestAnimationFrame(visualizeVolumeLevel);
}
exports.default = initCanvasVolumeGraph;
