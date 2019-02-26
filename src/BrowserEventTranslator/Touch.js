define('BrowserEventTranslator/Touch',
  [
    'BrowserEventTranslator/Base','BrowserEventTranslator/PointInfo',
    'BrowserEventTranslator/Point','BrowserEventTranslator/EventType',
    'underscore'
  ],
  function () {
    "use strict";
    const [Base,PointInfo,
    Point,EventType,
    _] = [require('BrowserEventTranslator/Base'),require('BrowserEventTranslator/PointInfo'),
    require('BrowserEventTranslator/Point'),require('BrowserEventTranslator/EventType'),
    require('underscore')];
    
    var proto = Object.create(Base.prototype);
    proto.constructor = BrowserEventTranslator;
    BrowserEventTranslator.prototype = proto;
    var Array_from = (function () {
      return function(arrayLike) {
        var slice = Array.prototype.slice;
        return slice.call(arrayLike);
      };
    })();
    var events = 'touchstart touchend touchmove touchenter touchleave touchcancel'.split(' ');
    var eventHandlers = Object.create(null);
    /**
     *
     * @namespace eventHandlers
     * @memberOf BrowserEventTranslator_Touch
     * @description BrowserEventTranslator_Touchで設定するTouchEventのevent handler
     * @private
     */
    BrowserEventTranslator.eventHandlers = eventHandlers;
    /**
     * @constructor BrowserEventTranslator_Touch
     * @extends BrowserEventTranslator_Base
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~Options} options
     * @property {object} pointInfoDict key:identifier,value:pointInfoの辞書。現在このBrowserEventTranslatorでトラッキングされている最中のもの。
     * @private
     */
    function BrowserEventTranslator(el, options) {
      Base.call(this,el,options);
      this.pointInfoDict = Object.create(null);
      this._addAllEventTrace();
      var addDOMEvent = this._addDOMEvent.bind(this);
      _(eventHandlers).each(function(handler,type){
        addDOMEvent(type,handler);
      });
      if (this.trace) {
        console.log(this.tracePrefix + 'setup done');
      }
    }
    /**
     * @function _addAllEventTrace
     * @memberOf BrowserEventTranslator_Touch#
     * @override
     * @private
     * @see BrowserEventTranslator_Base#_addAllEventTrace
     */
    proto._addAllEventTrace = function _addAllEventTrace() {
      if (this.options.trace) {
        this._addEventTrace(events,function (ev) {
          var identifiers = Array_from(ev.touches).map(function(touch){
            return touch.identifier;
          });
          console.log(this.tracePrefix + ev.type,identifiers,ev);
        });
      }
    };

    /**
     * @function touchstart
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchstart = function touchstart(ev) {
      var points = this.pointsFromEvent(ev);
      this.setUpPointerTracking(ev);
      this.trigger(EventType.pointerdown, ev, points);
    };
    /**
     * @function pointsFromEvent
     * @memberOf BrowserEventTranslator_Touch#
     * @override
     * @see BrowserEventTranslator_Base#pointsFromEvent
     *
     * @param {TouchEvent} ev
     */
    proto.pointsFromEvent = function pointsFromEvent(ev) {
      return Array_from(ev.touches).map(Point.fromTouch);;
    };

    /**
     * @function stopPointerTracking
     * @memberOf BrowserEventTranslator_Touch#
     * @override
     * @see BrowserEventTranslator_Base#stopPointerTracking
     *
     * @param {TouchEvent} ev
     * @returns {BrowserEventTranslator_PointInfo}
     */
    proto.stopPointerTracking = function stopPointerTracking (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'stopPointerTracking',ev);
      }
      var pointInfoDict = this.pointInfoDict;
      var identifiers4remove = _.difference(Object.keys(pointInfoDict),Array_from(ev.touches).map(function(touch){
        return touch.identifier;
      }));
      var removed = identifiers4remove.map(function(identifier){
        var pointInfo = pointInfoDict[identifier];
        delete pointInfoDict[identifier];
        return pointInfo;
      });
      if (this.longPress) {
        clearTimeout(this.longPress);
      }
      delete this.longPress;
      return removed[0];
    };
    /**
     * @function setUpPointerTracking
     * @memberOf BrowserEventTranslator_Touch#
     * @override
     * @see BrowserEventTranslator_Base#setUpPointerTracking
     *
     * @param {TouchEvent} ev
     */
    proto.setUpPointerTracking = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'setUpPointerTracking',ev);
      }
      var pointInfoDict = this.pointInfoDict;
      var touches = Array_from(ev.touches);
      var identifier2touch = Object.create(null);
      touches.forEach(function(touch){
        identifier2touch[touch.identifier] = touch;
      });
      var identifiers4add = _.difference(touches.map(function(touch){
        return touch.identifier;
      }),Object.keys(pointInfoDict));
      var added = identifiers4add.map(function(identifier){
        var touch = identifier2touch[identifier];
        pointInfoDict[identifier] = new PointInfo(Point.fromTouch(touch));
        return pointInfoDict[identifier];
      });

      // 長押し計測のスタート
      this.longPress = setTimeout(longPressIssuer.bind(this,added[0]),this.longPressTimeLimit);
    };
    /**
     * @function touchmove
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchmove = function touchmove(ev) {
      var points = this.pointsFromEvent(ev);
      this.trackPointer(ev);
      this.trigger(EventType.pointermove, ev, points);
    };
    /**
     * @function trackPointer
     * @memberOf BrowserEventTranslator_Touch#
     * @override
     * @see BrowserEventTranslator_Base#trackPointer
     *
     * @param {TouchEvent} ev
     */
    proto.trackPointer = function (ev) {
      if (this.trace) {
        console.log(this.tracePrefix + 'trackPointer',ev);
      }
      var pointInfoDict = this.pointInfoDict;
      // 接地点の移動と接地点の追加が同時に起こった場合、例えば指を動かしながらもう一本の指で触れる等した場合、
      // touchstartとtouchesの個数が増えた状態でのtouchmoveのどちらが先に起こるか分からない
      Array_from(ev.touches).forEach(function(touch){
        if (pointInfoDict[touch.identifier]) {
          pointInfoDict[touch.identifier].update(Point.fromTouch(touch));
        }
      });
    };
    /**
     * @function touchend
     * @memberOf BrowserEventTranslator_Touch.eventHandlers
     * @param {TouchEvent} ev
     */
    eventHandlers.touchend = function touchend(ev) {
      var points = this.pointsFromEvent(ev);
      this.finishPointerTracking(ev);
      this.trigger(EventType.pointerup, ev, points);
    };

    function longPressIssuer(pointInfo) {
      /*
       * this.pointInfoDictに発行時のpointInfoが含まれている
       * 指先を離したらtouchendが呼ばれ削除されている
       */
      if (_(_.values(this.pointInfoDict)).contains(pointInfo)
        && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
        if (this.trace) {
          console.log(this.tracePrefix + 'recognize as longPress');
        }
        this.trigger(EventType.longPress, pointInfo.current);
      }
    }
    return BrowserEventTranslator;
  }
);
