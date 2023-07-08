import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const vimeoPlayerRef = document.querySelector('#vimeo-player');
const player = new Player(vimeoPlayerRef);
const lastProgresTime =
  JSON.parse(localStorage.getItem('videoplayer-current-time')) || 0;

player.on('timeupdate', throttle(onPlay, 1500));

function onPlay(data) {
  console.log(data);
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

player.setCurrentTime(lastProgresTime);
