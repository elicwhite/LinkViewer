'use strict';

var ImgurViewer = require('./viewers/imgur/imgur.js');
var OkCupidViewer = require('./viewers/okcupid/okcupid.js');
var HackerNewsViewer = require('./viewers/hackernews/hackernews.js');
var ShortenerViewer = require('./viewers/shortener/shortener.js');
var YoutubeViewer = require('./viewers/youtube/youtube.js');

var hostNames = {
  'www.okcupid.com': {
    '/profile': OkCupidViewer
  },
  'imgur.com': {
    '/a': ImgurViewer
  },
  'news.ycombinator.com': {
    '/item': HackerNewsViewer
  },
  'youtube.com': {
    '/watch':YoutubeViewer
  },
  'bit.ly': {
    '/*': ShortenerViewer
  },
  'tinyurl.com': {
    '/*': ShortenerViewer
  },
  'goo.gl': {
    '/*': ShortenerViewer
  }
};

function resolveViewer(a) {
  var paths = hostNames[a.hostname];

  if (paths) {
    var urlPathArray = a.pathname.split('/');
    for (var path in paths) {
      // Exact match?
      if (a.pathname.indexOf(path) === 0) {
        return paths[path];
      }
      else
      {
        // not an exact match, lets try to match parts
        var testPathArray = path.split('/');

        // If we require more pieces than the url has
        if (testPathArray.length > urlPathArray.length) {
          continue;
        }

        var matches = true;

        for (var i = 0; i < testPathArray.length; i++) {
          // Asterisk matches all paths
          if (testPathArray[i] == '*') {
            continue;
          }

          if (testPathArray[i] != urlPathArray[i]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          return paths[path];
        }
      }
    }
  }

  return false;
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