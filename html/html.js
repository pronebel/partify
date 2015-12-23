var through = require('through'),
  str2js = require('string-to-js');
var minify = require('html-minifier').minify;



var Minimize = require('minimize');
var ext = "html";



function minimize (file, callback) {

    console.log(file);

  var minimize = new Minimize({
          empty: true,        // KEEP empty attributes
          cdata: true,        // KEEP CDATA from scripts
          comments: true,     // KEEP comments
          ssi: true,          // KEEP Server Side Includes
          conditionals: true, // KEEP conditional internet explorer comments
          spare: true,        // KEEP redundant attributes
          quotes: true,       // KEEP arbitrary quotes
          loose: true         // KEEP one whitespace
      } || {} );

  minimize.parse(file.toString(), function (err, data) {
    if (err) {
      return callback("error");
    }
      data =  "module.exports = '" + data + "';";
      console.log(data);
    callback(null, data);
  });
}


function normalizeContent(content) {
    return content.toString().replace(/\'/g, '\\\'').replace(/\r?\n/g, '');
}

function miniHtml (file){
    var str =  minify(file, {
        removeAttributeQuotes: true,
        removeComments:true
    });
    //console.log(str);
    return  "module.exports = '" + normalizeContent(str) + "';";
}




 var aaa =   function (file, opts) {
     console.log(opts);

  config = opts;


  if(file.substr(-(ext.length))!=ext){
    return through();
  }



  var buffer = "";

  return through(function (chunk) {
      buffer += chunk.toString();
    },
    function () {

        var self = this;
      if (buffer.indexOf('module.exports') === 0) {
          self.queue(buffer); // prevent "double" transforms
          self.queue(null);
      } else {


        var text = miniHtml(buffer);
          console.log(text);
        this.queue(text);
          self.queue(null);
      }

    });

};
exports.plugin = function(){
    return aaa;
};


