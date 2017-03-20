'use strict';

exports.__esModule = true;
exports.dashCase = dashCase;
exports.debounce = debounce;
exports.keys = keys;
exports.sym = sym;
exports.uniqueId = uniqueId;
var root = exports.root = typeof window === 'undefined' ? global : window;

var Object = root.Object,
    MutationObserver = root.MutationObserver;
var getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertySymbols = Object.getOwnPropertySymbols;
function dashCase(str) {
  return str.split(/([A-Z])/).reduce(function (one, two, idx) {
    var dash = !one || idx % 2 === 0 ? '' : '-';
    return '' + one + dash + two.toLowerCase();
  });
}

function debounce(cbFunc) {
  var scheduled = false;
  var i = 0;
  var cbArgs = [];
  var elem = document.createElement('span');
  var observer = new MutationObserver(function () {
    cbFunc.apply(undefined, cbArgs);
    scheduled = false;
    cbArgs = null;
  });

  observer.observe(elem, { childList: true });

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    cbArgs = args;
    if (!scheduled) {
      scheduled = true;
      elem.textContent = '' + i;
      i += 1;
    }
  };
}

function keys() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var names = getOwnPropertyNames(obj);
  return getOwnPropertySymbols ? names.concat(getOwnPropertySymbols(obj)) : names;
}

function sym() {
  return typeof Symbol === 'function' ? Symbol() : uniqueId();
}

function uniqueId() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}