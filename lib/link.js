'use strict';

exports.__esModule = true;
exports.link = link;
function getValue(elem) {
  var type = elem.type;
  if (type === 'checkbox' || type === 'radio') {
    return elem.checked ? elem.value || true : false;
  }
  return elem.value;
}

function link(elem, target) {
  return function (e) {
    // We fallback to checking the composed path. Unfortunately this behaviour
    // is difficult to impossible to reproduce as it seems to be a possible
    // quirk in the shadydom polyfill that incorrectly returns null for the
    // target but has the target as the first point in the path.
    // TODO revisit once all browsers have native support.
    var localTarget = e.target || e.composedPath()[0];
    var value = getValue(localTarget);
    var localTargetName = target || localTarget.name || 'value';

    if (localTargetName.indexOf('.') > -1) {
      var parts = localTargetName.split('.');
      var firstPart = parts[0];
      var propName = parts.pop();
      var obj = parts.reduce(function (prev, curr) {
        return prev && prev[curr];
      }, elem);

      obj[propName || e.target.name] = value;
      elem[firstPart] = elem[firstPart];
    } else {
      elem[localTargetName] = value;
    }
  };
}