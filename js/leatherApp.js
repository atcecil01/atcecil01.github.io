// Leather page slider initializer (vanilla)
(function(){
  var images = ['./img/belt1-w768.jpg','./img/belt3-w768.jpg','./img/belt5-w768.jpg','./img/belt4-w768.jpg','./img/belt6-w768.jpg','./img/belt7-w768.jpg','./img/belt8-w768.jpg','./img/belt9-w768.jpg'];
  function init(){
    console.log('[leatherApp] init');
    if (window.Slider) {
      new Slider({ containerSelector: '.img-carousel', images: images, descSelector: '.img-description' });
    } else {
      console.warn('Slider not found - ensure js/slider.js is loaded before leatherApp.js');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();