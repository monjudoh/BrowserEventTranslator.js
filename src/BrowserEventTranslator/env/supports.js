define('BrowserEventTranslator/env/supports',[],function(){
  const supports = Object.create(null);
  supports.PointerEvent = !!navigator.pointerEnabled;
  supports.TouchEvent = 'ontouchstart' in document.documentElement;
  supports.MouseEvent = 'onmousedown' in document.documentElement;
  Object.freeze(supports);
  return supports;
});