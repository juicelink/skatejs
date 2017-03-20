'use strict';

exports.__esModule = true;
exports.withRaw = withRaw;

var _util = require('./util');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _root$HTMLElement = _util.root.HTMLElement,
    HTMLElement = _root$HTMLElement === undefined ? function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  return _class;
}() : _root$HTMLElement;
function withRaw() {
  var _class2, _temp;

  var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;

  return _temp = _class2 = function (_Base) {
    _inherits(_class2, _Base);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _Base.apply(this, arguments));
    }

    _class2.prototype.attributeChangedCallback = function attributeChangedCallback() {};

    _class2.prototype.connectedCallback = function connectedCallback() {};

    _class2.prototype.disconnectedCallback = function disconnectedCallback() {};

    return _class2;
  }(Base), _class2.is = null, _class2.observedAttributes = [], _temp;
}