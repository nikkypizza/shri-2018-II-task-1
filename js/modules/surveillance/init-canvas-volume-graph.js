export default function initCanvasVolumeGraph(element, elementCanvas) {
  const audioContext = new AudioContext();
  const canvas = elementCanvas;
  const canvasCtx = canvas.getContext(`2d`);
  let analyser;
  let dataArray;
  let bufferLength;
  const buildAudioGraph = () => {
    let sourceNode = audioContext.createMediaElementSource(element);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  };
  const visualizeVolumeLevel = () => {
    let barWidth = (canvas.width / bufferLength) * 2;
    let canvasX = 0;
    requestAnimationFrame(visualizeVolumeLevel);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = `rgb(0, 0, 0)`;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i] / 6;
      canvasCtx.fillStyle = `rgb(${barHeight * 5}, 50, 150)`;
      canvasCtx.fillRect(canvasX, canvas.height - barHeight / 2, barWidth, barHeight);
      canvasX += barWidth + 1;
    }
  };
  buildAudioGraph();
  requestAnimationFrame(visualizeVolumeLevel);
}
