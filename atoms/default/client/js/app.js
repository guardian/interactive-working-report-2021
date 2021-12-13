
setTimeout(() => {
  console.log("js working")
}, 30000)

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
    console.log('in app')
    // get our content container
    mainContent       = document.querySelector('.article--standard')
    articleContent    = document.querySelector('.article-body-viewer-selector')
    // get our target element
    // videoClass        = '.element-youtube'
    videoClass        = '[data-atom-type="media"]'
    videoOverlayAtt = '.youtube-media__sdk-placeholder'
    targetElem        = mainContent.querySelectorAll(targetTag + ',' + videoClass);
    // get first set of links
    firstList         = mainContent.querySelectorAll('ul')[0] // ********* only needed if menu list exists
    mainTitle         = document.querySelector('.headline');
    // page structurer
    interClassElem = document.querySelector('.article--standard');
    targetTagInnerAlt = '.youtube-sdk-caption'; // as soon as we have images in the page it breaks

  } else {
    console.log('on web')
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
//   console.log('overlay loaded');
// });

interClassElem.classList.add(outterMargin)
// ----------------------------------------// Headers // ----------------------------------------------- //

// const mainHeader = document.querySelector('.content__headline')
// const standFirst = document.querySelector('.content__standfirst')
// const metaShares = document.querySelector('.content__meta-container_dcr')
// // console.log('mainHeader: ' + mainHeader)
// mainHeader.parentElement.parentElement.parentElement.parentElement.classList.add("headline-wrapper")
// standFirst.parentElement.classList.add("standFirst-wrapper")
// metaShares.parentElement.parentElement.classList.add("meta-shares-wrapper")
//
// const headWrapper = document.querySelector('.headline-wrapper')
// const metaWrapper = document.querySelector('.meta-shares-wrapper')
// // remove grid line
// headWrapper.previousSibling.remove();
// // remove horizontal lines
// metaWrapper.previousSibling.remove();
//
// const mainHeaderWrapper  = document.createElement('header');
//
// mainHeaderWrapper.append(mainHeader,standFirst,metaShares)
//
// mainContent.prepend(mainHeaderWrapper)
//
// mainHeader.classList.add('show-content')

// ---------------------------------------// Navigation //----------------------------------------------- //

// creates elements with attributes and adds them *NB Needs refinement?
function newElem(tagName,attType,attName,className,content,contentHolder,position) {

  const newElem2 = document.createElement(tagName);
  const menuClasses = [className]
  const menuClassesString = className
  // console.log(...menuClasses) // why doesn't this work?
  // console.log('menuClassesString: ' + menuClassesString)

  if (className !== '' ) {
    // newElem2.classList.add(...menuClasses); // why doesn't this work?
    newElem2.className = menuClassesString
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

  newElem('span','','','','Toggle menu',navToggle,'after');
}

menuContainer(); // ******* Building this now because it's needed to add the links, but should be when *no* nav has been found
const navHolder = document.getElementById(navID); // added #2 to not conflict
const closeBtn = document.getElementById(closeNav);

var vidCaptionTitle = '';

// wrap our anchors
function addAnchorWrap(targetElem, i) {
  let index             = parseInt(i);// change string to interger to start at 1
  const anchorNode      = targetElem[i];

  // Select target with strong child tag
  const innerNode       = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag

  let anchorIDTitle   = '';
  // const anchorID        = anchorIdLabel + (index+1); // unused
  let linkTitle       = targetElem[i].innerText;

  if (parentIsIos || parentIsAndroid) {
    innerNodeAlt = document.querySelector(targetTagInnerAlt); // targets any figcation NOT video figcaption ******

  } else {
    // Select target with em child tag
    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt); // targets any figcation NOT video figcaption ******
  }

  if (anchorNode.contains(innerNodeAlt)) {
    // console.log(innerNodeAlt.innerText)
    linkTitle           = innerNodeAlt.innerText.replace(/(\r\n|\n|\r)/gm, "")
    setTimeout(() => {
      console.log("linkTitle Wrap: " + linkTitle)
    }, 25000)
    // console.log(anchorNode);
    anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase()
    if(videoOverlay){
      videoOverlay.setAttribute('id', anchorIDTitle);
    }
  }

  anchorIDTitle   = linkTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();
  // console.log(anchorIDTitle);
  // create header element
  const titleWrapper = document.createElement(anchorTag);
  // const videoTitleWrapper = document.createElement(anchorTag); // not wrapping now

  // titleWrapper.setAttribute('id', anchorID); // using section var
  titleWrapper.setAttribute('id', anchorIDTitle); // using anchor text

  // console.log(videoOverlay)
  // add class
  titleWrapper.classList.add(anchorClass); // standard section header


  if (anchorNode.contains(innerNode)) {
    // wrap our header element if it contains our inner node of strong
    wrapElem(anchorNode, titleWrapper);
  } else if (anchorNode.contains(innerNodeAlt)) {

    const videoBtnWrap = document.querySelector('.' + videoBtnClass).parentElement
    videoBtnWrap.classList.add(videoBtnWrapClass)

    setTimeout(() => {
      // newElem('div','','',videoOverOutClass,'',videoOverlay,'after')
      // const newVidWrapElem = document.querySelector('.video-overlay')
      // newElem('div','','',videoOverInClass,linkTitle,newVidWrapElem,'after')
      vidCaptionOverlay(linkTitle)
      // vidCaptionTitle = linkTitle
    }, 1000) // remove 2000 as it should only trigger when content loaded
  }
}
// console.log('vidCaptionTitle: ' + vidCaptionTitle);

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
//             console.log('A child node has been added or removed.');
//         }
//         else if (mutation.type === 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.');
//         } else {
//           console.log('none of the above')
//         }
//     }
// };
// // Create an observer instance linked to the jsElemCallback function
// const jsElemObserver = new MutationObserver(jsElemCallback);
// // Start observing the target node for configured mutations
// jsElemObserver.observe(videoOverlayElem, jsElemConfig);
// // Later, you can stop observing
// jsElemObserver.disconnect();

// Concatinate titles
function concatTitle(title) {
  const newURL = title.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase();
  // const newURL = title.replace(/[’\s]+/g, '-').toLowerCase();
  // console.log(title.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase()) // check why id isn't the same?
  return newURL;
}
// Builds our url's. Currently the whole link but may need just urls output
function linkURL(targetElem, i) {
  let index = parseInt(i); // change string to interger to start at 1
  const anchorNode      = targetElem[i];
  // const anchorID        = anchorIdLabel + (index+1);  // unused
  const innerNode       = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag

  let linkTitle         = targetElem[i].innerText;

  // const linkWrapper     = titleWrapper.append(linkTitle);
  let anchorIDTitle     = concatTitle(linkTitle);
  const classArr        = menuClass + ' ' + menuClassVid;

  // const linkHref = '#' + anchorID; // using section variable
  const linkHref = '#' + anchorIDTitle; // using anchor text

  if (parentIsIos || parentIsAndroid) {
    innerNodeAlt    = document.querySelector(targetTagInnerAlt);
    var x = innerNodeAlt.parentElement;

    setTimeout(() => {
      console.log(anchorNode)
      console.log(x)
      console.log(anchorNode.nextElementSibling)
      console.log(x === anchorNode.nextElementSibling)
      console.log("linkTitle URL: " + linkTitle)
    }, 17000)

    if (anchorNode.contains(innerNode)) {
      newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');
    } else if (x === anchorNode.nextElementSibling) {
      linkTitle       = innerNodeAlt.innerText;
      // anchorIDTitle   = concatTitle(linkTitle);
      // linkHref = '#' + anchorIDTitle;
      newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');
      setTimeout(() => {
        console.log("newElem created")
        console.log(linkTitle)
        console.log(anchorIDTitle)
        console.log(linkHref)
      }, 17000)
    }

  } else {
    // Select target with em child tag
    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt);

    // video caption for links
    if (anchorNode.contains(innerNode)) {
      newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');
    } else if (anchorNode.contains(innerNodeAlt)) {
      // console.log(innerNodeAlt.innerText)
      linkTitle     = innerNodeAlt.innerText;
      newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');
    }
  }

  // else if (anchorNode.contains(innerNodeAlt)) {
  //   newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');
  // }
}

// Loop through and build anchors and menu links
for (let i = 0; i < targetElem.length; i++) {
  // console.log(targetElem);
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
let sectionHeader = document.querySelectorAll('.' + anchorClass + ',' + videoOverlayAtt); // works with - videoOverlayAtt
// nav menu
const menuTarget = document.getElementsByClassName(menuClass);
// video timer
const videoTimer = document.querySelector('.' + videoBtnWrapClass).textContent;
// console.log('videoTimer: ' + videoTimer);

// We may need to calculate height of sectionHeader? <-------------------------- check if we need to do some calculations
let headHeight = navHolder.offsetHeight
let headSpace = window.innerHeight - headHeight

let currItem = null;
let prevItem = null;

let anchorOptions = {
  rootMargin: '0px 0px -' + headSpace + 'px 0px', // <-------------------------- check if we need to do some calculations
  // rootMargin: '0px 0px -50% 0px', // add for sticky menu reduce target area to top 25% of viewport for small sections // too tight?
  threshold: 0                                  // <-------------------------- check if we need to do some calculations
}

let anchorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      let labelText = entry.target.textContent; // changed innerText to textContent to work in safari
      headHeight = navHolder.offsetHeight
      headSpace = window.innerHeight - headHeight
      // remove the time string
      if (labelText.startsWith(videoTimer)) {
        labelText = labelText.replace(videoTimer, "");
        console.log('labelText if: ' + labelText)
      }
      // previous is current
      prevItem = currItem;
      // convert html collection to array to loop with forEach
      Array.from(menuTarget).forEach(function(item){
        // loop through links to match active target text
        // console.log('item.textContent: ' + item.textContent)
        if ( labelText === item.textContent ) {
          // console.log('labelText: ' + labelText)
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

// const mainHeadHeight = mainTitle.offsetHeight
// const mainHeadSpace = window.innerHeight - mainHeadHeight

// remove hash at top of page watching mainTitle
let obvsOptsTitleTop = {
  // rootMargin: '0px 0px -' + mainHeadSpace + 'px 0px',
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

let obvsTitleTop = new IntersectionObserver(obvsCallbackTitleTop, obvsOptsTitleTop);
obvsTitleTop.observe(mainTitle);

// By line
// wrap following p tag if contains em and strong only
const bylineBox = document.getElementsByClassName(anchorClass)
const myList = Array.from(bylineBox)

myList.forEach(function(sectHeader){

  const nextPtagID = sectHeader.nextElementSibling.hasAttribute('id')
  // if the gate remove it
  if (nextPtagID && sectHeader.nextElementSibling.id === 'sign-in-gate' ) {
    // console.log('YES: ' + sectHeader.nextElementSibling.id)
    sectHeader.nextElementSibling.remove()
  }
  const innerNode = sectHeader.nextElementSibling.querySelector('em');
  if (innerNode !== null) {

    const innerMostNode = innerNode.querySelector('strong') // target only if strong within em

    if (innerMostNode !== null) {
      // console.log(innerMostNode)
      innerMostNode.parentElement.parentElement.classList.add("byline-box");
    }
  }
});

//
// var MY_SELECTOR = videoOverlayAtt // Could be any selector
//
// var vidObserver = new MutationObserver(function(mutations){
//   for (var i=0; i < mutations.length; i++){
//     for (var j=0; j < mutations[i].addedNodes.length; j++){
//       // We're iterating through _all_ the elements as the parser parses them,
//       // deciding if they're the one we're looking for.
//       if (mutations[i].addedNodes[j].matches(MY_SELECTOR)){
//         conosle.log("My Element Is Ready!");
//
//         // We found our element, we're done:
//         vidObserver.disconnect();
//       };
//     }
//   }
// });
//
// vidObserver.observe(document.documentElement, {
//   childList: true,
//   subtree: true
// });


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
