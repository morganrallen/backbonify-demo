var config = require("../config.json");
var jsonp = require("jsonp");
var qs = require("querystring");
var _ = require("underscore");

var Collection = require("backbone").Collection;
var FeedItem = require("../models/FeedItem");
var NavView = require("..//views/NavView");

module.exports = Collection.extend({
  model: FeedItem,

  initialize: function(models, options) {
    Collection.prototype.initialize.call(this, models, options);

    this.navView = new NavView({
      parent: options.viewParent
    });
  },

  fetch: function() {
    jsonp(this.url(), _.bind(this.onFetch, this));
  },

  onFetch: function(err, query) {
    if(err) throw err; // derp, done
    this.set(query.responseData.feed.entries);
  },

  url: function() {
    return config.feedServiceURL + "&" + qs.stringify({
      q: config.feedURL
    });
  }
});
