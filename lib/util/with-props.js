'use strict';

exports.__esModule = true;
exports._updateDebounced = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.defineProps = defineProps;
exports.normAttribute = normAttribute;
exports.normPropDef = normPropDef;
exports.normPropDefs = normPropDefs;
exports.syncAttributeToProperty = syncAttributeToProperty;
exports.syncPropertyToAttribute = syncPropertyToAttribute;

var _ = require('.');

var _definedProps = (0, _.sym)();
var _normPropDef = (0, _.sym)();
var _syncingAttributeToProperty = (0, _.sym)();
var _syncingPropertyToAttribute = (0, _.sym)();

var _updateDebounced = exports._updateDebounced = (0, _.sym)();

function defineProps(Ctor) {
  if (!Ctor[_definedProps]) {
    Ctor[_definedProps] = true;
  }

  var prototype = Ctor.prototype;

  var props = normPropDefs(Ctor);

  Object.defineProperties(prototype, (0, _.keys)(props).reduce(function (prev, curr) {
    var _props$curr = props[curr],
        target = _props$curr.attribute.target,
        coerce = _props$curr.coerce,
        def = _props$curr.default,
        serialize = _props$curr.serialize;

    var _value = (0, _.sym)();
    prev[curr] = {
      configurable: true,
      get: function get() {
        var val = this[_value];
        return val == null ? def : val;
      },
      set: function set(val) {
        this[_value] = coerce(val);
        syncPropertyToAttribute(this, target, serialize, val);
        this[_updateDebounced]();
      }
    };
    return prev;
  }, {}));
}

function normAttribute(name, prop) {
  var attribute = prop.attribute;

  var obj = (typeof attribute === 'undefined' ? 'undefined' : _typeof(attribute)) === 'object' ? _extends({}, attribute) : {
    source: attribute,
    target: attribute
  };
  if (obj.source === true) {
    obj.source = (0, _.dashCase)(name);
  }
  if (obj.target === true) {
    obj.target = (0, _.dashCase)(name);
  }
  return obj;
}

function normPropDef(name, prop) {
  var coerce = prop.coerce,
      def = prop.default,
      deserialize = prop.deserialize,
      serialize = prop.serialize;

  return {
    attribute: normAttribute(name, prop),
    coerce: coerce || function (v) {
      return v;
    },
    default: def,
    deserialize: deserialize || function (v) {
      return v;
    },
    serialize: serialize || function (v) {
      return v;
    }
  };
}

function normPropDefs(Ctor) {
  return Ctor[_normPropDef] || (Ctor[_normPropDef] = (0, _.keys)(Ctor.props).reduce(function (prev, curr) {
    prev[curr] = normPropDef(curr, Ctor.props[curr] || {});
    return prev;
  }, {}));
}

function syncAttributeToProperty(elem, name, value) {
  if (elem[_syncingPropertyToAttribute]) {
    return;
  }
  var propDefs = normPropDefs(elem.constructor);
  for (var propName in propDefs) {
    var _propDefs$propName = propDefs[propName],
        source = _propDefs$propName.attribute.source,
        deserialize = _propDefs$propName.deserialize;

    if (source === name) {
      elem[_syncingAttributeToProperty] = propName;
      elem[propName] = value == null ? value : deserialize(value);
      elem[_syncingAttributeToProperty] = null;
    }
  }
}

function syncPropertyToAttribute(elem, target, serialize, val) {
  if (target && elem[_syncingAttributeToProperty] !== target) {
    var serialized = serialize(val);
    elem[_syncingPropertyToAttribute] = true;
    if (serialized == null) {
      elem.removeAttribute(target);
    } else {
      elem.setAttribute(target, serialized);
    }
    elem[_syncingPropertyToAttribute] = false;
  }
}