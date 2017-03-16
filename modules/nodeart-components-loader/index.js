// using: regex, capture groups, and capture group variables.
var templateUrlRegex = /templateUrl *:(.*)$/gm;
var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
var stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;
let loaderUtils = require("loader-utils");
let fs = require('fs');
let path = require('path');

function replaceStringsWithRequires(string, pathToCustom, resourcePath) {
  return string.replace(stringRegex, function (match, quote, url) {
    if (url.charAt(0) !== ".") {
      url = "./" + url;
    }
    if(url.charAt(0) === "." && url.charAt(1) === "/"){
      try{   
        join = path.join(pathToCustom, url.substring(1, url.length));
        fs.accessSync(join, fs.F_OK);
        url = path.relative(path.dirname(resourcePath), join);
      }catch (e) {
      }
    }
    return "require('" + url + "')";
  });
}

module.exports = function(source, sourcemap) {
  // Not cacheable during unit tests;
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  let resourcePath = this.resourcePath;
  var newSource = source.replace(templateUrlRegex, function (match, url) {
    
                 // replace: templateUrl: './path/to/template.html'
                 // with: template: require('./path/to/template.html')
                 let replaceString = replaceStringsWithRequires(url, query.templatesPath, resourcePath);
                 replaceString = replaceString.replace(/\\/g, "/");
                 return "template:" +  replaceString;
               })
               .replace(stylesRegex, function (match, urls) {
                 // replace: stylesUrl: ['./foo.css', "./baz.css", "./index.component.css"]
                 // with: styles: [require('./foo.css'), require("./baz.css"), require("./index.component.css")]
                 let replaceString = replaceStringsWithRequires(urls, query.stylesPath, resourcePath);
                 replaceString = replaceString.replace(/\\/g, "/");
                 return "styles:" + replaceString;
               });
  // Support for tests
  if (this.callback) {
    this.callback(null, newSource, sourcemap)
  } else {
    return newSource;
  }
};