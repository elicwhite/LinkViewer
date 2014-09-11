"use strict";

function getURL(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        resolve(request);
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

function getJSON(url) {
  return getURL(url).then(function(request) {
    debugger;
    return JSON.parse(request.responseText);
  });
}

function getPage(url) {
  return getURL(url).then(function(request) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(request.response, "text/html");

    return doc;
  });
}

function getQueryVariable(url, variable) {
  var query = url.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  return undefined;
}

exports.getJSON = getJSON;
exports.getPage = getPage;
exports.getQueryVariable = getQueryVariable;