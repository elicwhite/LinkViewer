'use strict';

var ViewerBase = require('../viewerBase');
var Helpers = require('../../helpers');
var template = require('./template.hbs');

var ImgurViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    if (url.href.indexOf('?gallery') === -1) {
      url.href += '?gallery';
    }

    Helpers.getPage(url.href)
      .then(function(page) {

        var titleElement = page.querySelector('.description h1');
        var title = titleElement ? titleElement.textContent : '';


        var urls = [];

        var images = page.getElementsByClassName('thumb-title');

        for (var i = 0; i < Math.min(3, images.length); i++) {
          urls.push(url.protocol + '//' + images[i].dataset.src);
        }

        var stats = page.querySelectorAll('.stats span');
        var uploaded = new Date(stats[0].title);
        var views = stats[1].textContent;

        var params = {
          title: title,
          urls: urls,
          views: views,
          uploaded: Helpers.stringifyTimestamp(uploaded)
        };

        self.applyTemplate(template(params));
      });
  }

});


module.exports = new ImgurViewer();