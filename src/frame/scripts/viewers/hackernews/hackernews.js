'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var HackerNewsViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var id = Helpers.getQueryVariable(url, 'id');

    var api = 'https://hn.algolia.com/api/v1/items/' + id;

    Helpers.getJSON(api)
      .then(function(json) {
        /*jshint camelcase: false */
        var params = {
          title: json.title,
          url: json.url,
          points: json.points,
          author: json.author,
          createdAt: Helpers.stringifyTimestamp(json.created_at_i)
        };

        self.applyTemplate(template(params));
      })
      .catch(self.handleErrors);

  }

});

module.exports = new HackerNewsViewer();