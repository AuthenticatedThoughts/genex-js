genex
--------

Genex module for browsers and Node.js

This is a browser-compatible dependency-free fork.

Original code by @alixalex.

Usage
-----

```js
if( typeof require == 'function' ) {
	var genex = require('genex');
}

var regex = /(foo|bar|baz)\d\1/;
var count = genex(regex).count();

if (count <= 1000) {
	genex(regex).generate(function (output) {
		console.log('[*] ' + output);
	});
}

console.log('Total strings generated: ' + count);
```

License
-------

MIT
