const navID             = 'jump-nav';
const anchorTag         = 'header';
const targetTag         = 'h2';
const targetTagInner    = 'strong';
const navTag            = 'nav';
const menuClass         = 'nav-class';
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

// Builds our url's. Currently the whole link but may need just urls output
function linkURL(targetElem, i) {
  let index = parseInt(i); // change string to interger to start at 1
  const anchorNode      = targetElem[i];
  const anchorID        = anchorIdLabel + (index+1);
  const linkTitle       = targetElem[i].innerText;
  const anchorIDTitle   = linkTitle.replace(/\s+/g, '-').toLowerCase();

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
const menuTargetArr = [].slice.call(menuTarget); // create an array for forEach in safari

// console.log(menuTargetArr);
let currItem = null;
let prevItem = null;
let options = {
  rootMargin: '0px 0px -75% 0px', // add for sticky menu reduce target area to top 25% of viewport for small sections
  threshold: 1.0
}

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const labelText = entry.target.textContent; // changed innerText to text Content to work in safari
      // previous is current
        prevItem = currItem;

        menuTargetArr.forEach(function(item){
          // loop through links to match active target text
          if ( labelText === item.textContent ) {

            item.classList.add('active');
            // get current item
            currItem = labelText;
            // console.log('currItem: ' + currItem);

          } else if ( prevItem === item.textContent ) {

            item.classList.add('prev');
            // console.log('prevItem: ' + prevItem);

          } else {

            item.classList.remove('active');
            item.classList.remove('prev');

          }
        });
      }
    });
  }, options);

sectionHeader.forEach(header => { observer.observe(header) });

// ---------------------------- Detect menu ----------------------------- //

// check for ul menu
// var getNextSibling = function (elem, selector) {
//
// 	// Get the next sibling element
// 	var sibling = elem.nextElementSibling;
//
// 	// If the sibling matches our selector, use it
// 	// If not, jump to the next sibling and continue the loop
// 	while (sibling) {
// 		if (sibling.matches(selector)) return sibling;
// 		sibling = sibling.nextElementSibling
// 	}
//
// };
// var findList = document.querySelector('ul');
// if () {
//   content.querySelector('ul').innerHTML
// }

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
