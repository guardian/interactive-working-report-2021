
var appTimer = 8000;

setTimeout(() => {
  console.log("js working")
}, appTimer)

const navID             = 'jump-nav'
const anchorTag         = 'header'
const targetTag         = 'h2'
const targetTagInner    = 'strong'
const videoBtnClass     = 'overlay-play-button'
const videoOverOutClass = 'video-overlay'
const videoOverInClass  = 'video-inner'
const videoBtnWrapClass = 'video-button-wrapper'
const navTag            = 'nav'
const menuClass         = 'nav-class'
const menuClassVid      = 'video-link'
const menuStuck         = 'stick-me'
const hideElem          = 'hide-app'
const navStatus         = 'open-nav'
const closeNav          = 'close-nav'
const navLabel          = 'nav-label'
const anchorIdLabel     = 'section'
const anchorClass       = 'section-header'
const vidClass          = 'video-section-header'
const navClass          = 'article-navigation'
const navBarClass       = 'nav-title-wrapper'
const navUtilityID      = 'nav-utility'
const outterMargin      = 'content--interactive-margin'

var mainContent
var articleContent
var targetElem
var firstList
var mainTitle
var videoOverlay
var videoplayer
var interClassElem
var videoClass
var videoOverlayAtt
var targetTagInnerAlt
var innerNodeAlt
const parentIsIos = window.parent.document.querySelector(".ios")
const parentIsAndroid = window.parent.document.querySelector(".android")
let menuTarget
let videoTimer
let sectionHeader
let navElem
let hashState = 0;
let navToggle
var vidCaptionTitle

const checkApp = () => {
  if (parentIsIos || parentIsAndroid) {
    // console.log('in app')
    // get our content container
    mainContent       = document.getElementById('article-body')
    articleContent    = document.querySelector('.article-body-viewer-selector')
    // get our target element
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
    videoClass        = '[data-component="youtube-atom"]';
    videoOverlayAtt   = 'figcaption';
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
videoplayer       = document.querySelector(videoClass);

// videoOverlay.addEventListener('load', function(){
//   // The image is ready!
// });

setTimeout(() => {
  console.log("checkApp & video")
}, appTimer)
// ---------------------------------------// Navigation //----------------------------------------------- //

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
  navToggle = document.getElementById(closeNav);

  newElem('span','','','','Toggle menu',navToggle,'after');
}

menuContainer(); // ******* Building this now because it's needed to add the links, but should be when *no* nav has been found
const navHolder = document.getElementById(navID); // added #2 to not conflict
const closeBtn = document.getElementById(closeNav);


// wrap our anchors
function addAnchorWrap(targetElem, i) {
  // let index             = parseInt(i);// change string to interger to start at 1
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

  anchorIDTitle   = concatTitle(linkTitle)

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
      anchorIDTitle   = concatTitle(linkTitle)
      anchorNode.setAttribute('id', anchorIDTitle);

    }
  } else {

    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt);

    if (anchorNode.contains(innerNode)) {
      // wrap our header element if it contains our inner node of strong
      wrapElem(anchorNode, titleWrapper);

    } else if (anchorNode.contains(innerNodeAlt)) {

      linkTitle       = innerNodeAlt.innerText;
      anchorIDTitle   = concatTitle(linkTitle);
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
for (let i = 0; i < targetElem.length; i++) {
  // wrap anchors
  addAnchorWrap(targetElem, [i]);

}

setTimeout(() => {
  console.log("addAnchorWrap")
}, appTimer)

function vidCaptionOverlay(linkTitle) {
  newElem('div','','',videoOverOutClass,'',videoOverlay,'after')
  const newVidWrapElem = document.querySelector('.video-overlay')
  newElem('div','','',videoOverInClass,linkTitle,newVidWrapElem,'after')
}

// Concatinate titles
function concatTitle(title) {
  const trimTitle = title.trim()
  const newURL = trimTitle.replace(/\s+/g, '-').replace(/’+/g, '').toLowerCase()
  return newURL;
}

// Builds our url's. Currently the whole link but may need just urls output
function linkURL(targetElem, i) {
  let index = parseInt(i); // change string to interger to start at 1
  let anchorNode      = targetElem[i];
  let innerNode       = anchorNode.querySelector(targetTagInner); // contains targetTagInner tag
  let linkTitle       = anchorNode.innerText; // only for H2s
  var anchorIDTitle   = concatTitle(linkTitle);
  let classArr        = menuClass + ' ' + menuClassVid;
  var linkHref        = '#' + anchorIDTitle; // using anchor text

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
    }

  } else {
    // Select target with em child tag
    innerNodeAlt    = anchorNode.querySelector(targetTagInnerAlt);

    // video caption for links
    if (anchorNode.contains(innerNode)) {

      newElem('a','href',linkHref,menuClass,linkTitle,navHolder,'after');
    } else if (anchorNode.contains(innerNodeAlt)) {

      linkTitle       = innerNodeAlt.innerText;
      anchorIDTitle   = concatTitle(linkTitle);
      linkHref        = '#' + anchorIDTitle;

      newElem('a','href',linkHref,classArr,linkTitle,navHolder,'after');
    }
  }
}
setTimeout(() => {
  console.log("before onload")
}, appTimer)

window.onload = function() {
  // Loop through and build menu links
  for (let i = 0; i < targetElem.length; i++) {
    // build link
    linkURL(targetElem, [i]);
  }
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

  sectionHeader = document.querySelectorAll('.' + anchorClass + ',' + videoClass);
  // nav menu
  menuTarget = document.getElementsByClassName(menuClass);

  sectionHeader.forEach(header => { anchorObserver.observe(header) });

  navElem = document.getElementsByClassName(menuClass);

  Array.from(navElem).forEach(function(item){
    item.addEventListener('click', (e) => {
      hashState = 1;
      navHolder.classList.remove(navStatus)
      navToggle.classList.toggle('open');
      // navHolder.classList.toggle(navStatus);
      setTimeout(() => {
        hashState = 0;
      }, 1000)
    });
  });

  // Navigation to stick
  const navHeight = navHolder.offsetHeight
  const navSpace = window.innerHeight - navHeight

  let obvsOptUp = {
    rootMargin: '0px 0px -' + navSpace + 'px 0px',
    threshold: [0.2,0.8]
  }

  let obvsCallbackUp = (entries, observerUp) => {
    entries.forEach(entry => {
      if ( entry.isIntersecting === true && entry.intersectionRatio > 0.8 ) {

        // setTimeout(() => {
          navHolder.classList.add(menuStuck)
          console.log('stick-me')
        // }, 1000)

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
  // remove hash
  let obvsTitleTop = new IntersectionObserver(obvsCallbackTitleTop, obvsOptsTitleTop);
  obvsTitleTop.observe(mainTitle);

  // hide nav app
  let obvsCallHideNav = (entries, obvsTitleTop) => {
    entries.forEach(entry => {
      if ( entry.isIntersecting ) {
        // add hide class
        navHolder.classList.add(hideElem)
        // console.log('video passing through')
      } else {
        // remove hide class
        navHolder.classList.remove(hideElem)
      }
    });
  };
  let obvsHideNav = new IntersectionObserver(obvsCallHideNav, obvsOptsTitleTop);
  obvsHideNav.observe(videoplayer);

  // Tracking
  const navLinks = document.querySelectorAll('.nav-class')
  navLinks.forEach((el, index) => {
    el.dataset.linkName = "working report 2021 : nav link " + index
  })

  interClassElem.classList.add(outterMargin)
};

setTimeout(() => {
  console.log("onload finished")
}, appTimer)
// Calculate height of sectionHeader
let headHeight = navHolder.offsetHeight
let headSpace = window.innerHeight - headHeight

let currItem = null;
let prevItem = null;

let anchorOptions = {
  rootMargin: '0px 0px -' + headSpace + 'px 0px',
  threshold: 0
}

let anchorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){

      let labelText
      let linkHash
      let currItemTxt

      if (entry.target.getAttribute('data-component') === "youtube-atom" ) {

        labelText = entry.target.lastChild.textContent.replace(/(\r\n|\n|\r)/gm, "").trim()

      } else {

        labelText = entry.target.textContent.replace(/(\r\n|\n|\r)/gm, "").trim()

      }

      headHeight = navHolder.offsetHeight
      headSpace = window.innerHeight - headHeight

      // is menu stuck?
      if (navHolder.classList.contains(menuStuck)) {

      } else {
        navHolder.classList.add(menuStuck)
      }

      // previous is current
      prevItem = currItem;
      // convert html collection to array to loop with forEach
      Array.from(menuTarget).forEach(function(item){

        currItemTxt = item.textContent.replace(/(\r\n|\n|\r)/gm, "").trim()

        if ( labelText === currItemTxt ) {

          linkHash = concatTitle(currItemTxt);

          updateHash(linkHash);

          item.classList.add('active');
          // get current item
          currItem = labelText;

        } else if ( prevItem === currItemTxt ) {

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

// sectionHeader.forEach(header => { anchorObserver.observe(header) });

// if menu has been clicked skip the auto update
// const navElem = document.getElementsByClassName(menuClass);

closeBtn.addEventListener('click', (e) => {
    navHolder.classList.toggle(navStatus);
    e.target.classList.toggle('open');
});

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

// remove hash at top of page
function removeHash(){
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

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
