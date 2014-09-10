"use strict";

var DefaultViewer = require("./viewers/default/default.js");
var ImgurViewer = require("./viewers/imgur/imgur.js");
var ProductHuntViewer = require("./viewers/productHunt/productHunt.js");

window.addEventListener("message", receiveMessage, false);

var hostNames = {
  "www.producthunt.com": {
    "/l": ProductHuntViewer
  },
  "imgur.com": {
    "/a": ImgurViewer
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

  return DefaultViewer;
}

function receiveMessage(event) {
  var url = event.data.url;
  var a = document.createElement("A");
  a.href = url;

  var viewer = resolveViewer(a);

  displayViewer(viewer, a);
}

function displayViewer(viewer, a) {
  // Display loading
  document.getElementById("loading").classList.remove("hidden");

  viewer.show(a);
}