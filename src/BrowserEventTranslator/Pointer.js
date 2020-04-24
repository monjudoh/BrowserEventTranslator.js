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
        if (this.options.touchAction) {
          this.el.style.touchAction = this.options.touchAction;
        }

        // iOS,iPadOSのSafari13ではpointerupが短時間で連続して拾えない問題があり、touchstartに空handlerを登録しておくと回避できる
        // TODO Safari13.1以降で解消された場合にこれを除外する
        if (/AppleWebKit\/605/.exec(navigator.userAgent) && 'onpointerdown' in document.documentElement && 'ontouchstart' in document.documentElement) {
          // これがtouchstartだとtouch-actionで指定されたデフォルト動作の許可ができない
          this._addDOMEvent('touchend', ()=>{});
        }

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
        if (this.longPress) {
          clearTimeout(this.longPress);
        }
        delete this.longPress;
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

        const pointInfo = new PointInfo(Point.fromEvent(ev));
        this.pointInfoDict[ev.pointerId] = pointInfo;
        this.eventDict[ev.pointerId] = ev;
        const longPressIssuer = ()=>{
          const pointInfoList = Object.keys(this.pointInfoDict).map((key)=>this.pointInfoDict[key]);
          if (pointInfoList.includes(pointInfo) && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
            if (this.trace) {
              console.log(this.tracePrefix + 'recognize as longPress');
            }
            const latestEv = this.eventDict[ev.pointerId];
            this.trigger(EventType.longPress, latestEv, pointInfo.current);
          }
        };
        // 長押し計測のスタート
        this.longPress = setTimeout(longPressIssuer,this.longPressTimeLimit);
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
      if (this.pointerCapture) {
        ev.target.setPointerCapture(ev.pointerId);
      }
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
      const points = this.pointsFromEvent(ev);
      this.stopPointerTracking(ev);
      this.trigger(EventType.pointercancel, ev, points);
    };
    return BrowserEventTranslator;
  }
);
