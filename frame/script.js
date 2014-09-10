"use strict";

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

function ImgurViewer(url) {
  if (url.href.indexOf("?gallery") === -1) {
    url.href+="?gallery";
  }

  getPage(url).then(function(page) {
    // debugger;
    var template = getTemplate("imgur");

    var urls = [];

    var images = page.getElementsByClassName("thumb-title");

    for (var i = 0; i < images.length; i++) {
      urls.push('<img src="'+url.scheme+images[i].dataset.src+'" />');
    }

    var ul = template.getElementsByClassName("images")[0];
    ul.innerHTML = "<li>"+urls.join("</li><li>")+"</li>";

    applyTemplate(template);
  });
}

function ProductHuntViewer(url) {
  var template = getTemplate("producthunt");
  template.getElementsByClassName("title")[0].textContent = url.href;

  applyTemplate(template);
}

function DefaultViewer(url) {
  getPage(url.href).then(function(page) {
    var template = getTemplate("default");

    template.getElementsByClassName("title")[0].textContent = page.title;
    template.getElementsByClassName("hostname")[0].textContent = url.hostname;

    applyTemplate(template);
  });
}

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

function getTemplate(templateName) {
  var script = document.getElementById("template-" + templateName);
  var element = document.createElement("div");
  element.innerHTML = script.innerHTML;
  return element;
}


function displayViewer(viewer, a) {
  // Display loading
  document.getElementById("loading").classList.remove("hidden");
  viewer(a);
}


function applyTemplate(template) {
  var content = document.getElementById("content");
  content.innerHTML = template.innerHTML;

  document.getElementById("loading").classList.add("hidden");
}