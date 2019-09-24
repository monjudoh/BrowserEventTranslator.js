var main = module.exports = function main(options) {
  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');
  require('amdbuilder').build({
    requireConfig:{
      baseUrl:path.resolve(__dirname, 'src')
    },
    moduleName:'BrowserEventTranslator',
    exclude:'BeautifulProperties'.split(' '),
    distDir:path.resolve(__dirname, 'dist'),
    startBefore: _.template(fs.readFileSync(path.resolve(__dirname, 'copyright.template')).toString())({
      version:'1.0.0'
    })
  },function (builtFilePath,code){
//    console.log(builtFilePath);
//    console.log(code);
  });
};
if (require.main === module) {
  main();
}