// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

// mainContent
const mainContent = document.getElementById('maincontent')
// get all H2s
const targetElem = mainContent.querySelectorAll('h2')
// console.log(targetElem)

// get first set of links
const firstList = mainContent.querySelectorAll('ul')[0] // only needed if menu list exists

function wrapElem(tagName,idName,className,targetContainer) {
  // build wrappers add content
  const newList = document.createElement(tagName);
  newList.setAttribute('id', idName);
  newList.classList.add(className);
  targetContainer.prepend(newList)

}

// wrapElem('div','new-list2','article-navigation',mainContent);

function addNewList() {
    // build navigation container
    const newList = document.createElement("nav")
    newList.setAttribute("id", "new-list")
    newList.classList.add("article-navigation")
    mainContent.prepend(newList)

    // console.log(wrapElem('div','new-list2','article-navigation',mainContent));

    // Create nav wrapper
    const navTitleWrapper = document.createElement('div')
    navTitleWrapper.classList.add("nav-title-wrapper")
    newList.appendChild(navTitleWrapper)
    // create nav title and close button
    const navTitle = document.createElement('p')
    const navChevron = document.createElement('span')
    navTitle.innerHTML = "Jump to"
    navChevron.innerHTML = "Close"
    // add nav title and close button to the wrapper div
    navTitleWrapper.appendChild(navTitle)
    navTitleWrapper.appendChild(navChevron)

    for (var i = 0; i < targetElem.length; i++) {
        var node = targetElem[i];
        // create new div
        const titleWrapper = document.createElement('div')
        titleWrapper.setAttribute('id', 'nav' + i)
        const marker = document.createElement('span')
        marker.classList.add("marker")
        titleWrapper.appendChild(marker)
        console.log(marker)
        // add new div
        node.parentNode.insertBefore(titleWrapper, node);
        // remove old H2
        node.parentNode.removeChild(node);
        // add H2 into div
        titleWrapper.appendChild(node);
        console.log(node)

        // create new nav links
        var navLink = document.createElement('a');
        // add hrefs to new links
        navLink.href = '#' + titleWrapper.getAttribute('id');
        // get h2 text and add to new links
        navLink.innerHTML = targetElem[i].innerHTML
        // add new links to nav list
        newList.appendChild(navLink)

    }


}
addNewList()
