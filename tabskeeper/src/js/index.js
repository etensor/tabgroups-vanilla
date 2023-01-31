// chrome://extensions/

``
import { loadGroups, reloadGroups, addNewGroup } from './loadgroups.js'
import { inputBtn,inputEl,entries,clearBtn,
  saveTabBtn,saveWindowBtn,linksLocalStorage,groupsTab, saveGroupBtn, exportBtn, openGroupBtn } from './elements.js'

import { render } from './render.js'

let newLinks = []
let tabGroups = {
  "_new": {
    'groupName': "_new",
    'urls': [],
    'titles': [],
    'favicons': []
  }
}

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
      if (tabGroups["_new"].urls.includes(tabs[0].url)){
      //if (newLinks.includes(tabs[0].url)) {
        console.log("Link already saved")
      }else{
        //tabGroups["_new"].urls.push(tabs[0].url)
        let subobj = (({ url, title, favIconUrl }) => ({ url, title, favIconUrl }))(tabs[0])
        tabGroups["_new"].titles.push(subobj.title)
        tabs[0].url.substr(-3) === "pdf" ? tabGroups["_new"].favicons.push("/static/pdf_file_ico.png") : tabGroups["_new"].favicons.push(subobj.favIconUrl)
        //newLinks.push(tabs[0].url)
        tabGroups['_new'].urls.push(tabs[0].url)
        localStorage.setItem("_new", JSON.stringify(tabGroups["_new"]))
        //render(newLinks) // they have been updated.
        render(tabGroups["_new"])
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
        loadGroups()
        addNewGroup()
        render(tabGroups[newWindowGroupName])
      })
})

saveGroupBtn.addEventListener("click", function(){
  //let currentDate = new Date().toJSON().slice(0, 10)
  if (tabGroups['_new'].urls.length == 0){
    return
  }
  let currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).split(' ').join('_');
  let newGroupName = prompt( "Name this group", currentDate )
  tabGroups[newGroupName] = JSON.parse(localStorage.getItem("_new") ?? {})
  localStorage.setItem(newGroupName, JSON.stringify(tabGroups[newGroupName]))
  localStorage.removeItem("_new")
  loadGroups()
  //reloadGroups()
  addNewGroup()
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
    if (tabGroups["_new"].urls.includes(inputEl.value)){
    //if (newLinks.includes(inputEl.value)) {
      console.log("Link already saved")
      document.getElementById("messages-box").innerHTML = "   ⚠    Link already saved"
      await delay(2800);
      document.getElementById("messages-box").innerHTML = ""
      
    }else{
      //newLinks.push(inputEl.value)
      tabGroups["_new"].urls.push(inputEl.value)
      tabGroups["_new"].titles.push(inputEl.value)
      tabGroups["_new"].favicons.push("")
      localStorage.setItem("_new", JSON.stringify(tabGroups["_new"]))
    }
  }
  inputEl.value = ""

  render(tabGroups["_new"])
})




clearBtn.addEventListener("dblclick", function(){
  if (!window.confirm("Are you sure you want to clear all saved links?"))
    return
  localStorage.clear()
  newLinks = []
  tabGroups = {
    "_new": {
      'groupName': "_new",
      'urls': [],
      'titles': [],
      'favicons': []
    }
  }
  loadGroups()
  render(newLinks)
})


exportBtn.addEventListener("click", function(){
  const blob = new Blob([
    JSON.stringify(tabGroups)], 
    {type: "text/plain;charset=utf-8"});
  
  const link = document.createElement("a");

  link.download = "tabGroups.json";
  link.href = URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();

})


openGroupBtn.addEventListener("click", function(){
  // special thanks to htrinter for this code,
  // modified from: 
  // github/htrinter/Open-Multiple-URLs/blob/develop/src/browseraction/load.ts
  const urlschemes = ["http", "https"]
  let urls = tabGroups["grupito"].urls

  for (let i = 0; i < urls.length; i++) {
    let urlx = urls[i].trim()
  //urls.forEach((url) => {
    
    if (urlschemes.indexOf(urlx.split(":")[0]) === -1 &&
        urlx.slice(0,4) !== "file") { 
      urlx = "https://" + urlx
    }

    chrome.tabs.create({
      url: urlx,
      active: false 
    })

  }

  console.log("Group opened.")
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
