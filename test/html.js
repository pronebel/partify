var partialify = require('../');

var browserify = require('browserify');

var fs = require('fs');
var path = require('path');

var html = fs.readFileSync(__dirname + '/fixtures/fixture.html', 'utf8');


var b = require('browserify')();


b.add(__dirname + '/runners/html.js');
console.log(partialify.html);
b.transform(partialify.html());
b.bundle().pipe(fs.createWriteStream('./build/bundle.js'));