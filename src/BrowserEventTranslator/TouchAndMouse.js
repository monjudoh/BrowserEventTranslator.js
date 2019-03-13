define('BrowserEventTranslator/TouchAndMouse',
[
  'BrowserEventTranslator/Base',
  'BrowserEventTranslator/Touch','BrowserEventTranslator/Mouse'
]
,function () {
  "use strict";
  const [Base,
    Touch,Mouse] = [require('BrowserEventTranslator/Base'),
    require('BrowserEventTranslator/Touch'),require('BrowserEventTranslator/Mouse')];

  const touchProto = Touch.prototype;
  const mouseProto = Mouse.prototype;

  const eventHandlers = Object.create(null);
  {
    const keys = Object.keys(Touch.eventHandlers);
    for (const key of keys) {
      eventHandlers[key] = Touch.eventHandlers[key];
    }
  }
  {
    const keys = Object.keys(Mouse.eventHandlers);
    for (const key of keys) {
      eventHandlers[key] = Mouse.eventHandlers[key];
    }
  }

  /**
   * @class BrowserEventTranslator_TouchAndMouse
   * @extends BrowserEventTranslator_Base
   * @see BrowserEventTranslator_Touch
   * @see BrowserEventTranslator_Mouse
   *
   * @param {Element} el
   * @param {BrowserEventTranslator~Options} options
   * @private
   */
  class BrowserEventTranslator extends Base {
    constructor(el, options) {
      super(el, options);
      this.pointInfoDict = Object.create(null);
      touchProto._addAllEventTrace.call(this);
      mouseProto._addAllEventTrace.call(this);
      const types = Object.keys(eventHandlers);
      for (const type of types) {
        const handler = eventHandlers[type];
        this._addDOMEvent(type, handler);
      }
    }
    /**
     * @function pointsFromEvent
     * @memberOf BrowserEventTranslator_TouchAndMouse#
     * @override
     * @see BrowserEventTranslator_Base#pointsFromEvent
     *
     * @param {TouchEvent|MouseEvent} ev
     */
    pointsFromEvent(ev) {
      if (ev instanceof TouchEvent) {
        return touchProto.pointsFromEvent.call(this, ev);
      } else if (ev instanceof MouseEvent){
        return mouseProto.pointsFromEvent.call(this, ev);
      }
    }
    stopPointerTracking(ev) {
      if (ev instanceof TouchEvent) {
        return touchProto.stopPointerTracking.call(this, ev);
      } else if (ev instanceof MouseEvent){
        return mouseProto.stopPointerTracking.call(this, ev);
      }
    }
    setUpPointerTracking(ev) {
      if (ev instanceof TouchEvent) {
        touchProto.setUpPointerTracking.call(this, ev);
      } else if (ev instanceof MouseEvent){
        mouseProto.setUpPointerTracking.call(this, ev);
      }
    }
    trackPointer(ev) {
      if (ev instanceof TouchEvent) {
        touchProto.trackPointer.call(this, ev);
      } else if (ev instanceof MouseEvent){
        mouseProto.trackPointer.call(this, ev);
      }
    }
  }
  return BrowserEventTranslator;
});