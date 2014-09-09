"use strict";

function init() {

  var frame = document.createElement("iframe");
  frame.src = chrome.extension.getURL("frame.html");
  frame.id = "qLinkPreview";
  document.body.appendChild(frame);


  document.addEventListener("mouseover", function(e) {
    var timer = null;

    function leaveListener() {
      if (timer == null) {
        frame.classList.remove("visible");
      } else {
        window.clearTimeout(timer);
      }

      e.target.removeEventListener("mouseout", leaveListener);
    }

    if (e.target.tagName == "A") {
      timer = window.setTimeout(function() {
        timer = null;

        frame.contentWindow.postMessage({
          url: e.target.href
        }, "*");

        frame.classList.add("visible");
      }, 500);



      e.target.addEventListener("mouseout", leaveListener);
    }
  });


}

if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init, false);
}