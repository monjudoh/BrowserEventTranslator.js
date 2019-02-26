define('BrowserEventTranslator/Touch',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType'
  ],
  function () {
    "use strict";
    const [Base,PointInfo,
    Point,EventType] = [require('BrowserEventTranslator/Base'),require('BrowserEventTranslator/PointInfo'),
    require('BrowserEventTranslator/Point'),require('BrowserEventTranslator/EventType')];
    const events = 'touchstart touchend touchmove touchenter touchleave touchcancel'.split(' ');
    const eventHandlers = Object.create(null);
    const _difference = (a1,a2)=>a1.filter((value)=>!a2.includes(value));
    /**
     * @class BrowserEventTranslator_Touch
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~Options} options
     * @property {object} pointInfoDict key:identifier,value:pointInfoの辞書。現在このBrowserEventTranslatorでトラッキングされている最中のもの。
     * @private
     */
    class BrowserEventTranslator extends Base {
      constructor(el, options) {
        super(el,options);
        this.pointInfoDict = Object.create(null);
        this._addAllEventTrace();
        const types = Object.keys(eventHandlers);
        for (const type of types) {
          const handler = eventHandlers[type];
          this._addDOMEvent(type,handler);
        }
        if (this.trace) {
          console.log(this.tracePrefix + 'setup done');
        }
      }
      /**
       *
       * @namespace eventHandlers
       * @memberOf BrowserEventTranslator_Touch
       * @description BrowserEventTranslator_Touchで設定するTouchEventのevent handler
       * @private
       */
      static get eventHandlers(){
        return eventHandlers;
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Touch#
       * @override
       * @private
       * @see BrowserEventTranslator_Base#_addAllEventTrace
       */
      _addAllEventTrace() {
        if (this.options.trace) {
          this._addEventTrace(events,function (ev) {
            const identifiers = Array.from(ev.touches).map((touch)=>touch.identifier);
            console.log(this.tracePrefix + ev.type,identifiers,ev);
          });
        }
      }
      /**
       * @function pointsFromEvent
       * @memberOf BrowserEventTranslator_Touch#
       * @override
       * @see BrowserEventTranslator_Base#pointsFromEvent
       *
       * @param {TouchEvent} ev
       */
      pointsFromEvent(ev) {
        return Array.from(ev.touches).map(Point.fromTouch);
      }
      /**
       * @function stopPointerTracking
       * @memberOf BrowserEventTranslator_Touch#
       * @override
       * @see BrowserEventTranslator_Base#stopPointerTracking
       *
       * @param {TouchEvent} ev
       * @returns {BrowserEventTranslator_PointInfo}
       */
      stopPointerTracking (ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking',ev);
        }
        const pointInfoDict = this.pointInfoDict;
        const identifiers4remove = _difference(Object.keys(pointInfoDict),Array.from(ev.touches).map((touch)=>touch.identifier));
        const removed = identifiers4remove.map((identifier)=>{
          const pointInfo = pointInfoDict[identifier];
          delete pointInfoDict[identifier];
          return pointInfo;
        });
        if (this.longPress) {
          clearTimeout(this.longPress);
        }
        delete this.longPress;
        return removed[0];
      }
      /**
       * @function setUpPointerTracking
       * @memberOf BrowserEventTranslator_Touch#
       * @override
       * @see BrowserEventTranslator_Base#setUpPointerTracking
       *
       * @param {TouchEvent} ev
       */
      setUpPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'setUpPointerTracking',ev);
        }
        const pointInfoDict = this.pointInfoDict;
        const touches = Array.from(ev.touches);
        const identifier2touch = Object.create(null);
        touches.forEach(function(touch){
          identifier2touch[touch.identifier] = touch;
        });
        const identifiers4add = _difference(touches.map((touch)=>touch.identifier),Object.keys(pointInfoDict));
        const added = identifiers4add.map((identifier)=>{
          const touch = identifier2touch[identifier];
          pointInfoDict[identifier] = new PointInfo(Point.fromTouch(touch));
          return pointInfoDict[identifier];
        });
    
        // 長押し計測のスタート
        this.longPress = setTimeout(longPressIssuer.bind(this,added[0]),this.longPressTimeLimit);
      }
      /**
       * @function trackPointer
       * @memberOf BrowserEventTranslator_Touch#
       * @override
       * @see BrowserEventTranslator_Base#trackPointer
       *
       * @param {TouchEvent} ev
       */
      trackPointer(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'trackPointer',ev);
        }
        const pointInfoDict = this.pointInfoDict;
        // 接地点の移動と接地点の追加が同時に起こった場合、例えば指を動かしながらもう一本の指で触れる等した場合、
        // touchstartとtouchesの個数が増えた状態でのtouchmoveのどちらが先に起こるか分からない
        Array.from(ev.touches).forEach((touch)=>{
          if (pointInfoDict[touch.identifier]) {
            pointInfoDict[touch.identifier].update(Point.fromTouch(touch));
          }
        });
      }
    }
    /**
     * @function touchstart
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchstart = function touchstart(ev) {
      const points = this.pointsFromEvent(ev);
      this.setUpPointerTracking(ev);
      this.trigger(EventType.pointerdown, ev, points);
    };
    /**
     * @function touchmove
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchmove = function touchmove(ev) {
      const points = this.pointsFromEvent(ev);
      this.trackPointer(ev);
      this.trigger(EventType.pointermove, ev, points);
    };
    /**
     * @function touchend
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchend = function touchend(ev) {
      const points = this.pointsFromEvent(ev);
      this.finishPointerTracking(ev);
      this.trigger(EventType.pointerup, ev, points);
    };

    function longPressIssuer(pointInfo) {
      /*
       * this.pointInfoDictに発行時のpointInfoが含まれている
       * 指先を離したらtouchendが呼ばれ削除されている
       */
      const pointInfoList = Object.keys(this.pointInfoDict).map((key)=>this.pointInfoDict[key]);
      if (pointInfoList.includes(pointInfo) && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
        if (this.trace) {
          console.log(this.tracePrefix + 'recognize as longPress');
        }
        this.trigger(EventType.longPress, pointInfo.current);
      }
    }
    return BrowserEventTranslator;
  }
);
