"use strict";

function getPage(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!

        var parser = new DOMParser();
        var doc = parser.parseFromString(request.response, "text/html");

        resolve(doc);
      } else {
        // We reached our target server, but it returned an error
        reject(request);
      }
    };

    request.onerror = function(error) {
      // There was a connection error of some sort
      reject(error);
    };

    request.send();
  });
}

exports.getPage = getPage;