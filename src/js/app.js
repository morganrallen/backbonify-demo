var config = require("./config.json");
var TedFeed = require("./collections/TedFeed");

// Backbone needs jQuery before it can use Views
var Backbone = require("backbone");
Backbone.$ = require("jquery-browserify");

module.exports = function(config) {
  var feed = new TedFeed(undefined, {
    viewParent: document.body
  });

  feed.fetch();

  return feed;
};
