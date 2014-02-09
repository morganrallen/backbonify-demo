// as this module is a singleton is can be written in a simpler,
// more one off fashion

// bootstrap isn't a real module
require("../../../node_modules/bootstrap/dist/js/bootstrap.js");

var dom = require("dom");
var _ = require("underscore");

var el = document.createElement("div");
el.className = "modal-outer";
el.innerHTML = '\
  <!-- Modal -->\
  <div class="modal fade" id="video" tabindex="-1" role="dialog" aria-hidden="true">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
          <h4 class="modal-title"></h4>\
        </div>\
        <div class="modal-body">\
        </div>\
      </div><!-- /.modal-content -->\
    </div><!-- /.modal-dialog -->\
  </div><!-- /.modal -->';

document.body.appendChild(el);

var title = dom(el).find(".modal-title")[0];
var body = dom(el).find(".modal-body")[0];
var $modal = $(el).find(".modal");

var modal = module.exports = {
  setContent: function(content) {
    if(content instanceof Node) {
      body.innerHTML = '';
      body.appendChild(content);
    } else if("string" === typeof content) {
      body.innerHTML = content;
    }
  },

  setTitle: function(content) {
    title.innerHTML = content;
  },

  on: _.bind($modal.on, $modal),
  off: _.bind($modal.off, $modal),

  show: function(options) {
    $modal.modal("show");
    
    if(options) {
      if(options.body) modal.setContent(options.body);
      if(options.title) modal.setTitle(options.title);
    }
  }
};
