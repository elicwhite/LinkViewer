'use strict';

function init() {

  var frame = document.createElement('iframe');
  frame.src = chrome.extension.getURL('frame/index.html');
  frame.id = 'qLinkPreview';
  frame.scrolling = 'no';
  frame.frameBorder = 0;
  document.body.appendChild(frame);

  document.addEventListener('mouseover', function(e) {
    var timer = null;

    // We want to resolve either this tag or a couple tags up the chain
    var element = aInChain(e.target);

    function leaveListener() {
      if (timer === null) {
        frame.classList.remove('visible');
      } else {
        window.clearTimeout(timer);
      }

      element.removeEventListener('mouseout', leaveListener);
    }

    if (element && element.href) {
      timer = window.setTimeout(function() {
        sendUrl(element.href)
        .then(function() {
          timer = null;

          // center the frame on the cursor
          frame.style.left = (e.pageX + 50) + 'px';
          frame.style.top = (e.pageY - (250 / 2)) + 'px';


          frame.classList.add('visible');
        });
      }, 500);

      element.addEventListener('mouseout', leaveListener);
    }
  });

  function aInChain(element, counter) {
    if (!element || counter === 0) {
      return false;
    }

    if (element.tagName == 'A') {
      return element;
    }

    // If we haven't set a counter, start it at 4
    if (!counter) {
      counter = 4;
    }

    return aInChain(element.parentNode, counter--);
  }

  function sendUrl(url) {
    return new Promise(function(resolve, reject) {
      function gotMessage(event) {
        if (event.data.hasViewer) {
          resolve();
        } else {
          reject();
        }

        window.removeEventListener('message', gotMessage);
      }

      window.addEventListener('message', gotMessage);

      frame.contentWindow.postMessage({
        url: url
      }, '*');
    });
  }
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}