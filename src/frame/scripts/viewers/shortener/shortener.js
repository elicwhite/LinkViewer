'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var ShortenerViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var req;
    Helpers.getURL(url)
      .then(function(request) {
        req = request;

        return Helpers.parsePageFromRequest(request);
      })
      .then(function(page) {
        var params = {
          title: page.title,
          url: req.responseURL
        };

        self.applyTemplate(template(params));
      })
      .catch(self.handleErrors);
  }
});

module.exports = new ShortenerViewer();
