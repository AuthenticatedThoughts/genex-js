// Uncompressed version of the _ object replacement functions
// used in genex.js

function _contains(array, needle){
  for( var i = 0, l = array.length; i < l; i++ ) {
    if( array[i] === needle ) return true;
  }
  return false;
}
function _intersection(array) {
  if (array == null) return [];
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0, length = array.length; i < length; i++) {
    var item = array[i];
    if (_contains(result, item)) continue;
    for (var j = 1; j < argsLength; j++) {
      if (!_contains(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
}
function _difference(array, bar){
  var diff = [];

  array.forEach(function(key) {
    if (!_contains(bar, key)) {
      diff[diff.length] = key;
    }
  }, this);

  return diff;
}
