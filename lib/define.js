'use strict';

exports.__esModule = true;
exports.define = define;

var _util = require('./util');

function define(Ctor) {
  var customElements = _util.root.customElements,
      HTMLElement = _util.root.HTMLElement;


  if (!customElements) {
    throw new Error('Skate requires native custom element support or a polyfill.');
  }

  if (!(Ctor.prototype instanceof HTMLElement)) {
    throw new Error('You must provide a constructor that extends HTMLElement to define().');
  }

  // We must use hasOwnProperty() because we want to know if it was specified
  // directly on this class, not subclasses, as we don't want to inherit tag
  // names from subclasses.
  if (!Ctor.hasOwnProperty('is')) {
    // If we used defineProperty() then the consumer must also use it and
    // cannot use property initialisers. Instead we just set it so they can
    // use whatever method of overridding that they want.
    Ctor.is = 'x-' + (0, _util.uniqueId)();
  }
  customElements.define(Ctor.is, Ctor);

  // The spec doesn't return but this allows for a simpler, more concise API.
  return Ctor;
}