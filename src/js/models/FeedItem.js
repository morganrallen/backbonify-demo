var Model = require("backbone").Model;
var NavItemView = require("..//views/NavItemView");

module.exports = Model.extend({
  initialize: function(attributes, options) {
    Model.prototype.initialize.call(this, attributes, options);

    this.navView = new NavItemView({
      model: this,
      parent: this.collection.navView.ul
    });
  }
});
