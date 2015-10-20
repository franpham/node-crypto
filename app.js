"use strict";

var crypto = require('crypto');
var sha512 = crypto.createHash('sha512');

var input = 'hello';
sha512.update(input);

var output = sha512.digest('hex');
console.log(output);
