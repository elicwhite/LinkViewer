'use strict';

var Class = require('../class');

var ViewerBase = Class.extend({

  applyTemplate: function(template) {
    var content = document.getElementById('content');
    content.innerHTML = template;

    document.getElementById('loading').classList.add('hidden');
  },

  // We need this to be able to close the window or run whatever error stuff we need
  handleErrors: function(error) {
    console.error(error);
  }
});

module.exports = ViewerBase;
