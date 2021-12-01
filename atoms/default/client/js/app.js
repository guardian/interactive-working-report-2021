const navID             = 'jump-nav';
const anchorTag         = 'header';
const targetTag         = 'h2';
const targetTagInner    = 'strong';
const navTag            = 'nav';
const menuClass         = 'nav-class';
const menuStuck         = 'stick-me';
const closeNav          = 'close-nav';
const navLabel          = 'nav-label';
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
// get first set of links
const firstList = mainContent.querySelectorAll('ul')[0] // ********* only needed if menu list exists

const mainTitle         = document.querySelector('.content__headline');

// ----------------------------------------// Headers // ----------------------------------------------- //

const mainHeader = document.querySelector('.content__headline')
const standFirst = document.querySelector('.content__standfirst')
const metaShares = document.querySelector('.content__meta-container_dcr')
// console.log('mainHeader: ' + mainHeader)
mainHeader.parentElement.parentElement.parentElement.parentElement.classList.add("headline-wrapper")
standFirst.parentElement.classList.add("standFirst-wrapper")
metaShares.parentElement.parentElement.classList.add("meta-shares-wrapper")

const headWrapper = document.querySelector('.headline-wrapper')
const metaWrapper = document.querySelector('.meta-shares-wrapper')
// remove grid line
headWrapper.previousSibling.remove();
// remove horizontal lines
metaWrapper.previousSibling.remove();

const mainHeaderWrapper  = document.createElement('header');

mainHeaderWrapper.append(mainHeader,standFirst,metaShares)

mainContent.prepend(mainHeaderWrapper)

mainHeader.classList.add('show-content')

// wrap following p tag if contains em and strong only
const bylineBox = document.getElementsByClassName(anchorClass)
// console.log('bylineBox: ' + bylineBox)
Array.from(bylineBox).forEach(function(header){
  const innerNode = header.nextElementSibling.querySelector('em');
  if (innerNode !== null) {
    const innerMostNode = innerNode.querySelector('strong') // target only if strong within em

    if (innerMostNode !== null) {
      console.log(innerMostNode)
      innerMostNode.parentElement.parentElement.classList.add("byline-box");
    }
  }
});

// ---------------------------------------// Navigation //----------------------------------------------- //

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

  newElem('p','','',navLabel,'Jump to',navUtility,'after');
  newElem('div','id',closeNav,'','',navUtility,'after');
  const navToggle = document.getElementById(closeNav);

  newElem('span','','','sr-only','Toggle menu',navToggle,'after');
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

// detect section in view via header
let sectionHeader = document.querySelectorAll(anchorTag);
// nav menu
const menuTarget = document.getElementsByClassName(menuClass);

// We may need to calculate height of sectionHeader? <-------------------------- check if we need to do some calculations
const headHeight = navHolder.offsetHeight
const headSpace = window.innerHeight - headHeight

console.log('headHeight: ' + headHeight)
console.log('headSpace: ' + headSpace)

let currItem = null;
let prevItem = null;

let anchorOptions = {
  rootMargin: '0px 0px -' + headSpace + 'px 0px', // <-------------------------- check if we need to do some calculations
  // rootMargin: '0px 0px -50% 0px', // add for sticky menu reduce target area to top 25% of viewport for small sections
  threshold: 1                                  // <-------------------------- check if we need to do some calculations
}

let anchorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const labelText = entry.target.textContent; // changed innerText to textContent to work in safari
      // if (navHolder.getBoundingClientRect().top === 0 && navHolder.classList.contains(menuStuck)) {
      //   console.log("im stuck good");
      // } else {
      //   console.log("im NOT stuck and need to be");
      //   // navHolder.classList.add(menuStuck);
      // }
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
    }, 1000)
  });
});

closeBtn.addEventListener('click', (e) => {
    navHolder.classList.toggle('open-nav');
    e.target.classList.toggle('open');
});
// hash url update
function updateHash(url) {
  // works on click but not using the keyboard
  let newHash =  '#' + url
  if (hashState !== 1) {
  //   window.location.hash = newHash // jerky
    if(history.replaceState) {
      history.pushState(null, null, newHash);
    }
    else {
      location.hash = newHash;
    }
  }
}
// remove hash at top of page
function removeHash(){
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

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

    }
  });
};

let observerUp = new IntersectionObserver(obvsCallbackUp, obvsOptUp);
observerUp.observe(navHolder);

// remove hash at top of page watching mainTitle
let obvsOptsTitleTop = {
  rootMargin: '0px',
  threshold: 1
}
let obvsCallbackTitleTop = (entries, obvsTitleTop) => {
  entries.forEach(entry => {
    if ( entry.isIntersecting ) {
      // console.log('title top');
      removeHash()
    }
  });
};

let obvsTitleTop = new IntersectionObserver(obvsCallbackTitleTop, obvsOptsTitleTop);
obvsTitleTop.observe(mainTitle);
// --------------------------------// previous code options // ---------------------------------------- //

// Almost what's needed but class present before sticking --> keeping this for ref as very neat
// const navIsAtTop = new IntersectionObserver(
//   ([e]) => e.target.classList.toggle(menuStuck, e.intersectionRatio < 1),
//   {threshold: [1]}
// );

// ----------------------------------- // HF method
// const navIsAtTop = () => {
//   console.log("IM AT THE TOPPPPP")
//   navHolder.classList.add(menuStuck)
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
//
// window.addEventListener('wheel', debouncedNavAtTop); // ----------> commented out
//
// window.addEventListener("scroll", () => {
//   console.log(navHolder)
//   console.log(navHolder.getBoundingClientRect().top)
//
// })
