// Remodel page slider initializer (vanilla)
(function(){
  var images = ['./img/remodel1-w768.jpg','./img/remodel2-w768.jpg','./img/remodel3-w768.jpg','./img/remodel4-w768.jpg','./img/remodel5-w768.jpg','./img/remodel6-w768.jpg','./img/remodel7-w768.jpg','./img/remodel8-w768.jpg','./img/remodel9-w768.jpg','./img/remodel10-w768.jpg','./img/remodel11-w768.jpg','./img/remodel12-w768.jpg'];
  function init(){
    console.log('[remodelApp] init');
    if (window.Slider) {
      new Slider({ containerSelector: '.img-carousel', images: images, descSelector: '.img-description' });
    } else {
      console.warn('Slider not found - ensure js/slider.js is loaded before remodelApp.js');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();