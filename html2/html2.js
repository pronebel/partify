var through = require('through2');
var Minimize = require('minimize');

module.exports = function(opt){
    console.log(opt);

    function minimize (file,encode, callback) {

        console.log(file);
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return;
        }

        var minimize = new Minimize(opt || {} );

        minimize.parse(file.contents.toString(), function (err, data) {
            if (err) {
                return ;
            }

            file.contents = new Buffer(data);
            callback(null, file);
        });
    }

    return through.obj(minimize);
}
