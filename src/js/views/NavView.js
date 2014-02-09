var fs = require("fs");

var Container = require("./Container");

module.exports = Container.extend({
  initialize: function(options) {
    Container.prototype.initialize.call(this, options);

    this.ul = this.$el.find("ul")[0];
  },

  tpl: fs.readFileSync(__dirname + "/templates/NavView.html")
});
