'use strict';

var $ = require('jquery');

function ScrollManager() {
  var _this = this;

  this.scrollCheck = function () {
    for (var n = 0; n < _this.activated.length; n++) {
      if (_this.objects[n].returnable) {
        if (_this.activated[n]) {
          if (elementFixed(_this.objects[n].object)) {
            if (_this.objects[n].object[0].getBoundingClientRect().y + _this.objects[n].object.height() - $(window).scrollTop() > 0) {
              _this.activated[n] = false;
              _this.animations[n](_this.activated[n]);
            }
          } else if (_this.objects[n].object.offset().top + _this.objects[n].object.height() - $(window).scrollTop() > 0) {
            _this.activated[n] = false;
            _this.animations[n](_this.activated[n]);
          }
        } else {
          if (elementFixed(_this.objects[n].object)) {
            if (_this.objects[n].object[0].getBoundingClientRect().y + _this.objects[n].object.height() - $(window).scrollTop() <= 0) {
              _this.activated[n] = true;
              _this.animations[n](_this.activated[n]);
            }
          } else if (_this.objects[n].object.offset().top + _this.objects[n].object.height() - $(window).scrollTop() <= 0) {
            _this.activated[n] = true;
            _this.animations[n](_this.activated[n]);
          }
        }
      } else if (!_this.activated[n]) if (_this.objects[n].object.offset().top - $(window).scrollTop() <= $(window).height() * (1 - ScrollManager.offsetTop)) {
        _this.objects[n].object.removeClass('hidden');

        _this.animations[n]();
        _this.activated[n] = true;
      }
    }
  };

  $(document).scroll(this.scrollCheck);
}

ScrollManager.prototype.activated = [];
ScrollManager.prototype.animations = [];
ScrollManager.prototype.objects = [];

ScrollManager.prototype.addSection = function (strQuery, fn) {
  this.objects.push({
    object: $(strQuery),
    returnable: false
  });

  this.activated.push(false);
  this.animations.push(fn);
};

ScrollManager.prototype.addReturnableSection = function (strQuery, fn) {
  this.objects.push({
    object: $(strQuery),
    returnable: true
  });

  this.activated.push(false);
  this.animations.push(fn);
};

ScrollManager.offsetTop = 0.4;

function elementFixed(el) {
  var parentsCheck = el.add(el.parents());

  var fixed = false;
  parentsCheck.each(function () {
    if ($(this).css("position") === "fixed") fixed = true;
  });

  return fixed;
}

module.exports = ScrollManager;
