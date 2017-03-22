'use strict';

exports.__esModule = true;
exports.h = exports.Component = undefined;
exports.withComponent = withComponent;

var _preact = require('preact');

Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function get() {
    return _preact.h;
  }
});

var _withRender = require('./with-render');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withComponent() {
  var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _withRender.withRender)();

  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, _Base.apply(this, arguments));
    }

    _class.prototype.rendererCallback = function rendererCallback(host, vdom) {
      this._root = (0, _preact.render)(vdom, host, this._root);
    };

    return _class;
  }(Base);
}

var Component = exports.Component = withComponent();