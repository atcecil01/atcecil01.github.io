(async function(){
  'use strict';
  async function fetchText(path){
    const res = await fetch(path);
    if(!res.ok) throw new Error(`Couldn't fetch ${path}: ${res.status}`);
    return await res.text();
  }

  // Inject head partial (preserve existing <title> if present)
  try{
    const headHtml = await fetchText('partials/head.html');
    const tpl = document.createElement('template');
    tpl.innerHTML = headHtml;
    // Append each node to document.head
    Array.from(tpl.content.childNodes).forEach(node => document.head.appendChild(node));
  }catch(err){
    console.warn('include-layout: head include failed', err);
    // Fallback: inject essential stylesheet links so pages still render when fetch is blocked
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'css/normalize.css';
    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'css/style.css?v=20260130';
    document.head.appendChild(link1);
    document.head.appendChild(link2);
  }

  async function include(name){
    let html;
    try{
      html = await fetchText(`partials/${name}.html`);
    }catch(err){
      console.warn(`include-layout: ${name} include failed`, err);
      // If fetch fails (common when opening pages via file://), inject a minimal fallback
      // so the page still renders useful header/footer content.
      const tpl = document.createElement('template');
      if(name === 'header'){
        tpl.innerHTML = `
<header id="top">
  <div class="header">
    <h1 id="mainTitle">AC Wood and Leathercraft</h1>
  </div>
  <ul id="nav" role="navigation" aria-label="Main menu" class="hidden">
    <li class="nav-link"><a href="index.html">Home</a></li>
    <li class="nav-link"><a href="woodcraft.html">WoodCraft</a></li>
    <li class="nav-link"><a href="leathercraft.html">LeatherCraft</a></li>
    <li class="nav-link"><a href="knifemaking.html">Knifemaking</a></li>
    <li class="nav-link"><a href="remodel.html">House Remodel</a></li>
  </ul>
  <div data-slot></div>
</header>`;
      }else if(name === 'footer'){
        tpl.innerHTML = `
<footer class="footer">
  <p>This project site is intended to show projects I have built. If you have any questions about any projects seen here, or would like blueprints for them feel free to contact me. Make sure to use proper safety equipment when working.</p>
  <ul>
    <li><a href="https://github.com/atcecil01" class="social-links" target="_blank">Github</a> | <a href="https://www.linkedin.com/in/andrew-cecil/" class="social-links" target="_blank">LinkedIn</a></li>
    <li><a href="#top">Back to Top</a></li>
  </ul>
</footer>`;
      }else{
        // unknown include, abort
        return;
      }

      // perform replacement using the fallback template
      document.querySelectorAll(`[data-include="${name}"]`).forEach(placeholder => {
        const frag = tpl.content.cloneNode(true);
        const slot = frag.querySelector('[data-slot]');
        if(slot){
          while(placeholder.firstChild){ slot.appendChild(placeholder.firstChild); }
        }
        const nodes = Array.from(frag.childNodes);
        placeholder.replaceWith(...nodes);
      });

      return;
    }

    const tpl = document.createElement('template');
    tpl.innerHTML = html;

    document.querySelectorAll(`[data-include="${name}"]`).forEach(placeholder => {
      // clone template content for each instance
      const frag = tpl.content.cloneNode(true);

      // if template has a slot, move placeholder children into it
      const slot = frag.querySelector('[data-slot]');
      if(slot){
        while(placeholder.firstChild){
          slot.appendChild(placeholder.firstChild);
        }
      }

      // replace placeholder with fragment children
      const nodes = Array.from(frag.childNodes);
      placeholder.replaceWith(...nodes);
    });
  }

  await include('header');
  await include('footer');
})();
