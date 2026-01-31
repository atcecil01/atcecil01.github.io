
// Accessible responsive menu toggling
var menuButton = document.getElementById('menuButton');
var nav = document.getElementById('nav');

// Initialize
menuButton.setAttribute('aria-expanded', 'false');
nav.classList.add('hidden');

menuButton.addEventListener('click', function() {
  var isOpen = nav.classList.toggle('hidden');
  // when class 'hidden' present -> visually hidden, so invert for aria
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.classList.toggle('is-open', !isOpen);
});

// Close nav on escape
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape'){
    if (!nav.classList.contains('hidden')){
      nav.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.classList.remove('is-open');
    }
  }
});

// Ensure nav state is correct on resize
function checkResize(){
  if (window.innerWidth >= 768){
    // show the nav (desktop) and remove mobile-hidden styles
    nav.classList.remove('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.classList.remove('is-open');
  } else {
    // mobile default: hide nav
    nav.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.classList.remove('is-open');
  }
}

window.addEventListener('resize', checkResize);
// run once
checkResize();

// Dev-only: cache-bust styles when running locally or from file:// so changes show immediately
(function devCacheBust(){
  try {
    var isDev = (location.protocol === 'file:') || (location.hostname === 'localhost') || (location.hostname === '127.0.0.1');
    if (!isDev) return;
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(function(link){
      if (!link.href) return;
      // target the main stylesheet (remove existing querystring)
      if (link.getAttribute('href').indexOf('css/style.css') !== -1 || link.href.indexOf('css/style.css') !== -1){
        var hrefBase = link.getAttribute('href').split('?')[0];
        link.setAttribute('href', hrefBase + '?_=' + Date.now());
        console.log('[devCacheBust] updated', hrefBase);
      }
    });
  } catch (e){ console.error('devCacheBust error', e); }
})();


