'use strict';

exports.__esModule = true;
exports.withRender = withRender;

var _withProps = require('./with-props');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withRender() {
  var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _withProps.withProps)();

  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, _Base.apply(this, arguments));
    }

    _class.prototype.propsChangedCallback = function propsChangedCallback() {
      _Base.prototype.propsChangedCallback.call(this);

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }

      this.rendererCallback(this.shadowRoot, this.renderCallback(this));
      this.renderedCallback();
    };

    // Called to render the component.


    _class.prototype.renderCallback = function renderCallback() {};

    // Called after the component has rendered.


    _class.prototype.renderedCallback = function renderedCallback() {};

    // Called to render the component.


    _class.prototype.rendererCallback = function rendererCallback() {};

    return _class;
  }(Base);
}