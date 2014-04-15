define(
  'BrowserEventTranslator/Mouse',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType',
    'jquery', 'underscore'
  ],
  function (Base,PointInfo,
            Point,EventType,
            $, _) {
    var proto = Object.create(Base.prototype);
    proto.constructor = BrowserEventTranslator;
    BrowserEventTranslator.prototype = proto;

    var events = 'click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show'.split(' ');
    var eventHandlers = Object.create(null);
    /**
     *
     * @namespace eventHandlers
     * @memberOf BrowserEventTranslator_Mouse
     * @description BrowserEventTranslator_Mouseで設定するMouseEventのevent handler
     * @private
     */
    BrowserEventTranslator.eventHandlers = eventHandlers;

    /**
     * @constructor BrowserEventTranslator_Mouse
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~options} options
     * @property {BrowserEventTranslator_PointInfo} pointInfo
     * @private
     */
    function BrowserEventTranslator(el, options) {
      Base.call(this,el,options);
      var eventSuffix = this._eventSuffix;
      var createCallback = this.wrapUpInJQEventHandler.bind(this);
      this.addEventTrace();
      _(eventHandlers).each(function(handler,type){
        $(el).on(type + eventSuffix,createCallback(handler));
      });
    }
    proto.addEventTrace = function addEventTrace() {
      if (this.trace) {
        var el = this.el;
        var eventSuffix = this._eventSuffix;
        var createCallback = this.wrapUpInJQEventHandler.bind(this);
        events.forEach(function (type) {
          $(el).on(type + eventSuffix,
          createCallback(function (ev) {
            console.log(this.tracePrefix + ev.type,ev);
          }));
        });
      }
    };

    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mousedown
     * @param {MouseEvent} ev
     */
    eventHandlers.mousedown = function mousedown(ev) {
      this.setUpPointerTracking(ev);
      var points = this.pointsFromEvent(ev);
      this.trigger(EventType.pointerdown, ev, points);
    };
    /**
     * @function pointsFromEvent
     * @memberOf BrowserEventTranslator_Mouse#
     * @override
     * @see BrowserEventTranslator_Base#pointsFromEvent
     *
     * @param {MouseEvent} ev
     */
    proto.pointsFromEvent = function pointsFromEvent(ev) {
      return this.pointInfo ? [Point.fromEvent(ev)] : [];
    };
    /**
     * @function stopPointerTracking
     * @memberOf BrowserEventTranslator_Mouse#
     * @override
     * @see BrowserEventTranslator_Base#stopPointerTracking
     *
     * @param {MouseEvent} ev
     * @returns {BrowserEventTranslator_PointInfo}
     */
    proto.stopPointerTracking = function stopPointerTracking (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'stopPointerTracking');
      }
      var pointInfo = this.pointInfo;
      delete this.pointInfo;
      return pointInfo;
    };

    /**
     * @function setUpPointerTracking
     * @memberOf BrowserEventTranslator_Mouse#
     * @override
     * @see BrowserEventTranslator_Base#setUpPointerTracking
     *
     * @param {MouseEvent} ev
     */
    proto.setUpPointerTracking = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'setUpPointerTracking');
      }
      this.pointInfo = new PointInfo(Point.fromEvent(ev));
    };
    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mousemove
     * @param {MouseEvent} ev
     */
    eventHandlers.mousemove = function mousemove(ev) {
      var points = this.pointsFromEvent(ev);
      this.trackPointer(ev);
      this.trigger(EventType.pointermove, ev, points);
    };
    /**
     * @function trackPointer
     * @memberOf BrowserEventTranslator_Mouse#
     * @override
     * @see BrowserEventTranslator_Base#trackPointer
     *
     * @param {MouseEvent} ev
     */
    proto.trackPointer = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'trackPointer');
      }
      if (!this.pointInfo) {
        return;
      }
      this.pointInfo.update(Point.fromEvent(ev));
    };
    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mouseup
     * @param {MouseEvent} ev
     */
    eventHandlers.mouseup = function mouseup(ev) {
      var points = this.pointsFromEvent(ev);
      this.finishPointerTracking(ev);
      this.trigger(EventType.pointerup, ev, points);
    };
    return BrowserEventTranslator;
  }
);
