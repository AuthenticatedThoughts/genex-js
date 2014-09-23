if( typeof require == 'function' ) {
	var genex = require('../lib/genex');
}

var regex = /(foo|bar|baz)\d\1/;
var count = genex(regex).count();

if (count <= 1000) {
	genex(regex).generate(function (output) {
		console.log('[*] ' + output);
	});
}

console.log('Total strings generated: ' + count);
