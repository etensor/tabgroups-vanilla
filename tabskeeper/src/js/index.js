// chrome://extensions/

let newLinks = []
let tabGroups = {}

import { loadGroups, reloadGroups } from './loadgroups.js'
import { inputBtn,inputEl,entries,clearBtn,
  saveTabBtn,saveWindowBtn,linksLocalStorage,groupsTab, saveGroupBtn } from './elements.js'

import { render } from './render.js'


if (linksLocalStorage){
  newLinks = linksLocalStorage
  loadGroups()
  render(newLinks)
}

// haxitos time
const delay = ms => new Promise(res => setTimeout(res, ms));

inputEl.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    inputBtn.click();
  }
})


saveTabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true},
    function(tabs){
      if (newLinks.includes(tabs[0].url)) {
        console.log("Link already saved")
      }else{
        newLinks.push(tabs[0].url)
        localStorage.setItem("_new", JSON.stringify(newLinks))
        render(newLinks) // they have been updated.
      }
    })
})

// Object Deconstruct and property shorthand
saveWindowBtn.addEventListener("click", function(){
  chrome.tabs.query({currentWindow: true},
      function(tabs){
        let currentDate = new Date().toJSON().slice(0, 10)
        let newWindowGroupName = prompt( "Name this group", currentDate )

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
        tabGroups = loadGroups()
        render(tabGroups[newWindowGroupName])
      })
})

saveGroupBtn.addEventListener("click", function(){
  let currentDate = new Date().toJSON().slice(0, 10)
  let newGroupName = prompt( "Name this group", currentDate )
  tabGroups[newGroupName] = JSON.parse(localStorage.getItem("_new") ?? {})
  localStorage.setItem(newGroupName, JSON.stringify(tabGroups[newGroupName]))
  localStorage.removeItem("_new")
  loadGroups()
  reloadGroups()
  render(tabGroups[newGroupName])
  
})




function objectReduce(_orgObj,...args){
  let newObj = {}
  args.forEach(x => newObj[x] = _orgObj)
  return newObj
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


inputBtn.addEventListener("click", async function() {
  //entries.innerHTML += "<li>" + entry.value + "</li>"
  if (inputEl.value){
    if (newLinks.includes(inputEl.value)) {
      console.log("Link already saved")
      document.getElementById("messages-box").innerHTML = "   ⚠    Link already saved"
      await delay(2800);
      document.getElementById("messages-box").innerHTML = ""
      
    }else{
      newLinks.push(inputEl.value)
      localStorage.setItem("_new", JSON.stringify(newLinks))
    }
  }
  inputEl.value = ""

  render(newLinks)
})




clearBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  newLinks = []
  tabGroups = {}
  loadGroups()
  render(newLinks)
})

loadGroups()

reloadGroups()

