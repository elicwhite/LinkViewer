'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var YoutubeViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var id = Helpers.getQueryVariable(url, 'v');

    var api = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=jsonc'; //-in-script&amp;callback=";

    Helpers.getJSON(api).then(function(json) {
      // jshint camelcase: false
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      var params = {
        thumb: json.data.thumbnail.hqDefault,
        uploader: json.data.uploader,
        category: json.data.category,
        title: json.data.title,
        description: json.data.description.substring(0, 250) + '...',
        likeCount: json.data.likeCount,
        viewCount: json.data.viewCount,
        commentCount: json.data.commentCount,

        createdAt: Helpers.stringifyTimestamp(json.created_at_i)
      };
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      // jshint camelcase: true

      self.applyTemplate(template(params));
    });
  }
});

module.exports = new YoutubeViewer();
