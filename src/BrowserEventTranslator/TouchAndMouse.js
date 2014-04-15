define('BrowserEventTranslator/TouchAndMouse',
[
  'BrowserEventTranslator/Base',
  'BrowserEventTranslator/Touch','BrowserEventTranslator/Mouse',
  'jquery', 'underscore'
]
,function (Base,
           Touch,Mouse,
           $, _) {
  "use strict";
  var proto = Object.create(Base.prototype);
  proto.constructor = BrowserEventTranslator;
  BrowserEventTranslator.prototype = proto;

  var touchProto = Touch.prototype;
  var mouseProto = Mouse.prototype;

  var eventHandlers = Object.create(null);
  _(Touch.eventHandlers).each(function(val,key){
    eventHandlers[key] = val;
  });
  _(Mouse.eventHandlers).each(function(val,key){
    eventHandlers[key] = val;
  });
  /**
   * @constructor BrowserEventTranslator_TouchAndMouse
   * @extends BrowserEventTranslator_Base
   * @see BrowserEventTranslator_Touch
   * @see BrowserEventTranslator_Mouse
   *
   * @param {Element} el
   * @param {BrowserEventTranslator~options} options
   * @private
   */
  function BrowserEventTranslator(el, options) {
    Base.call(this,el,options);
    var eventSuffix = this._eventSuffix;
    this.pointInfoDict = Object.create(null);
    var createCallback = this.wrapUpInJQEventHandler.bind(this);
    touchProto.addEventTrace.call(this);
    mouseProto.addEventTrace.call(this);
    _(eventHandlers).each(function(handler,type){
      $(el).on(type + eventSuffix,createCallback(handler));
    });
  }
  /**
   * @function pointsFromEvent
   * @memberOf BrowserEventTranslator_TouchAndMouse#
   * @override
   * @see BrowserEventTranslator_Base#pointsFromEvent
   *
   * @param {TouchEvent|MouseEvent} ev
   */
  proto.pointsFromEvent = function pointsFromEvent(ev) {
    if (ev instanceof TouchEvent) {
      return touchProto.pointsFromEvent.call(this, ev);
    } else if (ev instanceof MouseEvent){
      return mouseProto.pointsFromEvent.call(this, ev);
    }
  };
  proto.stopPointerTracking = function stopPointerTracking(ev) {
    if (ev instanceof TouchEvent) {
      return touchProto.stopPointerTracking.call(this, ev);
    } else if (ev instanceof MouseEvent){
      return mouseProto.stopPointerTracking.call(this, ev);
    }
  };
  proto.setUpPointerTracking = function setUpPointerTracking(ev) {
    if (ev instanceof TouchEvent) {
      touchProto.setUpPointerTracking.call(this, ev);
    } else if (ev instanceof MouseEvent){
      mouseProto.setUpPointerTracking.call(this, ev);
    }
  };
  proto.trackPointer = function trackPointer(ev) {
    if (ev instanceof TouchEvent) {
      touchProto.trackPointer.call(this, ev);
    } else if (ev instanceof MouseEvent){
      mouseProto.trackPointer.call(this, ev);
    }
  };
  return BrowserEventTranslator;
});