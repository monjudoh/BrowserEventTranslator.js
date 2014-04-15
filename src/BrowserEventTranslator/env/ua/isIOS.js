define('BrowserEventTranslator/env/ua/isIOS',function () {
  return function isIOS(){
    var ua = navigator.userAgent;
    return ua.indexOf('like Mac OS X') >= 0;
  };
});