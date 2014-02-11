var dom = require("dom");
var fs = require("fs");
var Container = require("./Container");
var _ = require("underscore");

var modal = require("./modal");

module.exports = Container.extend({
  className: "nav-item",
  tagName: "li",

  initialize: function(options) {
    Container.prototype.initialize.call(this, options);

    this.$play = this.$el.find(".play-button");
    this.$play.on("click", _.bind(this.onPlayClick, this));

    var $video = this.$video = this.$el.find("video");

    modal.on("hidden.bs.modal", function() {
      $video[0].pause();
    });
  },

  getTemplateData: function() {
    var a = this.model.attributes;
    var m = a.mediaGroups[0].contents[0];

    return {
      title: a.title,
      publishedDate: a.publishedDate,
      thumbnail: m.thumbnails[0].url,
      video: m.url
    };
  },

  onPlayClick: function() {
    this.$video.addClass("display");
    var video = this.$video[0];

    modal.show({
      body: video,
      title: this.model.attributes.title
    });

    video.play();
  },

  tpl: fs.readFileSync(__dirname + "/templates/NavItemView.html")
});

