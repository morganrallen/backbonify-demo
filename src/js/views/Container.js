var Backbone = require("backbone");
var Handlebars = require("handlebars");
var _ = require("underscore");

var ids = {};

var Container = Backbone.View.extend({
  className: "container",
  children: {},

  initialize: function(options) {
    options = options || {};
    this.options = options;

    if(options.id) ids[options.id] = this;

    Backbone.View.prototype.initialize.call(this, options);

    if(this.model) {
      this.model.on("remove", _.bind(this.handleRemove, this));
    }

    if(options.parent) {
      this.parent = options.parent;
      this.$el.appendTo(options.parent instanceof Container ? options.parent.el : options.parent);
    }

    if(options.children) {
      this.handleChildren(options.children);
    }

    this.render();
  },

  getTemplateData: function() {
    return (this.model || {}).attributes || {};
  },

  handleChildren: function(children) {
    for(var i = 0, child; i < children.length; i++) {
      child = children[i];
      $(child.el || child).appendTo(this.el);

      if(child instanceof EcoLogic.Views.Container) {
        child.parent = this;
      }
    }
  },

  handleRemove: function() {
    this.el.parentNode && this.el.parentNode.removeChild(this.el);
  },

  hide: function() {
    this.$el.hide();
  },

  render: function() {
    if(this.tpl) {
      if(typeof this.tpl !== "function") {
        this.tpl = Handlebars.compile(this.tpl);
      }

      this.el.innerHTML = this.tpl(this.getTemplateData());
    };

    this.trigger("rendered");
  },

  show: function() {
    this.$el.show();
  }
});

module.exports = Container;
