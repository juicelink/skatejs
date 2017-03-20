'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.emit = emit;

var _util = require('./util');

// Once the Event constructor is newable cross-browser, this can be removed.
var Event = function () {
  try {
    var _Event = _util.root.Event;
    // eslint-disable-next-line

    new _Event('test');
    return _Event;
  } catch (e) {
    return function (name, opts) {
      var e = document.createEvent('CustomEvent');
      Object.defineProperty(e, 'composed', { value: opts.composed });
      e.initCustomEvent(name, opts.bubbles, opts.cancelable, opts.detail);
      return e;
    };
  }
}();

var optsDefaults = {
  bubbles: true,
  cancelable: true,
  composed: false
};

function emit(elem, name, opts) {
  opts = _extends({}, optsDefaults, opts);
  var e = new Event(name, opts);
  Object.defineProperty(e, 'detail', { value: opts.detail });
  return elem.dispatchEvent(e);
}