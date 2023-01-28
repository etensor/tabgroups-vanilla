const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const entries = document.getElementById("saved-entries")
const clearBtn = document.getElementById("clear-btn")
const saveTabBtn = document.getElementById("savetab-btn")
const saveWindowBtn = document.getElementById("savewindow-btn")
const linksLocalStorage = JSON.parse( localStorage.getItem("localGroup"))
const groupsTab = document.getElementById("groups-tab")

export {
    inputBtn,
    inputEl,
    entries,
    clearBtn,
    saveTabBtn,
    saveWindowBtn,
    linksLocalStorage,
    groupsTab
}