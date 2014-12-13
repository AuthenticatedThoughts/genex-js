// Uncompressed version of the _ object replacement functions
// used in genex.js

var _={
    difference: function(a, b) {
      var c = [];

      a.forEach(function(key) {
        if (-1 === b.indexOf(key)) {
          c.push(key);
        }
      }, this);

      return c;
    },
    intersection: function(a, b) {
      var ai = 0,
          bi = 0;
      var result = new Array();

      while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) {
          ai++;
        } else if (a[ai] > b[bi]) {
          bi++;
        } else /* they're equal */
        {
          result.push(a[ai]);
          ai++;
          bi++;
        }
      }
      return result;
    }
  };
