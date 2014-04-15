define('BrowserEventTranslator/env/ua/isIE',function () {
  return function isIE(){
    var ua = navigator.userAgent;
    return ua.indexOf('compatible; MSIE') >= 0 || ua.indexOf('Trident/') >= 0;
  };
});