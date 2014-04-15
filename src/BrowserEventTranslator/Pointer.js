define(
  'BrowserEventTranslator/Pointer',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType',
    'BrowserEventTranslator/env/supports',
    'jquery', 'underscore'
  ],
  function (Base,PointInfo,
            Point,EventType,
            supports,
            $, _) {
    var proto = Object.create(Base.prototype);
    proto.constructor = BrowserEventTranslator;
    BrowserEventTranslator.prototype = proto;
    var symbols;
    var events = 'pointerdown pointerup pointercancel pointermove pointerover pointerout pointerenter pointerleave gotpointercapture lostpointercapture'.split(' ');
    (function () {
      symbols = Object.create(null);
      var properties = 'setPointerCapture releasePointerCapture touchAction'.split(' ');
      if (supports.PointerEvent) {
        _([events,properties]).flatten().forEach(function(key) {
          symbols[key] = key;
        });
      } else if (supports.MSPointerEvent) {
        events.forEach(function(key){
          symbols[key] = key.replace(/pointer(.)/,function($0,$1){
            return 'Pointer'+$1.toUpperCase();
          }).replace(/^./,function($0){
            return 'MS' + $0.toUpperCase();
          });
        });
        properties.forEach(function(key){
          symbols[key] = key.replace(/pointer(.)/,function($0,$1){
            return 'Pointer'+$1.toUpperCase();
          }).replace(/^./,function($0){
            return 'ms' + $0.toUpperCase();
          });
        });
      }
    })();
    var eventHandlers = Object.create(null);
    /**
     *
     * @namespace eventHandlers
     * @memberOf BrowserEventTranslator_Pointer
     * @description BrowserEventTranslator_Pointerで設定するPointerEventのevent handler
     * @private
     */
    BrowserEventTranslator.eventHandlers = eventHandlers;

    /**
     * @constructor BrowserEventTranslator_Pointer
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~options} options
     * @property {object} eventDict key:pointerId,value:PointerEventの辞書。現在このBrowserEventTranslatorでトラッキングされている最中のもの。
     * @private
     */
    function BrowserEventTranslator(el, options) {
      Base.call(this,el,options);
      var eventSuffix = this._eventSuffix;
      this.pointInfoDict = Object.create(null);
      this.eventDict = Object.create(null);
      var createCallback = this.wrapUpInJQEventHandler.bind(this);
      this.el.style[symbols['touchAction']] = 'none';
      this.addEventTrace();
      _(eventHandlers).each(function(handler,type){
        $(el).on(symbols[type] + eventSuffix,createCallback(handler));
      });

    }
    proto.addEventTrace = function addEventTrace() {
      if (this.trace) {
        var el = this.el;
        var eventSuffix = this._eventSuffix;
        var createCallback = this.wrapUpInJQEventHandler.bind(this);
        events.forEach(function (type) {
          $(el).on(symbols[type] + eventSuffix,
          createCallback(function (ev) {
            console.log(this.tracePrefix + ev.type,ev.pointerId,this.pointsFromEvent(ev).length,ev);
          }));
        });
      }
    };

    /**
     * @function pointsFromEvent
     * @memberOf BrowserEventTranslator_Pointer#
     * @override
     * @see BrowserEventTranslator_Base#pointsFromEvent
     *
     * @param {PointerEvent} ev
     */
    proto.pointsFromEvent = function pointsFromEvent(ev) {
      var pointInfoDict = this.pointInfoDict;
      var eventDict = this.eventDict;
      // 古いものから順に並べられたpointerId
      var sortedPointerIds = Object.keys(pointInfoDict).map(function(pointerId){
        var pointInfo = pointInfoDict[pointerId];
        return {at:pointInfo.at,id:pointerId};
      }).sort(function(a,b){
        return b - a;
      }).map(function(dict){
        return dict.id;
      });
      var evs = _.compact(sortedPointerIds.map(function(id){
        return eventDict[id];
      }));
      return evs.map(Point.fromEvent);
    };
    /**
     * @function pointerdown
     * @memberOf BrowserEventTranslator_Pointer.eventHandlers
     * @param {PointerEvent} ev
     */
    eventHandlers.pointerdown = function pointerdown(ev) {
      ev.target[symbols.setPointerCapture](ev.pointerId);
      this.setUpPointerTracking(ev);
      this.trigger(EventType.pointerdown, ev, this.pointsFromEvent(ev));
    };
    /**
     * @function stopPointerTracking
     * @memberOf BrowserEventTranslator_Pointer#
     * @override
     * @see BrowserEventTranslator_Base#stopPointerTracking
     *
     * @param {PointerEvent} ev
     * @returns {BrowserEventTranslator_PointInfo}
     */
    proto.stopPointerTracking = function stopPointerTracking (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'stopPointerTracking',ev.pointerId);
      }
      var pointInfo = this.pointInfoDict[ev.pointerId];
      delete this.pointInfoDict[ev.pointerId];
      delete this.eventDict[ev.pointerId];
      return pointInfo;
    };
    /**
     * @function setUpPointerTracking
     * @memberOf BrowserEventTranslator_Pointer#
     * @override
     * @see BrowserEventTranslator_Base#setUpPointerTracking
     *
     * @param {PointerEvent} ev
     */
    proto.setUpPointerTracking = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'setUpPointerTracking',ev.pointerId);
      }
      this.pointInfoDict[ev.pointerId] = new PointInfo(Point.fromEvent(ev));
      this.eventDict[ev.pointerId] = ev;
    };
    /**
     * @function pointermove
     * @memberOf BrowserEventTranslator_Pointer.eventHandlers
     * @param {PointerEvent} ev
     */
    eventHandlers.pointermove = function pointermove(ev) {
      this.trackPointer(ev);
      this.trigger(EventType.pointermove, ev, this.pointsFromEvent(ev));
    };

    /**
     * @function trackPointer
     * @memberOf BrowserEventTranslator_Pointer#
     * @override
     * @see BrowserEventTranslator_Base#trackPointer
     *
     * @param {PointerEvent} ev
     */
    proto.trackPointer = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'trackPointer',ev.pointerId);
      }
      /**
       * @type {BrowserEventTranslator_PointInfo}
       */
      var pointInfo = this.pointInfoDict[ev.pointerId];
      if (!pointInfo) {
        return;
      }
      pointInfo.update(Point.fromEvent(ev));
      this.eventDict[ev.pointerId] = ev;
    };
    /**
     * @function pointerup
     * @memberOf BrowserEventTranslator_Pointer.eventHandlers
     * @param {PointerEvent} ev
     */
    eventHandlers.pointerup = function pointerup(ev) {
      this.finishPointerTracking(ev);
      this.trigger(EventType.pointerup, ev, this.pointsFromEvent(ev));
    };
    /**
     * @function pointercancel
     * @memberOf BrowserEventTranslator_Pointer.eventHandlers
     * @param {PointerEvent} ev
     */
    eventHandlers.pointercancel = function pointercancel(ev) {
      this.stopPointerTracking(ev);
    };
    return BrowserEventTranslator;
  }
);
