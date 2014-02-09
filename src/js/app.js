// Backbone needs jQuery before it can use Views
var Backbone = require("backbone");
// globalize jQuery and assign to BB
window.jQuery = Backbone.$ = require("jquery-browserify");

var config = require("./config.json");
var TedFeed = require("./collections/TedFeed");

var Handlebars = require("handlebars");
var pretty = require("pretty-date").format;

function registerHandlebarsHelpers() {
  Handlebars.registerHelper("pretty", function(date) {
    return pretty(new Date(date));
  });
}

module.exports = function(config) {
  var feed = new TedFeed(undefined, {
    viewParent: document.body
  });

  feed.fetch();

  registerHandlebarsHelpers();

  return feed;
};
