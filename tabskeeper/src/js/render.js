import { entries } from './elements.js'

export function render( links_arr ){
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
          <img src='${links_arr.favicons[i]}' width=16 height=16/> &nbsp;&nbsp;
          <a id='linkG-${i}' target='_blank' href='${fixUrl(links_arr.urls[i])}'>
          ${links_arr.titles[i]}
          </a>
          <hr/>
      </li>
      `
    }
  }
  entries.innerHTML = listEntries
}

function fixUrl(url){
  let urlx = url.trim()

  if (url.indexOf(' ') >= 0 || urlx.startsWith("file://")){ return "about:blank"}
  if (!urlx.startsWith("http") & !urlx.endsWith("pdf")){
    urlx = "https://" + urlx
  }
  if (urlx.startsWith("file://")){

  }

  return urlx
}

