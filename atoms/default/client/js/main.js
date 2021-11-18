var el = document.createElement('script');
el.src = '<%= atomPath %>/app.js';
document.body.appendChild(el);

setTimeout(() => {
  if (window.resize) {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    html.style.overflow = 'hidden'
    html.style.margin = '0px'
    html.style.padding = '0px'

    body.style.overflow = 'hidden'
    body.style.margin = '0px'
    body.style.padding = '0px'

  window.resize()
  }
},100)

// Import any polyfill to enable smoothscroll for JS APIs
import smoothscrollPolyfill from 'smoothscroll-polyfill';

// Import this package to apply the smoothscroll to anchor links
import smoothscrollAnchorPolyfill from 'smoothscroll-anchor-polyfill';

// (Unlike this package, smoothscroll-polyfill needs to be actively invoked: )
smoothscrollPolyfill.polyfill();
