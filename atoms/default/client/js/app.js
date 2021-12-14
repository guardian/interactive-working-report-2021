
var appTimer = 8000;

// setTimeout(() => {
//   console.log("js working")
// }, appTimer)

const navID             = 'jump-nav';
const anchorTag         = 'header';
const targetTag         = 'h2';
const targetTagInner    = 'strong';
const videoBtnClass     = 'overlay-play-button';
const videoOverOutClass = 'video-overlay';
const videoOverInClass  = 'video-inner';
const videoBtnWrapClass = 'video-button-wrapper';
const navTag            = 'nav';
const menuClass         = 'nav-class';
const menuClassVid      = 'video-link';
const menuStuck         = 'stick-me';
const closeNav          = 'close-nav';
const navLabel          = 'nav-label';
const anchorIdLabel     = 'section';
const anchorClass       = 'section-header';
const vidClass          = 'video-section-header';
const navClass          = 'article-navigation';
const navBarClass       = 'nav-title-wrapper';
const navUtilityID      = 'nav-utility';
const outterMargin      = 'content--interactive-margin';

var mainContent
var articleContent
var targetElem
var firstList
var mainTitle
var videoOverlay
var interClassElem
var videoClass
var videoOverlayAtt
var targetTagInnerAlt
var innerNodeAlt
const parentIsIos = window.parent.document.querySelector(".ios")
const parentIsAndroid = window.parent.document.querySelector(".android")

const checkApp = () => {
  if (parentIsIos || parentIsAndroid) {
    // console.log('in app')
    // get our content container
    mainContent       = document.getElementById('article-body')
    articleContent    = document.querySelector('.article-body-viewer-selector')
    // get our target element
    // videoClass        = '.element-youtube'
    videoClass        = '[data-atom-type="media"]'
    videoOverlayAtt   = '.youtube-media__sdk-placeholder'
    targetElem        = mainContent.querySelectorAll(targetTag + ',' + videoClass);
    // get first set of links
    firstList         = mainContent.querySelectorAll('ul')[0] // ********* only needed if menu list exists
    mainTitle         = document.querySelector('.headline');
    // page structurer
    interClassElem = document.querySelector('.article--standard');
    targetTagInnerAlt = '.youtube-sdk-caption'; // as soon as we have images in the page it breaks

  } else {
    // console.log('on web')
    // get our content container
    mainContent       = document.getElementById('maincontent')
    articleContent    = document.querySelector('.article-body-viewer-selector')
    // get our target element
    // targetElem        = mainContent.querySelectorAll(targetTag);
    videoClass        = '[data-component="youtube-atom"]';
    videoOverlayAtt   = '[data-cy="youtube-overlay"]';
    targetElem        = mainContent.querySelectorAll(targetTag + ',' + videoClass);
    // get first set of links
    firstList         = mainContent.querySelectorAll('ul')[0] // ********* only needed if menu list exists
    mainTitle         = document.querySelector('[data-gu-name="headline"]');
    // page structurer
    interClassElem    = document.querySelector('.content--interactive').firstElementChild;
    targetTagInnerAlt = 'figcaption'; // as soon as we have images in the page it breaks
  }
}

checkApp()

// is this same in the app?
videoOverlay      = document.querySelector(videoOverlayAtt);

// videoOverlay.addEventListener('load', function(){
//   // The image is ready!
// });

interClassElem.classList.add(outterMargin)

// ---------------------------------------// Navigation //----------------------------------------------- //
// setTimeout(() => {
//   console.log('creates elements with attributes and adds them: newELem function');
// }, appTimer)
// creates elements with attributes and adds them *NB Needs refinement?
function newElem(tagName,attType,attName,className,content,contentHolder,position) {

  const newElem2 = document.createElement(tagName);
  const menuClasses = [className]
  const menuClassesString = className

  if (className !== '' ) {
    newElem2.className = menuClassesString
  }

  if (content !== '' ) {
    newElem2.innerText = content;
  }

  if (attType !== '' ) {
    newElem2.setAttribute(attType, attName);
  }

  if (position === 'before') {
    contentHolder.prepend(newElem2);
  } else if ( position === 'after') {
    contentHolder.appendChild(newElem2);
  }
}

// setTimeout(() => {
//   console.log('wraps an element: wrapElem function');
// }, appTimer)
// wraps an element
function wrapElem(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

// setTimeout(() => {
//   console.log('nav menu builder: menuContainer function');
// }, appTimer)
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

  newElem('span','','','','Toggle menu',navToggle,'after');
}

menuContainer(); // ******* Building this now because it's needed to add the links, but should be when *no* nav has been found
const navHolder = document.getElementById(navID); // added #2 to not conflict
const closeBtn = document.getElementById(closeNav);

var vidCaptionTitle = '';

// setTimeout(() => {
//   console.log('wrap our anchors addAnchorWrap function');
// }, appTimer)

// wrap our anchors
function addAnchorWrap(targetElem, i) {
  let index             = parseInt(i);// change string to interger to start at 1
  const anchorNode      = targetElem[i];

  // Select target with strong child tag
  const innerNode       = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag
  // create header element
  const titleWrapper = document.createElement(anchorTag);

  let anchorIDTitle   = '';
  let linkTitle       = targetElem[i].innerText;

  // if (anchorNode.contains(innerNodeAlt)) {
  //   linkTitle           = innerNodeAlt.innerText.replace(/(\r\n|\n|\r)/gm, "")
  //   anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase()
  //   if(videoOverlay){
  //     videoOverlay.setAttribute('id', anchorIDTitle);
  //   }
  // }

  anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();

  titleWrapper.setAttribute('id', anchorIDTitle); // using anchor text

  // add class
  titleWrapper.classList.add(anchorClass); // standard section header

  if (parentIsIos || parentIsAndroid) {

    innerNodeAlt = document.querySelector(targetTagInnerAlt); // targets any figcation NOT video figcaption ******
    var x = innerNodeAlt.parentElement;

    if (anchorNode.contains(innerNode)) {
      // wrap our header element if it contains our inner node of strong
      wrapElem(anchorNode, titleWrapper);

    } else if (x === anchorNode.nextElementSibling) {

      linkTitle    = innerNodeAlt.innerText.replace(/(\r\n|\n|\r)/gm, "")
      anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();
      anchorNode.setAttribute('id', anchorIDTitle);

    }

    // setTimeout(() => {
    //   console.log('wrap h2s and video (APP)')
    // }, appTimer)

  } else {

    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt);

    if (anchorNode.contains(innerNode)) {
      // wrap our header element if it contains our inner node of strong
      wrapElem(anchorNode, titleWrapper);

    } else if (anchorNode.contains(innerNodeAlt)) {

      linkTitle    = innerNodeAlt.innerText.replace(/(\r\n|\n|\r)/gm, "")
      anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();
      anchorNode.setAttribute('id', anchorIDTitle);

      if(videoOverlay){
        videoOverlay.setAttribute('id', anchorIDTitle);
      }

      const videoBtnWrap = document.querySelector('.' + videoBtnClass).parentElement
      videoBtnWrap.classList.add(videoBtnWrapClass)

      setTimeout(() => {
        // newElem('div','','',videoOverOutClass,'',videoOverlay,'after')
        // const newVidWrapElem = document.querySelector('.video-overlay')
        // newElem('div','','',videoOverInClass,linkTitle,newVidWrapElem,'after')
        // vidCaptionOverlay(linkTitle)
        // vidCaptionTitle = linkTitle
      }, 1000) // remove 2000 as it should only trigger when content loaded
    }
  }
};

// setTimeout(() => {
//   console.log('video overlay newELem');
// }, appTimer)

function vidCaptionOverlay(linkTitle) {
  newElem('div','','',videoOverOutClass,'',videoOverlay,'after')
  const newVidWrapElem = document.querySelector('.video-overlay')
  newElem('div','','',videoOverInClass,linkTitle,newVidWrapElem,'after')
}
// ********************************* mutaion observer the way to go. Will look at it on sunday *********************************
// const videoOverlayElem = document.querySelector(videoOverlayAtt);
//
// const jsElemConfig = { attributes: true, childList: true, subtree: true };
//
// const jsElemCallback = function(mutationsList, jsElemObserver) {
//     // Use traditional 'for loops' for IE 11
//     for(const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//         }
//         else if (mutation.type === 'attributes') {
//         } else {
//         }
//     }
// };
// // Create an observer instance linked to the jsElemCallback function
// const jsElemObserver = new MutationObserver(jsElemCallback);
// // Start observing the target node for configured mutations
// jsElemObserver.observe(videoOverlayElem, jsElemConfig);
// // Later, you can stop observing
// jsElemObserver.disconnect();

// setTimeout(() => {
//   console.log('Concatinate titles function');
// }, appTimer)
// Concatinate titles
function concatTitle(title) {
  const newURL = title.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();
  return newURL;
}

// setTimeout(() => {
//   console.log('build linkURLs');
// }, appTimer)
// Builds our url's. Currently the whole link but may need just urls output
function linkURL(targetElem, i) {
  let index = parseInt(i); // change string to interger to start at 1
  let anchorNode      = targetElem[i];

  let innerNode       = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag

  let linkTitle       = anchorNode.innerText;
    // console.log('linkTitle OUT: ')
    // console.log(linkTitle)
    // console.log('innerNode OUT')
    // console.log(innerNode)

  var anchorIDTitle   = concatTitle(linkTitle);
  let classArr        = menuClass + ' ' + menuClassVid;

  var linkHref          = '#' + anchorIDTitle; // using anchor text

  if (parentIsIos || parentIsAndroid) {

    innerNodeAlt    = document.querySelector(targetTagInnerAlt);
    var x = innerNodeAlt.parentElement;

    if (anchorNode.contains(innerNode)) {

      newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');

    } else if (x === anchorNode.nextElementSibling) {

      linkTitle       = innerNodeAlt.innerText;
      anchorIDTitle   = concatTitle(linkTitle);
      linkHref        = '#' + anchorIDTitle;

      newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');

      // setTimeout(() => {
      //   console.log('linkTitle: ')
      //   console.log(linkTitle)
      // }, appTimer)

    }

  } else {
    // Select target with em child tag
    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt);

    // video caption for links
    if (anchorNode.contains(innerNode)) {
      // console.log('linkTitle IN: ')
      // console.log(linkTitle);
      newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');
    } else if (anchorNode.contains(innerNodeAlt)) {

      linkTitle       = innerNodeAlt.innerText;
      anchorIDTitle   = concatTitle(linkTitle);
      linkHref        = '#' + anchorIDTitle;
      // console.log('linkTitle IN: ')
      // console.log(linkTitle);

      newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');
    }
  }
}

// setTimeout(() => {
//   console.log('Loop through and build anchors and menu links')
// }, appTimer)

// Loop through and build anchors and menu links
for (let i = 0; i < targetElem.length; i++) {
  // wrap anchors
  addAnchorWrap(targetElem, [i]);
  // build link
  linkURL(targetElem, [i]);
}

// setTimeout(() => {
//   console.log('wrap our anchor link text in spans')
// }, appTimer)
// wrap our anchor link text in spans
const linkTextToWrap = document.getElementsByClassName(menuClass);

Array.from(linkTextToWrap).forEach(function(link){

  const titleWrapper    = document.createElement('span')
  const linkLabel       = link.innerText
  const newLinkNode     = document.createTextNode(linkLabel)

  titleWrapper.appendChild(newLinkNode)
  link.innerText = ''
  link.append(titleWrapper)

});

// setTimeout(() => {
//   console.log("detect section in view via header: forEach linkTextToWrap")
// }, appTimer)
  // detect section in view via header
let sectionHeader = document.querySelectorAll('.' + anchorClass + ',' + videoOverlayAtt); // works with - videoOverlayAtt
let menuTarget
let videoTimer

if (parentIsIos || parentIsAndroid) {
  // nav menu
  menuTarget = document.getElementsByClassName(menuClass);

} else {
  // nav menu
  menuTarget = document.getElementsByClassName(menuClass);
  // video timer
  videoTimer = document.querySelector('.' + videoBtnWrapClass).textContent;
}

// setTimeout(() => {
//   console.log("We may need to calculate height of sectionHeader")
// }, appTimer)
// We may need to calculate height of sectionHeader? <-------------------------- check if we need to do some calculations
let headHeight = navHolder.offsetHeight
let headSpace = window.innerHeight - headHeight

let currItem = null;
let prevItem = null;

let anchorOptions = {
  rootMargin: '0px 0px -' + headSpace + 'px 0px', // <-------------------------- check if we need to do some calculations
  threshold: 0                                  // <-------------------------- check if we need to do some calculations
}
// setTimeout(() => {
//   console.log("anchorObserver")
// }, appTimer)

let anchorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      let labelText = entry.target.textContent; // changed innerText to textContent to work in safari
      headHeight = navHolder.offsetHeight
      headSpace = window.innerHeight - headHeight

      // remove the time string
      if (labelText.startsWith(videoTimer)) {
        labelText = labelText.replace(videoTimer, "");
        // console.log('labelText if: ' + labelText)
      }
      // previous is current
      prevItem = currItem;
      // convert html collection to array to loop with forEach
      Array.from(menuTarget).forEach(function(item){

        if ( labelText === item.textContent ) {

          // console.log("matching labelText: " + labelText)
          // console.log('item.textContent: ' + item.textContent)

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

// setTimeout(() => {
//   console.log('if menu has been clicked skip the auto update')
// }, appTimer)

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

// setTimeout(() => {
//   console.log('hash url update')
// }, appTimer)

// hash url update
function updateHash(url) {
  // works on click but not using the keyboard
  let newHash =  '#' + url
  if (hashState !== 1) {

    if(history.replaceState) {
      history.pushState(null, null, newHash);
    }
    else {
      location.hash = newHash;
    }
  }
}

// setTimeout(() => {
//   console.log('remove hash at top of page')
// }, appTimer)
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
// setTimeout(() => {
//   console.log('obvsCallbackUp')
// }, appTimer)

let observerUp = new IntersectionObserver(obvsCallbackUp, obvsOptUp);
observerUp.observe(navHolder);

// remove hash at top of page watching mainTitle
let obvsOptsTitleTop = {
  rootMargin: '0px',
  threshold: 0
}
let obvsCallbackTitleTop = (entries, obvsTitleTop) => {
  entries.forEach(entry => {
    if ( entry.isIntersecting ) {
      navElem[0].classList.remove('active');
      navElem[0].classList.remove('prev');
      removeHash()
    }
  });
};

// setTimeout(() => {
//   console.log('obvsTitleTop')
// }, appTimer)

let obvsTitleTop = new IntersectionObserver(obvsCallbackTitleTop, obvsOptsTitleTop);
obvsTitleTop.observe(mainTitle);

// setTimeout(() => {
//   console.log('wrap following p tag if contains em and strong only (REMOVED)')
// }, appTimer)
// By line
// wrap following p tag if contains em and strong only
const bylineBox = document.getElementsByClassName(anchorClass)
const myList = Array.from(bylineBox)

myList.forEach(function(sectHeader){

  const nextPtagID = sectHeader.nextElementSibling.hasAttribute('id')
  // if the gate remove it
  if (nextPtagID && sectHeader.nextElementSibling.id === 'sign-in-gate' ) {
    sectHeader.nextElementSibling.remove()
  }
  // const innerNode = sectHeader.nextElementSibling.querySelector('em');
  // if (innerNode !== null) {

  //   const innerMostNode = innerNode.querySelector('strong') // target only if strong within em

  //   if (innerMostNode !== null) {
  //     innerMostNode.parentElement.parentElement.classList.add("byline-box");
  //   }
  // }
});

// setTimeout(() => {
//   console.log('Tracking')
// }, appTimer)

// Tracking
const navLinks = document.querySelectorAll('.nav-class')
navLinks.forEach((el, index) => {
  el.dataset.linkName = "working report 2021 : nav link " + index
})




// --------------------------------// previous code options // ---------------------------------------- //

// Almost what's needed but class present before sticking --> keeping this for ref as very neat
// const navIsAtTop = new IntersectionObserver(
//   ([e]) => e.target.classList.toggle(menuStuck, e.intersectionRatio < 1),
//   {threshold: [1]}
// );

// ----------------------------------- // HF method
// const navIsAtTop = () => {
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
//
// })
