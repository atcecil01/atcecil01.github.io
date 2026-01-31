// Wood page slider initializer (vanilla)
(function(){
  var images = ['./img/tea1-w768.jpg','./img/tea4-w768.jpg','./img/tea5-w768.jpg','./img/tea6-w768.jpg','./img/tea8-w768.jpg','./img/tea9-w768.jpg','./img/tea10-w768.jpg'];
  function init(){
    console.log('[woodApp] init');
    if (window.Slider) {
      new Slider({ containerSelector: '.img-carousel', images: images, descSelector: '.img-description' });
    } else {
      console.warn('Slider not found - ensure js/slider.js is loaded before woodApp.js');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();