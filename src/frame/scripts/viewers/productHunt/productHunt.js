"use strict";

var ViewerBase = require("../viewerBase");
var Helpers = require("../../helpers");
var template = require("./template.hbs");

var ProductHuntViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    Helpers.getPage(url)
      .then(function(page) {

        var params = {
          title: page.title
        };

        self.applyTemplate(template(params));
      });
  }

});


module.exports = new ProductHuntViewer();