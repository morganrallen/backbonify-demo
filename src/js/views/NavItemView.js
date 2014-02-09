var dom = require("dom");
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

  tpl: '\
  <div class="row">\
    <div class="col-sm-8 col-xs-8">\
      <div class="title">{{ title }}</div>\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="col-sm-3">\
      <div class="thumb">\
        <div class="holder">\
          <img src="{{ thumbnail }}" />\
          <img class="play-button" src="/img/play_button.png" />\
        </div>\
      </div>\
    </div>\
    <div class="col-sm-8">\
      <div class="video-wrap">\
        <video controls src="{{ video }} "></video>\
      </div>\
    </div>\
    <div class="col-sm-4 date">\
      {{pretty publishedDate}}\
    </div>\
  </div>'
});

