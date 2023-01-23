import { groupsTab } from './objs.js'

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