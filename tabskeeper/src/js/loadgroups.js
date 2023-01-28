import { groupsTab } from './elements.js'
import { render } from './render.js'

export function loadGroups(){
    let keys = Object.keys(localStorage)
    let tabContent = "<h4>Groups</h4>"
    let tabGroups = {}
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

    let groupLinks = document.querySelectorAll("a[id^='group-']")
    let groupNames = Object.keys(localStorage)
    if (groupNames){
      groupNames.forEach(group => {
        tabGroups[group] = JSON.parse(localStorage.getItem(group))
      });
      
      console.log(groupNames)
    }

    for (let i = 0; i < groupNames.length; i++) {
      groupLinks[i].addEventListener("click", function () {

        render(tabGroups[groupNames[i]])
      })
    }


    groupsTab.innerHTML = tabContent
}

export function reloadGroups() {
    let groupNames = Object.keys(localStorage)
    if (groupNames){
    groupNames.forEach(group => {
        tabGroups[group] = JSON.parse(localStorage.getItem(group))
    });
    }


    let groupLinks = document.querySelectorAll("a[id^='group-']")
    for (let i = 0; i < groupNames.length; i++) {
    groupLinks[i].hasEventListener("click", null, false)?? groupLinks[i].addEventListener("click", function () {
        render(tabGroups[groupNames[i]])
    })
    }
}