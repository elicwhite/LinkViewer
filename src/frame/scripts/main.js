"use strict";

var ImgurViewer = require("./viewers/imgur/imgur.js");
var OkCupidViewer = require("./viewers/okcupid/okcupid.js");
var YCombinatorViewer = require("./viewers/ycombinator/ycombinator.js");

window.addEventListener("message", receiveMessage, false);

var hostNames = {
  "www.okcupid.com": {
    "/profile": OkCupidViewer
  },
  "imgur.com": {
    "/a": ImgurViewer
  },
  "news.ycombinator.com": {
    "/item": YCombinatorViewer
  }
};

function resolveViewer(a) {
  var paths = hostNames[a.hostname];

  if (paths) {
    for (var path in paths) {
      if (a.pathname.indexOf(path) === 0) {
        return paths[path];
      }
    }
  }
}

function receiveMessage(event) {
  var url = event.data.url;
  var a = document.createElement("A");
  a.href = url;

  var viewer = resolveViewer(a);

  event.source.postMessage({
    hasViewer: !!viewer
  }, event.origin);

  if (viewer) {
    displayViewer(viewer, a);
  }
}

function displayViewer(viewer, a) {
  // Display loading
  document.getElementById("loading").classList.remove("hidden");

  viewer.show(a);
}