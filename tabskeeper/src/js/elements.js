const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const entries = document.getElementById("saved-entries")
const clearBtn = document.getElementById("clear-btn")
const saveTabBtn = document.getElementById("savetab-btn")
const saveWindowBtn = document.getElementById("savewindow-btn")
const linksLocalStorage = JSON.parse( localStorage.getItem("_new"))
const groupsTab = document.getElementById("groups-tab")
const saveGroupBtn = document.getElementById("savegroup-btn")
const exportBtn = document.getElementById("export-btn")
const openGroupBtn = document.getElementById("opengroup-btn")


export {
    inputBtn,
    inputEl,
    entries,
    clearBtn,
    saveTabBtn,
    saveWindowBtn,
    linksLocalStorage,
    groupsTab,
    saveGroupBtn,
    exportBtn,
    openGroupBtn
}