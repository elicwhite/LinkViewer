'use strict';

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

function parsePageFromRequest(request) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(request.response, 'text/html');

  return doc;
}

function getJSON(url) {
  return getURL(url).then(function(request) {
    return JSON.parse(request.responseText);
  });
}

function getPage(url) {
  return getURL(url).then(parsePageFromRequest);
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

function stringifyTimestamp(timestamp) {
  var date = typeof(timestamp) == 'object' ? timestamp : new Date(timestamp * 1000);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}

module.exports = {
  getURL: getURL,
  getJSON: getJSON,
  getPage: getPage,
  parsePageFromRequest: parsePageFromRequest,
  getQueryVariable: getQueryVariable,
  stringifyTimestamp: stringifyTimestamp
};