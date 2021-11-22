const navID             = 'jump-nav';
const anchorTag         = 'header';
const targetTag         = 'h2';
const targetTagInner    = 'strong';
const navTag            = 'nav';
const menuClass         = 'nav-class';
const menuStuck         = 'stick-me';
const anchorIdLabel     = 'section';
const anchorClass       = 'section-header';
const navClass          = 'article-navigation';
const navBarClass       = 'nav-title-wrapper';
const navUtilityID      = 'nav-utility';

// get our content contaciner
const mainContent = document.getElementById('maincontent');
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
  newElem('span','','','','Close',navUtility,'after');

}

menuContainer(); // ******* Building this now because it's needed to add the links, but should be when *no* nav has been found
const navHolder = document.getElementById(navID); // added #2 to not conflict

// wrap our anchors
function addAnchorWrap(targetElem, i) {
  let index = parseInt(i);// change string to interger to start at 1
  const anchorNode      = targetElem[i];
  const anchorID        = anchorIdLabel + (index+1);
  const linkTitle       = targetElem[i].innerText;
  const anchorIDTitle   = linkTitle.replace(/\s+/g, '-').toLowerCase();
  // console.log(anchorIDTitle);
  // create header element
  const titleWrapper = document.createElement(anchorTag);

  // titleWrapper.setAttribute('id', anchorID); // using section var
  titleWrapper.setAttribute('id', anchorIDTitle); // using anchor text

  titleWrapper.classList.add(anchorClass);

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
            // console.log(linkHash);
            updateHash(linkHash);

            item.classList.add('active');
            updateHash(url);
            // get current item
            currItem = labelText;
            // console.log('currItem: ' + currItem);


          } else if ( prevItem === item.textContent ) {

            item.classList.remove('active');
            item.classList.add('prev');
            // console.log('prevItem: ' + prevItem);

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
    console.log('click: ' + hashState);
  });
});

// hash url update
function updateHash(url) {
  // works on click but not using the keyboard
  if (hashState === 1) {
    console.log('dont update url: ' + hashState);
  } else {
    hashState = 0; // not working?
    window.location.hash = '#' + url;
    // console.log('NO click: ' + hashState);
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
//
// navIsAtTop.observe(navHolder);

const thresholdArray = steps => Array(steps + 1)
 .fill(0)
 .map((_, index) => index / steps || 0)

let previousY = 0
let previousRatio = 0

const handleIntersect = entries => {
  entries.forEach(entry => {
    const currentY = entry.boundingClientRect.y
    const currentRatio = entry.intersectionRatio
    const isIntersecting = entry.isIntersecting

    // Scrolling down/up
    if (currentY < previousY) {
      if (currentRatio > previousRatio && isIntersecting) {
        console.log("Scrolling down enter")
      } else {
        console.log("Scrolling down leave: Add my style - if -1px set")
        entry.target.classList.add(menuStuck);
      }
    } else if (currentY > previousY && isIntersecting) {
      if (currentRatio < previousRatio) {
        console.log("Scrolling up leave: Remove class")
      } else {
        console.log("Scrolling up enter: Remove my class - if -1px set doesn't work") // removes on way back up?
        // entry.target.classList.remove(menuStuck);
      }
    }

    previousY = currentY
    previousRatio = currentRatio
  })
}

const topObserver = new IntersectionObserver(handleIntersect, {
  threshold: thresholdArray(20),
})

topObserver.observe(navHolder)


// let navTopOptions = {
//   // rootMargin: '0px 0px 0px 0px',
//   threshold: [1]
// }
// half way there
// let navIsAtTop = new IntersectionObserver((entries, navHolder) => {
//   entries.forEach(entry => {
//     if(entry.intersectionRatio < 1){
//       entry.target.classList.toggle("stick-me");
//       // console.log('in view');
//     } else {
//       // console.log('stuck');
//     }
//   });
// }, navTopOptions);
//
// navIsAtTop.observe(navHolder)

// let navIsAtTop = new IntersectionObserver((entries, navHolder) => {
//   entries.forEach(entry => {
//     if(entry.intersectionRatio < 1){
//       entry.target.classList.toggle("stick-me");
//       // console.log('in view');
//     } else {
//       // console.log('stuck');
//     }
//   });
// }, navTopOptions);
//
// navIsAtTop.observe(navHolder)

// let navIsAtTop = new IntersectionObserver(callback, navTopOptions);
// navIsAtTop.observe(navHolder)

// let callback = (entries, navIsAtTop) => {
//   entries.forEach(entry => {
//     // Each entry describes an intersection change for one observed
//     // target element:
//       // console.log(entry.boundingClientRect)
//       console.log(entry.intersectionRatio)
//     //
//     //   entry.intersectionRect
//     //   entry.isIntersecting
//     //   entry.rootBounds
//     //   entry.target
//     //   entry.time
//   });
// };

//////////////////////////////////////////////////////////////////////////
// ---------------------------- Version 1 ----------------------------- //
//////////////////////////////////////////////////////////////////////////

// addNewList(); // inactive version
function addNewList() {
    // build navigation container
    const navHolder = document.createElement("nav")
    navHolder.setAttribute("id", "new-list")
    navHolder.classList.add("article-navigation")
    mainContent.prepend(navHolder)
    // Create nav wrapper
    const navTitleWrapper = document.createElement('div')
    navTitleWrapper.classList.add("nav-title-wrapper")
    navHolder.appendChild(navTitleWrapper)
    // create nav title and close button
    const navTitle = document.createElement('p')
    const navChevron = document.createElement('span')
    navTitle.innerHTML = "Jump to"
    navChevron.innerHTML = "Close"
    // add nav title and close button to the wrapper div
    navTitleWrapper.appendChild(navTitle)
    navTitleWrapper.appendChild(navChevron)

    for (var i = 0; i < targetElem.length; i++) {
        const anchorNode = targetElem[i];
        const anchorID = 'nav' + i;

        const titleWrapper = document.createElement('header');
        titleWrapper.setAttribute('id', anchorID);

        const marker = document.createElement('span')
        marker.classList.add("marker")
        titleWrapper.appendChild(marker)
        console.log(marker)

        // add new div
        anchorNode.parentNode.insertBefore(titleWrapper, anchorNode);
        // remove old H2
        anchorNode.parentNode.removeChild(anchorNode);
        // add H2 into div
        titleWrapper.appendChild(anchorNode);
        console.log(anchorNode)
        // create new nav links
        const navLink = document.createElement('a');
        // add hrefs to new links
        navLink.href = '#' + titleWrapper.getAttribute('id');
        // get h2 text and add to new links
        navLink.innerHTML = targetElem[i].innerHTML
        // add new links to nav list
        navHolder.appendChild(navLink)
    }
}


// const navIsAtTopOptions

// // detect when navHolder is at the top of the screen
// const navIsAtTop = new IntersectionObserver(
//   ([e]) => {
//     console.log(e.boundingClientRect.top)
//     console.log(e.target)
//     if (e.boundingClientRect.top < 1) {
//       console.log("we at top")
//       e.target.classList.add("we-pinnnned")
//     }
//   }
// );



// navIsAtTop.observe(navHolder)
