'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var OkCupidViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var username = url.pathname.split('/')[2];

    var profileUrl = 'https://www.okcupid.com/profile/' + username;

    Helpers.getPage(profileUrl)
      .then(function(page) {

        var thumbs = page.querySelectorAll('#profile_thumbs .thumb img');

        var urls = [];
        for (var i = 0; i < thumbs.length; i++) {
          urls.push(thumbs[i].src);
        }

        // Get smaller images
        urls.map(function(url) {
          return url.split('160x160').join('120x120');
        });

        var params = {
          username: username,
          urls: urls,
          match: page.querySelector('.match .percent').textContent,
          age: page.getElementById('ajax_age').textContent,
          location: page.getElementById('ajax_location').textContent
        };

        self.applyTemplate(template(params));
      })
      .catch(self.handleErrors);
  }
});

module.exports = new OkCupidViewer();
