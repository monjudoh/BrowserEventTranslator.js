define('BrowserEventTranslator/env/supports',[],function(){
  var supports = Object.create(null);
  (function () {
    supports.PointerEvent = !!navigator.pointerEnabled;
    // prefixed
    supports.MSPointerEvent = !!navigator.msPointerEnabled;
    supports.TouchEvent = 'ontouchstart' in document.documentElement;
    supports.MouseEvent = 'onmousedown' in document.documentElement;
  })();
  return supports;
});