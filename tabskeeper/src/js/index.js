// chrome://extensions/

let newLinks = []
let tabGroups = {}

import { loadGroups } from './loadgroups.js'
import { inputBtn,inputEl,entries,clearBtn,
  saveTabBtn,saveWindowBtn,linksLocalStorage,groupsTab }from './objs.js'


if (linksLocalStorage){
  newLinks = linksLocalStorage
  loadGroups()
  render(newLinks)
}


loadGroups()


saveTabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true},
    function(tabs){
      if (newLinks.includes(tabs[0].url)) {
        console.log("Link already saved")
      }else{
        newLinks.push(tabs[0].url)
        localStorage.setItem("localGroup", JSON.stringify(newLinks))
        render(newLinks) // they have been updated.
      }
    })
})

// Object Deconstruct and property shorthand
saveWindowBtn.addEventListener("click", function(){
  chrome.tabs.query({currentWindow: true},
      function(tabs){
        let newWindowGroupName = prompt("Name this group", "HaxingTabs")

        tabGroups[newWindowGroupName] = {
          'groupName': newWindowGroupName,
          'urls': [],
          'titles': [],
          'favicons': [],
        }

        for (let idx = 0; idx < tabs.length; idx+=1){
          let subobj = (({ url, title, favIconUrl }) => ({ url, title, favIconUrl }))(tabs[idx])

          tabGroups[newWindowGroupName].urls.push(subobj.url)
          tabGroups[newWindowGroupName].titles.push(subobj.title)
          tabGroups[newWindowGroupName].favicons.push(subobj.favIconUrl)
          
        } 
        console.log(tabGroups)
        localStorage.setItem(newWindowGroupName, JSON.stringify(tabGroups[newWindowGroupName]))
        loadGroups()
        render(tabGroups[newWindowGroupName])
      })
})

function objectReduce(_orgObj,...args){
  let newObj = {}
  args.forEach(x => newObj[x] = _orgObj)
  return newObj
}


function render(links_arr){
  let listEntries = ""
  
  if (Array.isArray(links_arr)){
    for (let i = 0; i < links_arr.length; i++) {
      // template string -> raw <- supports js
      listEntries += `
    <li>
        <a target='_blank' href='${links_arr[i]}'>
            ${links_arr[i]}
        </a>
        <hr/>
    </li>
    `
    }
  }else{ // an object <- a group of links
    for (let i = 0; i < links_arr.titles.length; i++){
      // template string -> raw <- supports js
      listEntries += `
      <li>
          <img src='${links_arr.favicons[i]}' width=16 height=16/>
          <a id='linkG-${i}' target='_blank' href='${links_arr.urls[i]}'>
          ${links_arr.titles[i]}
          </a>
          <hr/>
      </li>
      `
    }
  }
  entries.innerHTML = listEntries
}


//let thisSite = prompt("Alalo papu", "euler")
//document.getElementById("savedEntries").innerHTML += `Hello ${thisSite}, bien o que`;
/*
async function getCurrentTab(){
  let queryOptions = {active: true};
  let tab = await chrome.tabs.query(queryOptions);
  return tab[0];
}
*/


inputBtn.addEventListener("click", function() {
  //entries.innerHTML += "<li>" + entry.value + "</li>"
  if (inputEl.value){
    if (newLinks.includes(inputEl.value)) {
      console.log("Link already saved")
    }else{
      newLinks.push(inputEl.value)
      localStorage.setItem("localGroup", JSON.stringify(newLinks))
    }
  }
  inputEl.value = ""

  render(newLinks)
})




clearBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  newLinks = []
  tabGroups = {}
  render(newLinks)
})

loadGroups()



let groupLinks = document.querySelectorAll("a[id^='group-']")
let groupNames = Object.keys(localStorage)
if (groupNames){
  groupNames.forEach(group => {
    tabGroups[group] = JSON.parse(localStorage.getItem(group))
  });
}

for (let i = 0; i < groupNames.length; i++) {
  groupLinks[i].addEventListener("click", function () {
    
    render(tabGroups[groupNames[i]])
  })
}
