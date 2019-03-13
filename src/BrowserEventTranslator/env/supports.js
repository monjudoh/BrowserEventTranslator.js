define('BrowserEventTranslator/env/supports',[],function(){
  const supports = Object.create(null);
  supports.PointerEvent = 'onpointerdown' in document.documentElement;
  supports.TouchEvent = 'ontouchstart' in document.documentElement;
  supports.MouseEvent = 'onmousedown' in document.documentElement;
  Object.freeze(supports);
  return supports;
});