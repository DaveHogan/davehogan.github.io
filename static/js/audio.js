document.addEventListener('DOMContentLoaded', function () {
  var players = document.querySelectorAll('audio.audio-player');
  players.forEach(function (current) {
    current.addEventListener('play', function () {
      players.forEach(function (other) {
        if (other !== current) other.pause();
      });
    });
  });
});
