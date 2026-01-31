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
    try{ html = await fetchText(`partials/${name}.html`); }
    catch(err){ console.warn(`include-layout: ${name} include failed`, err); return; }

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
