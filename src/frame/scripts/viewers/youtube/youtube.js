'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var YoutubeViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var id = Helpers.getQueryVariable(url, 'v');

    var api = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&amp;alt=jsonc';//-in-script&amp;callback=";

    Helpers.getJSON(api).then(function(json) {
      /*jshint camelcase: false */
      var params = {
        title: json.title,
        description: json.description,
        //url: url,
        //viewcount: json.viewcount,
        /*author: json.author,*/
        createdAt: Helpers.stringifyTimestamp(json.created_at_i)
      };
      self.applyTemplate(template(params));
    });
  }

});

module.exports = new YoutubeViewer();