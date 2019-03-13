define('BrowserEventTranslator/env/ua/isIOS',function () {
  return function isIOS(){
    return navigator.userAgent.indexOf('like Mac OS X') >= 0;
  };
});