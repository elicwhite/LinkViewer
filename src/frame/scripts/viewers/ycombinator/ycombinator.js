"use strict";

var ViewerBase = require("../viewerBase");
var Helpers = require("../../helpers");
var template = require("./template.hbs");

var YCombinatorViewer = ViewerBase.extend({
  show: function(url) {
    var self = this;

    var id = Helpers.getQueryVariable(url, "id");

    var api = "https://hn.algolia.com/api/v1/search?tags=comment,story_"+id;

    Helpers.getJSON(api).then(function(json) {

      var params = {
        commentText: json.hits[0].comment_text
      };

      self.applyTemplate(template(params));
    });
  }

});


module.exports = new YCombinatorViewer();