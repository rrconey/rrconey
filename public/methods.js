console.log('i work!')


var audio = document.getElementsByTagName("audio")[0];


$("#click").mouseenter(function() {
  audio.play();
});