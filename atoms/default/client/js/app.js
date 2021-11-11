// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

// mainContent
const mainContent = document.getElementById('maincontent')
// get all H2s
const h2s = mainContent.querySelectorAll('h2')
console.log(h2s)

// get first set of links
const firstList = mainContent.querySelectorAll('ul')[0]
// const listItems = firstList.querySelectorAll('a')
// console.log(listItems)


function addNewList() {
    var newList = document.createElement("div")
    newList.setAttribute("id", "new-list")
    mainContent.prepend(newList)
    console.log(newList)
    // return newList
    for (var i = 0; i < h2s.length; i++) {
        h2s[i].setAttribute('id', 'nav' + i);
        var navLink = document.createElement('a');
        navLink.href = '#' + h2s[i].getAttribute('id');
        navLink.innerHTML = h2s[i].innerHTML
        console.log(navLink)
        newList.appendChild(navLink)
    }
}
addNewList()








// for (var i = 0; i < listItems.length; i++) {
//     listItems[i].setAttribute('href', '#' + 'nav' + i);
//     // var navLink = document.createElement('a');
//     // navLink.href = '#' + h2s[i].getAttribute('id');
// }