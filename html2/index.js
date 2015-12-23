var through = require('through');


var Minimize = require('minimize');
var ext = "html";


function minimize(file, callback) {


    var minimize = new Minimize({
            empty: true,        // KEEP empty attributes
            cdata: true,        // KEEP CDATA from scripts
            comments: true,     // KEEP comments
            ssi: true,          // KEEP Server Side Includes
            conditionals: true, // KEEP conditional internet explorer comments
            spare: true,        // KEEP redundant attributes
            quotes: true,       // KEEP arbitrary quotes
            loose: true         // KEEP one whitespace
        } || {});

    minimize.parse(file.toString(), function (err, data) {
        if (err) {
            return callback("error");
        }
        data = "module.exports = '" + normalizeContent(data) + "';";

        callback(null, data);
    });
}

function normalizeContent(content) {
    return content.toString().replace(/\'/g, '\\\'').replace(/\r?\n/g, '\\n');
}


var aaa = function (file, opts) {
    console.log(opts);

    config = opts;


    if (file.substr(-(ext.length)) != ext) {
        return through();
    }


    var buffer = "";

    return through(function (chunk) {
            buffer += chunk.toString();
        },
        function () {

            var self = this;
            if (buffer.indexOf('module.exports') === 0) {
                self.queue(buffer);
                self.queue(null);
            } else {
                minimize(buffer, function (err, text) {


                    if (err) {
                        console.log(err);
                    } else {
                        self.queue(text);
                        self.queue(null);
                    }
                })
            }

        });

};
exports.plugin = function () {
    return aaa;
};


