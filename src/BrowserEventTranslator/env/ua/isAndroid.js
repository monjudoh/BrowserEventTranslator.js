define('BrowserEventTranslator/env/ua/isAndroid',function () {
  return function isAndroid(){
    return navigator.userAgent.indexOf('Android') >= 0;
  };
});
