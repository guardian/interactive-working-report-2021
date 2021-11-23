const navID             = 'jump-nav';
const anchorTag         = 'header';
const targetTag         = 'h2';
const targetTagInner    = 'strong';
const navTag            = 'nav';
const menuClass         = 'nav-class';
const menuStuck         = 'stick-me';
const closeNav          = 'close-nav';
const anchorIdLabel     = 'section';
const anchorClass       = 'section-header';
const navClass          = 'article-navigation';
const navBarClass       = 'nav-title-wrapper';
const navUtilityID      = 'nav-utility';

// get our content contaciner
const mainContent = document.getElementById('maincontent')
const articleContent = document.querySelector('.article-body-viewer-selector')
// get our target element
const targetElem = mainContent.querySelectorAll(targetTag);
// const targetDef = mainContent.querySelector('strong');
// get first set of links
const firstList = mainContent.querySelectorAll('ul')[0] // ********* only needed if menu list exists

//////////////////////////////////////////////////////////////////////////
// ---------------------------- Version 2 ----------------------------- //
//////////////////////////////////////////////////////////////////////////

// creates elements with attributes and adds them *NB Needs refinement?
function newElem(tagName,attType,attName,className,content,contentHolder,position) {

  const newElem2 = document.createElement(tagName);

  if (className !== '' ) {
    newElem2.classList.add(className);
  }

  newElem2.innerText = content;

  if (attType !== '' ) {
    newElem2.setAttribute(attType, attName);
  }
  // Not 100% sure about this part?
  if (position === 'before') {
    contentHolder.prepend(newElem2);
  } else if ( position === 'after') {
    contentHolder.appendChild(newElem2);
  }
}

// wraps an element
function wrapElem(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

// nav menu builder
function menuContainer() {
  // build nav
  newElem(navTag,'id',navID, navClass,'',mainContent,'before');
  const menuHolder = document.getElementById(navID);

  newElem('div','id',navUtilityID,navBarClass,'',menuHolder,'before');
  const navUtility = document.getElementById(navUtilityID);

  newElem('p','','','','Jump to',navUtility,'after');
  newElem('span','id',closeNav,'','Toggle menu',navUtility,'after');

}

menuContainer(); // ******* Building this now because it's needed to add the links, but should be when *no* nav has been found
const navHolder = document.getElementById(navID); // added #2 to not conflict
const closeBtn = document.getElementById(closeNav);

// wrap our anchors
function addAnchorWrap(targetElem, i) {
  let index             = parseInt(i);// change string to interger to start at 1
  const anchorNode      = targetElem[i];
  const anchorID        = anchorIdLabel + (index+1);
  const linkTitle       = targetElem[i].innerText;
  const anchorIDTitle   = linkTitle.replace(/\s+/g, '-').toLowerCase();
  // console.log(anchorIDTitle);
  // create header element
  const titleWrapper = document.createElement(anchorTag);

  // titleWrapper.setAttribute('id', anchorID); // using section var
  titleWrapper.setAttribute('id', anchorIDTitle); // using anchor text
  // add class
  titleWrapper.classList.add(anchorClass);

  // only select target with bold tag
  const innerNode = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag

  if (anchorNode.contains(innerNode)) {
    // wrap our header element only if it contains our inner node
    wrapElem(anchorNode, titleWrapper);
  }
  // Add marker *if* we need it?
  // newElem('span','','','marker','',titleWrapper,'before');
}
// Concatinate titles
function concatTitle(title) {
  const newURL = title.replace(/\s+/g, '-').toLowerCase();
  return newURL;
}
// Builds our url's. Currently the whole link but may need just urls output
function linkURL(targetElem, i) {
  let index = parseInt(i); // change string to interger to start at 1
  const anchorNode      = targetElem[i];
  const anchorID        = anchorIdLabel + (index+1);
  const linkTitle       = targetElem[i].innerText;
  // const linkWrapper     = titleWrapper.append(linkTitle);
  const anchorIDTitle   = concatTitle(linkTitle);

  // const linkHref = '#' + anchorID; // using section variable
  const linkHref = '#' + anchorIDTitle; // using anchor text

  const innerNode = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag

  if (anchorNode.contains(innerNode)) {
    newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');
  }
}

// Loop through and build anchors and menu links
for (let i = 0; i < targetElem.length; i++) {
  // wrap anchors
  addAnchorWrap(targetElem, [i]);
  // build link
  linkURL(targetElem, [i]);
}
// wrap our anchor link text in spans
const linkTextToWrap = document.getElementsByClassName(menuClass);

Array.from(linkTextToWrap).forEach(function(link){

  const titleWrapper    = document.createElement('span');
  const linkLabel       = link.innerText
  const newLinkNode     = document.createTextNode(linkLabel)

  titleWrapper.appendChild(newLinkNode)
  link.innerText = ''
  link.append(titleWrapper)

});

// detect section in view
let sectionHeader = document.querySelectorAll(anchorTag);

const menuTarget = document.getElementsByClassName(menuClass);

// console.log(menuTargetArr);
let currItem = null;
let prevItem = null;
let anchorOptions = {
  rootMargin: '0px 0px -75% 0px', // add for sticky menu reduce target area to top 25% of viewport for small sections
  threshold: 1.0
}

let anchorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const labelText = entry.target.textContent; // changed innerText to textContent to work in safari
      // previous is current
        prevItem = currItem;
        // convert html collection to array to loop with forEach
        Array.from(menuTarget).forEach(function(item){
          // loop through links to match active target text
          if ( labelText === item.textContent ) {

            let linkHash = concatTitle(item.textContent);
            updateHash(linkHash);

            item.classList.add('active');
            // get current item
            currItem = labelText;

          } else if ( prevItem === item.textContent ) {

            item.classList.remove('active');
            item.classList.add('prev');

          } else {

            item.classList.remove('active');
            item.classList.remove('prev');

          }
        });
      }
    });
  }, anchorOptions);

sectionHeader.forEach(header => { anchorObserver.observe(header) });


let hashState = 0;
// if menu has been clicked skip the auto update
const navElem = document.getElementsByClassName(menuClass);
Array.from(navElem).forEach(function(item){
  item.addEventListener('click', (e) => {
    hashState = 1;
    setTimeout(() => {
      hashState = 0;
      // console.log('click: ' + hashState);
    }, 1000)
  });
});

closeBtn.addEventListener('click', (e) => {
    navHolder.classList.toggle('open-nav');
});
// hash url update
function updateHash(url) {
  // works on click but not using the keyboard
  if (hashState !== 1) {
    window.location.hash = '#' + url;
  }
}
// remove hash at top of page
function removeHash(){
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

// Almost what's needed but class present before sticking
// const navIsAtTop = new IntersectionObserver(
//   ([e]) => e.target.classList.toggle(menuStuck, e.intersectionRatio < 1),
//   {threshold: [1]}
// );

const navHeight = navHolder.offsetHeight
const navSpace = window.innerHeight - navHeight

let obvsOptUp = {
  rootMargin: '0px 0px -' + navSpace + 'px 0px',
  threshold: [0.2,0.8]
}

let obvsCallbackUp = (entries, observerUp) => {
  entries.forEach(entry => {
    if ( entry.isIntersecting === true && entry.intersectionRatio > 0.8 ) {
      navHolder.classList.add(menuStuck)

    } else if (entry.intersectionRatio < 0.2) {
      navHolder.classList.remove(menuStuck)
      removeHash() // only works on mobile as menu sticky

    }
  });
};

let observerUp = new IntersectionObserver(obvsCallbackUp, obvsOptUp);
observerUp.observe(navHolder);

// HF method
// const navIsAtTop = () => {
//   console.log("IM AT THE TOPPPPP")
//   navHolder.classList.add("stick-me")
// }
//
// const debounce = (func, wait) => {
//   let timeout;
//
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };
//
// var debouncedNavAtTop = debounce(function () {
//   if (navHolder.getBoundingClientRect().top < 0) {
//     navIsAtTop()
//   } else {
//
//   }
// }, 200);

// window.addEventListener('wheel', debouncedNavAtTop); // ----------> commented out
//
// window.addEventListener("scroll", () => {
//   console.log(navHolder)
//   console.log(navHolder.getBoundingClientRect().top)
//
// })
