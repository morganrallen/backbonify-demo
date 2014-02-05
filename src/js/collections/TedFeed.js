var config = require("../config.json");
var jsonp = require("jsonp");
var qs = require("querystring");
var _ = require("underscore");

var Collection = require("backbone").Collection;

module.exports = Collection.extend({
  initialize: function(models, options) {
    Collection.prototype.initialize.call(this, models, options);
  },

  fetch: function() {
    jsonp(this.url(), _.bind(this.onFetch, this));
  },

  onFetch: function(err, query) {
    if(err) throw err; // derp, done
    this.set(query.responseData.entries);
  },

  url: function() {
    return config.feedServiceURL + "&" + qs.stringify({
      q: config.feedURL
    });
  }
});
