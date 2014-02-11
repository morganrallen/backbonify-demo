var dom = require("dom");
var fs = require("fs");
var Container = require("./Container");
var Handlebars = require("handlebars");
var _ = require("underscore");

var modal = require("./modal");

module.exports = Container.extend({
  className: "nav-item",
  tagName: "li",

  initialize: function(options) {
    Container.prototype.initialize.call(this, options);

    this.$play = this.$el.find(".play-button");
    this.$play.on("click", _.bind(this.onPlayClick, this));

    this.$video = this.$el.find("video");
    this.video = this.$video[0];

    modal.on("hidden.bs.modal", _.bind(this.onModalClose, this));

    this.tplTitle = Handlebars.compile(this.tplTitle);
  },

  onModalClose:function() {
    this.video.pause();
    // stop buffering after video is closed
    this.video.src = "";
  },

  getMedia: function() {
    return this.model.attributes.mediaGroups[0].contents[0];
  },

  getTemplateData: function() {
    var a = this.model.attributes;
    var m = this.getMedia();

    return {
      title: a.title,
      publishedDate: a.publishedDate,
      thumbnail: m.thumbnails[0].url,
      video: m.url
    };
  },

  onPlayClick: function() {
    this.$video.addClass("display");
    var video = this.video;
    // don't add src from template to prevent buffering
    video.src = this.getMedia().url;

    modal.show({
      body: video,
      title: this.tplTitle({
        title: this.model.attributes.title,
        date: this.model.attributes.publishedDate
      })
    });

    video.play();
  },

  tpl: fs.readFileSync(__dirname + "/templates/NavItemView.html"),
  tplTitle: fs.readFileSync(__dirname + "/templates/ModalTitle.html")
});

