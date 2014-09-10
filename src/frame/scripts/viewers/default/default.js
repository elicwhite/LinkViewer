"use strict";

var ViewerBase = require("../viewerBase");
var Helpers = require("../../helpers");
var template = require("./template.hbs");

var DefaultViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    Helpers.getPage(url.href)
      .then(function(page) {

        var params = {
          title: page.title,
          hostname: url.hostname
        };

        self.applyTemplate(template(params));
      });
  }

});

module.exports = new DefaultViewer();