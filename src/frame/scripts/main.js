'use strict';

var ImgurViewer = require('./viewers/imgur/imgur.js');
var OkCupidViewer = require('./viewers/okcupid/okcupid.js');
var HackerNewsViewer = require('./viewers/hackernews/hackernews.js');

var hostNames = {
  'www.okcupid.com': {
    '/profile': OkCupidViewer
  },
  'imgur.com': {
    '/a': ImgurViewer
  },
  'news.ycombinator.com': {
    '/item': HackerNewsViewer
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

function displayViewer(viewer, a) {
  // Display loading
  document.getElementById('loading').classList.remove('hidden');

  viewer.show(a);
}

function receiveMessage(event) {
  var url = event.data.url;
  var a = document.createElement('A');
  a.href = url;

  var viewer = resolveViewer(a);

  event.source.postMessage({
    hasViewer: !!viewer
  }, event.origin);

  if (viewer) {
    displayViewer(viewer, a);
  }
}

window.addEventListener('message', receiveMessage, false);