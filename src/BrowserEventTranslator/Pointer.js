define(
  'BrowserEventTranslator/Pointer',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType',
    'BrowserEventTranslator/env/supports'
  ],
  function () {
    const [Base,PointInfo,
      Point,EventType] = [require('BrowserEventTranslator/Base'),require('BrowserEventTranslator/PointInfo'),
      require('BrowserEventTranslator/Point'),require('BrowserEventTranslator/EventType')];
    const events = 'pointerdown pointerup pointercancel pointermove pointerover pointerout pointerenter pointerleave gotpointercapture lostpointercapture'.split(' ');
    const eventHandlers = Object.create(null);

    /**
     * @constructor BrowserEventTranslator_Pointer
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~Options} options
     * @property {object} eventDict key:pointerId,value:PointerEventの辞書。現在このBrowserEventTranslatorでトラッキングされている最中のもの。
     * @private
     */
    class BrowserEventTranslator extends Base {
      constructor(el, options) {
        super(el, options);
        this.pointInfoDict = Object.create(null);
        this.eventDict = Object.create(null);
        this.el.style.touchAction = 'none';
        const types = Object.keys(eventHandlers);
        for (const type of types) {
          const handler = eventHandlers[type];
          this._addDOMEvent(type,handler);
        }
      }
      /**
       *
       * @namespace eventHandlers
       * @memberOf BrowserEventTranslator_Pointer
       * @description BrowserEventTranslator_Pointerで設定するPointerEventのevent handler
       * @private
       */
      static get eventHandlers(){
        return eventHandlers;
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @private
       * @see BrowserEventTranslator_Base#_addAllEventTrace
       */
      _addAllEventTrace() {
        if (this.options.trace) {
          this._addEventTrace(events,function (ev) {
            console.log(this.tracePrefix + ev.type,ev.pointerId,this.pointsFromEvent(ev).length,ev);
          });
        }
      }
      /**
       * @function pointsFromEvent
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @see BrowserEventTranslator_Base#pointsFromEvent
       *
       * @param {PointerEvent} ev
       */
      pointsFromEvent(ev) {
        const pointInfoDict = this.pointInfoDict;
        const eventDict = this.eventDict;
        // 古いものから順に並べられたpointerId
        const sortedPointerIds = Object.keys(pointInfoDict).map((pointerId)=>{
          const pointInfo = pointInfoDict[pointerId];
          return {at:pointInfo.at,id:pointerId};
        })
        .sort((a,b)=>b - a)
        .map((dict)=>dict.id);
        const evs = sortedPointerIds.map((id)=>eventDict[id]).filter((ev)=>!!ev);
        return evs.map(Point.fromEvent);
      }
      /**
       * @function stopPointerTracking
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @see BrowserEventTranslator_Base#stopPointerTracking
       *
       * @param {PointerEvent} ev
       * @returns {BrowserEventTranslator_PointInfo}
       */
      stopPointerTracking (ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking',ev.pointerId);
        }
        const pointInfo = this.pointInfoDict[ev.pointerId];
        delete this.pointInfoDict[ev.pointerId];
        delete this.eventDict[ev.pointerId];
        return pointInfo;
      }
      /**
       * @function setUpPointerTracking
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @see BrowserEventTranslator_Base#setUpPointerTracking
       *
       * @param {PointerEvent} ev
       */
      setUpPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'setUpPointerTracking',ev.pointerId);
        }
        this.pointInfoDict[ev.pointerId] = new PointInfo(Point.fromEvent(ev));
        this.eventDict[ev.pointerId] = ev;
      }
      /**
       * @function trackPointer
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @see BrowserEventTranslator_Base#trackPointer
       *
       * @param {PointerEvent} ev
       */
      trackPointer(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'trackPointer',ev.pointerId);
        }
        /**
         * @type {BrowserEventTranslator_PointInfo}
         */
        const pointInfo = this.pointInfoDict[ev.pointerId];
        if (!pointInfo) {
          return;
        }
        pointInfo.update(Point.fromEvent(ev));
        this.eventDict[ev.pointerId] = ev;
      }
    }

    /**
     * @function pointerdown
     * @memberOf BrowserEventTranslator_Pointer.eventHandlers
     * @param {PointerEvent} ev
     */
    eventHandlers.pointerdown = function pointerdown(ev) {
      ev.target.setPointerCapture(ev.pointerId);
      this.setUpPointerTracking(ev);
      this.trigger(EventType.pointerdown, ev, this.pointsFromEvent(ev));
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
