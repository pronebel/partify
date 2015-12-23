var partialify = require('../');

var browserify = require('browserify');

var fs = require('fs');
var path = require('path');

var html = fs.readFileSync(__dirname + '/fixtures/fixture.html', 'utf8');


var htmlActiion = partialify.html2({
    test:1
});



var b = require('browserify')();


b.add(__dirname + '/runners/html.js');

b.transform(htmlActiion);
b.bundle().pipe(fs.createWriteStream('./build/bundle.js'));