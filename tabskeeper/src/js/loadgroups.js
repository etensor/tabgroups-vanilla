import { groupsTab } from './elements.js'
import { render } from './render.js'
// import { tabGroups } from './index.js'


export function getTabGroups(){
    let groups_tabs = {}
    let groupNames = Object.keys(localStorage)
    if (groupNames){
    groupNames.forEach(group => {
        groups_tabs[group] = JSON.parse(localStorage.getItem(group))
    });
    }
    return groups_tabs
}

export function loadGroups(){
    let keys = Object.keys(localStorage)
    let tabContent = "<h4>Groups</h4>"

    for (let i = 0; i < keys.length; i++) {
        /*tabContent += `
        <li>
          <a target="_self" onclick="printGroup('${keys[i]}')">
            ${keys[i]}
          </a>
        </li>
        */
        tabContent += `
    <li>
      <a id="group-${i}" href='#'>
        ${keys[i]}
      </a>
    </li>
    `
    }

    groupsTab.innerHTML = tabContent
}

export function addNewGroup() {
  let newGroup = document.querySelector(`a[id^="group-${Object.keys(localStorage).length - 1}"]`)
  newGroup.addEventListener("click", function () {
    let groups = getTabGroups()
    render(groups[Object.keys(localStorage)[Object.keys(localStorage).length - 1]])
  })
}

export function reloadGroups() {
    let tabGroups = {}
    let groupNames = Object.keys(localStorage)
    if (groupNames){
    groupNames.forEach(group => {
        tabGroups[group] = JSON.parse(localStorage.getItem(group))
    });
    }


    let groupLinks = document.querySelectorAll("a[id^='group-']")
    for (let i = 0; i < groupNames.length; i++) {
    // doesnt exist
    //groupLinks[i].hasEventListener("click", null, false)?? 
    groupLinks[i].addEventListener("click", function () {
        render(tabGroups[groupNames[i]])
    })
    }
}