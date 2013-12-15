
function assert(expr){ if (!expr) throw new Error('failed'); }

var arrows = require('arrows');

assert('function' == typeof arrows);

var keys = arrows();

assert('object' == typeof keys);
assert('function' == typeof keys.onkeydown);
assert('function' == typeof keys.onkeyup);
assert('function' == typeof keys.valueOf);
assert(0 == keys);

document.write('OK');
