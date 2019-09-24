define(
  'BrowserEventTranslator/Mouse',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType'
  ],
  function () {
    const [Base,PointInfo,
      Point,EventType] = [require('BrowserEventTranslator/Base'),require('BrowserEventTranslator/PointInfo'),
      require('BrowserEventTranslator/Point'),require('BrowserEventTranslator/EventType')];

    const events = 'click contextmenu dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup show'.split(' ');
    const eventHandlers = Object.create(null);
    /**
     * @class BrowserEventTranslator_Mouse
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~Options} options
     * @property {BrowserEventTranslator_PointInfo} pointInfo
     * @private
     */
    class BrowserEventTranslator extends Base {
      constructor(el, options) {
        super(el,options);
        this._addAllEventTrace();
        const types = Object.keys(eventHandlers);
        for (const type of types) {
          const handler = eventHandlers[type];
          this._addDOMEvent(type,handler);
        }
      }
      /**
       *
       * @namespace eventHandlers
       * @memberOf BrowserEventTranslator_Mouse
       * @description BrowserEventTranslator_Mouseで設定するMouseEventのevent handler
       * @private
       */
      static get eventHandlers(){
        return eventHandlers;
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @private
       * @see BrowserEventTranslator_Base#_addAllEventTrace
       */
      _addAllEventTrace() {
        if (this.options.trace) {
          this._addEventTrace(events,function (ev) {
            console.log(this.tracePrefix + ev.type,ev);
          });
        }
      }
      /**
       * @function pointsFromEvent
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @see BrowserEventTranslator_Base#pointsFromEvent
       *
       * @param {MouseEvent} ev
       */
      pointsFromEvent(ev) {
        return this.pointInfo ? [Point.fromEvent(ev)] : [];
      }
      /**
       * @function stopPointerTracking
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @see BrowserEventTranslator_Base#stopPointerTracking
       *
       * @param {MouseEvent} ev
       * @returns {BrowserEventTranslator_PointInfo}
       */
      stopPointerTracking (ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking');
        }
        const pointInfo = this.pointInfo;
        delete this.pointInfo;
        if (this.longPress) {
          clearTimeout(this.longPress);
        }
        delete this.longPress;
        return pointInfo;
      }
      /**
       * @function setUpPointerTracking
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @see BrowserEventTranslator_Base#setUpPointerTracking
       *
       * @param {MouseEvent} ev
       */
      setUpPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'setUpPointerTracking');
        }
        this.pointInfo = new PointInfo(Point.fromEvent(ev));
        const pointInfo = this.pointInfo;
        const longPressIssuer = ()=>{
          if (pointInfo === this.pointInfo && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
            if (this.trace) {
              console.log(this.tracePrefix + 'recognize as longPress');
            }
            this.trigger(EventType.longPress, pointInfo.current);
          }
        };
        // 長押し計測のスタート
        this.longPress = setTimeout(longPressIssuer,this.longPressTimeLimit);
      }
      /**
       * @function trackPointer
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @see BrowserEventTranslator_Base#trackPointer
       *
       * @param {MouseEvent} ev
       */
      trackPointer(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'trackPointer');
        }
        if (!this.pointInfo) {
          return;
        }
        this.pointInfo.update(Point.fromEvent(ev));
      };
    }
    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mousedown
     * @param {MouseEvent} ev
     */
    eventHandlers.mousedown = function mousedown(ev) {
      this.setUpPointerTracking(ev);
      const points = this.pointsFromEvent(ev);
      this.trigger(EventType.pointerdown, ev, points);
    };
    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mousemove
     * @param {MouseEvent} ev
     */
    eventHandlers.mousemove = function mousemove(ev) {
      const points = this.pointsFromEvent(ev);
      this.trackPointer(ev);
      this.trigger(EventType.pointermove, ev, points);
    };

    /**
     * @memberOf BrowserEventTranslator_Mouse.eventHandlers
     * @function mouseup
     * @param {MouseEvent} ev
     */
    eventHandlers.mouseup = function mouseup(ev) {
      const points = this.pointsFromEvent(ev);
      this.finishPointerTracking(ev);
      this.trigger(EventType.pointerup, ev, points);
    };
    return BrowserEventTranslator;
  }
);
