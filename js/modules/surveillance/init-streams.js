const videoUrlTitles = [`cat`, `sosed`, `dog`, `hall`];

const initVideo = (video, url) => {
  const hls = new Hls();
  video.dataset.source = url;
  hls.loadSource(url);
  hls.attachMedia(video);
  video.muted = true;

  // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.info(`${video.title} работает`);
    }).catch((err) => {
      console.warn(`С воспрозведением видео возникли неполадки: ${err}`);
    });
  }
};

export default function initStreams(videosArr) {
  videosArr.forEach((el, index) => {
    initVideo(el, `http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2F${videoUrlTitles[index]}%2Fmaster.m3u8`);
    el.title = `Камера видеонаблюдения: ${videoUrlTitles[index]}`;
  });
}
