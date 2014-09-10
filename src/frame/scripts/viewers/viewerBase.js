"use strict";

var Class = require("../class");

var ViewerBase = Class.extend({

  applyTemplate: function(template) {
    var content = document.getElementById("content");
    content.innerHTML = template;

    document.getElementById("loading").classList.add("hidden");
  }
});

module.exports = ViewerBase;