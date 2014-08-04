define('BrowserEventTranslator/env/ua/isAndroid',function () {
  return function isAndroid(){
    var ua = navigator.userAgent;
    return ua.indexOf('Android') >= 0;
  };
});
