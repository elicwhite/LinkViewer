"use strict";

function init() {

  var frame = document.createElement("iframe");
  frame.src = chrome.extension.getURL("build/frame/index.html");
  frame.id = "qLinkPreview";
  document.body.appendChild(frame);



  document.addEventListener("mouseover", function(e) {
    var timer = null;

    // We want to resolve either this tag or a couple tags up the chain
    var element = aInChain(e.target);

    function leaveListener() {
      if (timer === null) {
        frame.classList.remove("visible");
      } else {
        window.clearTimeout(timer);
      }

      element.removeEventListener("mouseout", leaveListener);
    }

    if (element && element.href) {
      timer = window.setTimeout(function() {
        timer = null;

        frame.contentWindow.postMessage({
          url: element.href
        }, "*");

        frame.classList.add("visible");
      }, 500);

      element.addEventListener("mouseout", leaveListener);
    }
  });

  function aInChain(element, counter) {
    if (!element || counter === 0) {
      return false;
    }

    if (element.tagName == "A") {
      return element;
    }

    // If we haven't set a counter, start it at 4
    if (!counter) {
      counter = 4;
    }

    return aInChain(element.parentNode, counter--);
  }
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init, false);
}