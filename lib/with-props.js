'use strict';

exports.__esModule = true;
exports.propString = exports.propObject = exports.propNumber = exports.propBoolean = exports.propArray = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.withProps = withProps;
exports.getProps = getProps;
exports.setProps = setProps;

var _withRaw = require('./with-raw');

var _util = require('./util');

var _withProps = require('./util/with-props');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _connected = (0, _util.sym)();
var _constructed = (0, _util.sym)();

var _observedAttributes = (0, _util.sym)();
var _prevProps = (0, _util.sym)();
var _props = (0, _util.sym)();
var _updateCallback = (0, _util.sym)();
var _updating = (0, _util.sym)();

function withProps() {
  var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _withRaw.withRaw)();

  return function (_Base) {
    _inherits(_class2, _Base);

    _createClass(_class2, null, [{
      key: 'observedAttributes',
      get: function get() {
        var props = (0, _withProps.normPropDefs)(this);
        return (0, _util.keys)(props).map(function (k) {
          return props[k].attribute;
        }).filter(Boolean).map(function (a) {
          return a.source;
        }).concat(this[_observedAttributes] || []);
      },
      set: function set(value) {
        this[_observedAttributes] = value;
      }
    }, {
      key: 'props',
      get: function get() {
        return _extends({}, _Base.props, this[_props]);
      },
      set: function set(value) {
        this[_props] = value;
      }
    }]);

    function _class2() {
      _classCallCheck(this, _class2);

      var _this = _possibleConstructorReturn(this, _Base.call(this));

      _this[_updateCallback] = function () {
        if (_this[_updating] || !_this[_connected]) {
          return;
        }

        // Flag as rendering. This prevents anything from trying to render - or
        // queueing a render - while there is a pending render.
        _this[_updating] = true;

        // Prev / next props for prop lifecycle callbacks.
        var prev = _this[_prevProps];
        var next = _this[_prevProps] = getProps(_this);

        // Always call set, but only call changed if the props updated.
        _this.propsSetCallback(next, prev);
        if (_this.propsUpdatedCallback(next, prev)) {
          _this.propsChangedCallback(next, prev);
        }

        _this[_updating] = false;
      };

      if (_this[_constructed]) return _possibleConstructorReturn(_this);
      _this[_constructed] = true;
      var constructor = _this.constructor;

      (0, _withProps.defineProps)(constructor);
      _this[_withProps._updateDebounced] = (0, _util.debounce)(_this[_updateCallback]);
      return _this;
    }

    _class2.prototype.connectedCallback = function connectedCallback() {
      if (this[_connected]) return;
      this[_connected] = true;
      _Base.prototype.connectedCallback.call(this);
      this[_withProps._updateDebounced]();
    };

    _class2.prototype.disconnectedCallback = function disconnectedCallback() {
      if (!this[_connected]) return;
      this[_connected] = false;
      _Base.prototype.disconnectedCallback.call(this);
    };

    // Called when props actually change.


    _class2.prototype.propsChangedCallback = function propsChangedCallback() {};

    // Called whenever props are set, even if they don't change.


    _class2.prototype.propsSetCallback = function propsSetCallback() {};

    // Called to see if the props changed.


    _class2.prototype.propsUpdatedCallback = function propsUpdatedCallback(next, prev) {
      // The 'previousProps' will be undefined if it is the initial render.
      if (!prev) {
        return true;
      }

      // The 'prevProps' will always contain all of the keys.
      //
      // Use classic loop because:
      //
      // - for ... in skips symbols
      // - for ... of is not working yet with IE!?
      var namesAndSymbols = (0, _util.keys)(prev);
      for (var i = 0; i < namesAndSymbols.length; i++) {
        var nameOrSymbol = namesAndSymbols[i];
        if (prev[nameOrSymbol] !== next[nameOrSymbol]) {
          return true;
        }
      }

      return false;
    };

    _class2.prototype.attributeChangedCallback = function attributeChangedCallback(name, oldValue, newValue) {
      _Base.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
      (0, _withProps.syncAttributeToProperty)(this, name, newValue);
    };

    // Invokes the complete render lifecycle.


    return _class2;
  }(Base);
}

// Props

var freeze = Object.freeze;

var attribute = freeze({ source: true });
var zeroIfEmptyOrNumberIncludesNaN = function zeroIfEmptyOrNumberIncludesNaN(val) {
  return val == null ? 0 : Number(val);
};

var propArray = exports.propArray = freeze({
  attribute: attribute,
  coerce: function coerce(val) {
    return Array.isArray(val) ? val : val == null ? null : [val];
  },
  default: freeze([]),
  deserialize: JSON.parse,
  serialize: JSON.stringify
});

var propBoolean = exports.propBoolean = freeze({
  attribute: attribute,
  coerce: function coerce(val) {
    return !!val;
  },
  default: false,
  deserialize: function deserialize(val) {
    return val != null;
  },
  serialize: function serialize(val) {
    return val ? '' : null;
  }
});

var propNumber = exports.propNumber = freeze({
  attribute: attribute,
  default: 0,
  coerce: zeroIfEmptyOrNumberIncludesNaN,
  deserialize: zeroIfEmptyOrNumberIncludesNaN,
  serialize: function serialize(v) {
    return v == null ? null : Number(v);
  }
});

var propObject = exports.propObject = freeze({
  attribute: attribute,
  default: freeze({}),
  deserialize: JSON.parse,
  serialize: JSON.stringify
});

var propString = exports.propString = freeze({
  attribute: attribute,
  default: '',
  coerce: function coerce(v) {
    return String(v);
  },
  deserialize: function deserialize(v) {
    return v;
  },
  serialize: function serialize(v) {
    return v == null ? null : String(v);
  }
});

function getProps(elem) {
  return (0, _util.keys)(elem.constructor.props).reduce(function (prev, curr) {
    prev[curr] = elem[curr];
    return prev;
  }, {});
}

function setProps(elem, props) {
  (0, _util.keys)(props).forEach(function (k) {
    return elem[k] = props[k];
  });
}