
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


