// Tiny vanilla image slider module
// Usage: new Slider({containerSelector: '.img-carousel', images: ['img1.jpg','img2.jpg'], descSelector: '.img-description'});
class Slider {
  constructor(opts){
    this.container = opts.containerSelector ? document.querySelector(opts.containerSelector) : document;
    this.display = this.container.querySelector(opts.displaySelector || '.img-display');
    this.prevBtn = this.container.querySelector(opts.prevSelector || '.prev');
    this.nextBtn = this.container.querySelector(opts.nextSelector || '.next');
    this.descEl = opts.descSelector ? document.querySelector(opts.descSelector) : null;
    this.images = opts.images || [];
    this.index = opts.startIndex || 0;
    this.loop = typeof opts.loop === 'undefined' ? true : !!opts.loop;

    if (!this.display || !this.images.length) return;

    this.update();
    this.bind();
    this.preload();
  }

  bind(){
    if (this.prevBtn) this.prevBtn.addEventListener('click', this.prev.bind(this));
    if (this.nextBtn) this.nextBtn.addEventListener('click', this.next.bind(this));

    // keyboard navigation
    this._keyHandler = this._keyHandler || this.keyHandler.bind(this);
    if (this.display) {
      this.display.addEventListener('keydown', this._keyHandler);
      // make image focusable for keyboard
      this.display.setAttribute('tabindex', '0');
    }

    // also support left/right on document
    document.addEventListener('keydown', this._keyHandler);

    // touch: simple swipe handler
    let startX = null;
    if (this.display){
      this.display.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; });
      this.display.addEventListener('touchend', e => {
        if (startX === null) return;
        let dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40){ if (dx > 0) this.prev(); else this.next(); }
        startX = null;
      });
    }
  }

  keyHandler(e){
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  prev(){
    var old = this.index;
    if (this.index > 0) this.index -= 1;
    else if (this.loop) this.index = this.images.length - 1;
    this.update();
  }

  next(){
    var old = this.index;
    if (this.index < this.images.length - 1) this.index += 1;
    else if (this.loop) this.index = 0;
    this.update();
  }

  update(){
    const item = this.images[this.index];
    const src = (typeof item === 'string') ? item : item.src;
    const alt = (typeof item === 'object' && item.alt) ? item.alt : '';
    const caption = (typeof item === 'object' && item.caption) ? item.caption : '';

    // update image
    this.display.src = src;
    this.display.srcset = src;
    if (alt) this.display.alt = alt;

    // update description if provided
    if (this.descEl) this.descEl.textContent = caption || '';
  }

  preload(){
    this.images.forEach(img => {
      const src = typeof img === 'string' ? img : img.src;
      const i = new Image(); i.src = src;
    });
  }
}

// expose globally
window.Slider = Slider;
