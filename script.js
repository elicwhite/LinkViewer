"use strict";

function init() {

  var frame = document.createElement("iframe");
  frame.src = chrome.extension.getURL("frame.html");
  frame.id = "qLinkPreview";
  document.body.appendChild(frame);


  document.addEventListener("mouseover", function(e) {
    if (e.target.tagName == "A") {

      frame.contentWindow.postMessage({
        url: e.target.href
      }, "*");
    }
  });


}

if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init, false);
}