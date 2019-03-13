/**
 * @module BrowserEventTranslator
 * @version 0.1.0
 * @author jbking,monjudoh
 * @copyright (c) 2014 jbking,monjudoh<br/>
 * Dual licensed under the MIT (MIT-LICENSE.txt)<br/>
 * and GPL (GPL-LICENSE.txt) licenses.
 * @see https://github.com/monjudoh/BrowserEventTranslator.js
 * @see BrowserEventTranslator
 */
define('BrowserEventTranslator', ['BeautifulProperties'], function (BeautifulProperties) {
  var BrowserEventTranslator_EventType, BrowserEventTranslator_Base, BrowserEventTranslator_PointInfo, BrowserEventTranslator_Point, BrowserEventTranslator_env_supports, BrowserEventTranslator_Pointer, BrowserEventTranslator_Touch, BrowserEventTranslator_Mouse, BrowserEventTranslator_TouchAndMouse, BrowserEventTranslator_env_ua_isIOS, BrowserEventTranslator_env_ua_isAndroid, BrowserEventTranslator;
  BrowserEventTranslator_EventType = function () {
    /**
     * @name EventType
     * @namespace
     * @memberOf BrowserEventTranslator
     */
    const EventType = {
      swipeLeft: 'controller:event:swipeleft',
      swipeRight: 'controller:event:swiperight',
      swipeUp: 'controller:event:swipeup',
      swipeDown: 'controller:event:swipedown',
      tap: 'controller:event:tap',
      doubleTap: 'controller:event:doubletap',
      pointerdown: 'controller:event:pointerdown',
      pointermove: 'controller:event:pointermove',
      pointerup: 'controller:event:pointerup',
      longPress: 'controller:event:longpress'
    };
    Object.freeze(EventType);
    /**
     * @name swipeLeft
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>左swipe event
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はBrowserEventTranslator.Point
     * pointerupした時点での座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#swipeDistance
     * @see BrowserEventTranslator#horizontalSwipeDegree
     */
    /**
     * @name swipeRight
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>右swipe event
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はBrowserEventTranslator.Point
     * pointerupした時点での座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#swipeDistance
     * @see BrowserEventTranslator#horizontalSwipeDegree
     */
    /**
     * @name swipeUp
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>上swipe event
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はBrowserEventTranslator.Point
     * pointerupした時点での座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#swipeDistance
     * @see BrowserEventTranslator#horizontalSwipeDegree
     */
    /**
     * @name swipeDown
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>下swipe event
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はBrowserEventTranslator.Point
     * pointerupした時点での座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#swipeDistance
     * @see BrowserEventTranslator#horizontalSwipeDegree
     */
    /**
     * @name tap
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>タップ event
     * pointerdown→pointermove→pointerupの流れでpointerの移動が上下共にdontSlideDistanceの範囲に収まっており、
     * doubleTapTimeLimitの時間内に次のpointerdown→pointermove→pointerupが完了しなかった場合に発火する(fastClickではない)。
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はUIEvent,BrowserEventTranslator.Point
     * pointerupした時点での生のUIEventと座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#dontSlideDistance
     * @see BrowserEventTranslator#doubleTapTimeLimit
     */
    /**
     * @name doubleTap
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>ダブルタップ event
     * pointerdown→pointermove→pointerupの流れでpointerの移動が上下共にdontSlideDistanceの範囲に収まっており、
     * doubleTapTimeLimitの時間内に次のpointerdown→pointermove→pointerupが完了した場合に発火する。
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はUIEvent,BrowserEventTranslator.Point
     * pointerupした時点での生のUIEventと座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     * @see BrowserEventTranslator#dontSlideDistance
     * @see BrowserEventTranslator#doubleTapTimeLimit
     */
    /**
     * @name pointerdown
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>pointerdown event
     * ブラウザのサポート状況、ユーザが使用する入力デバイスの違いによりeventによりpointerdown/mousedown/touchstart eventが発火するが、
     * それを統一してBrowserEventTranslatorに対して発火する。
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はUIEvent,BrowserEventTranslator.Pointの配列
     * pointerdownした際の生のUIEventとその時点でアクティブなpointerの座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     */
    /**
     * @name pointermove
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>pointermove event
     * ブラウザのサポート状況、ユーザが使用する入力デバイスの違いによりeventによりpointermove/mousemove/touchmove eventが発火するが、
     * それを統一してBrowserEventTranslatorに対して発火する。
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はUIEvent,BrowserEventTranslator.Pointの配列
     * pointermoveした際の生のUIEventとその時点でアクティブなpointerの座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     */
    /**
     * @name pointerup
     * @type string
     * @memberOf BrowserEventTranslator.EventType
     * @readonly
     *
     * @description <pre>pointerup event
     * ブラウザのサポート状況、ユーザが使用する入力デバイスの違いによりeventによりpointerup/mouseup/touchend eventが発火するが、
     * それを統一してBrowserEventTranslatorに対して発火する。
     * BeautifulPropertiesのEvent objectに続くeventHandlerの引数はUIEvent,BrowserEventTranslator.Pointの配列
     * pointerupした際の生のUIEventとその時点でアクティブなpointerの座標</pre>
     *
     * @see BeautifulProperties.Events
     * @see BrowserEventTranslator.Point
     */
    return EventType;
  }();
  BrowserEventTranslator_Base = function () {
    const [EventType] = [BrowserEventTranslator_EventType];
    /**
     * @callback BrowserEventTranslator_Base~DOMEventHandler
     * @this BrowserEventTranslator
     * @param {UIEvent} ev
     * @private
     * @description <pre>BrowserEventTranslatorにbindされたDOMEventのhandler</pre>
     */
    /**
     * @class BrowserEventTranslator_Base
     * @param {Element} el
     * @param {BrowserEventTranslator~Options} options
     * @private
     */
    class Base {
      constructor(el, options) {
        this.el = el;
        options = Object.assign(Object.create(null), {
          swipeDistance: 30,
          // px
          swipeTimeLimit: 300,
          //ms
          dontSlideDistance: 20,
          // px
          doubleTapTimeLimit: 300,
          // ms
          horizontalSwipeDegree: 50,
          // deg
          longPressTimeLimit: 1000,
          preventDefault: true,
          stopPropagation: false,
          trace: false,
          tracePrefix: undefined
        }, options);
        this.options = options;
        {
          const keys = Object.keys(options);
          for (const key of keys) {
            const value = options[key];
            BeautifulProperties.Hookable.define(this, key, { value: value });
            BeautifulProperties.Observable.define(this, key);
          }
        }
        if (options.preventDefaultCallback) {
          this.preventDefaultCallback = options.preventDefaultCallback;
        }
        if (options.stopPropagationCallback) {
          this.stopPropagationCallback = options.stopPropagationCallback;
        }
        if (this.tracePrefix) {
          this.tracePrefix += ': ';
        } else {
          this.tracePrefix = '';
        }
      }
      /**
       * @function _addDOMEvent
       * @memberOf BrowserEventTranslator_Base#
       * @param {string} type event type
       * @param {BrowserEventTranslator_Base~DOMEventHandler} handler
       * @see BrowserEventTranslator#el
       * @private
       * @description DOMEventのhandlerをラップして、BrowserEventTranslatorにbindされ、ガード込みのhandlerにした上でDOM要素(el)に登録する。
       */
      _addDOMEvent(type, handler) {
        const wrappedHandler = ev => {
          if (this._preHandleEventGuard(ev)) {
            return;
          }
          handler.call(this, ev);
        };
        const dict = this._DOMEventType2handlers;
        if (!dict[type]) {
          dict[type] = [];
        }
        dict[type].push(wrappedHandler);
        this.el.addEventListener(type, wrappedHandler, false);
      }
      /**
       * @function _addEventTrace
       * @memberOf BrowserEventTranslator_Base#
       * @param {Array.<string>} types
       * @param {BrowserEventTranslator_Base~DOMEventHandler} traceHandler log出力用handler
       * @private
       * @description typesで指定されたtypeのeventが発火したらlogを出力するようにする
       */
      _addEventTrace(types, traceHandler) {
        for (const type of types) {
          this._addDOMEvent(type, traceHandler);
        }
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Base#
       * @private
       * @abstract
       * @description その環境に存在する全てのevent typeについてeventが発火したらlogを出力するようにする
       */
      _addAllEventTrace() {
      }
      /**
       * @function _preHandleEventGuard
       * @memberOf BrowserEventTranslator_Base#
       * @param {UIEvent} ev
       * @returns {boolean} prevented
       * @description 各eventに設定されたhandlerが呼ばれる前のガード。trueを返した場合はhandlerを呼ばない。
       * @private
       */
      _preHandleEventGuard(ev) {
        if (this.preventDefaultCallback(ev)) {
          ev.preventDefault();
        }
        if (this.stopPropagationCallback(ev)) {
          ev.stopPropagation();
        }
        return this.preventTranslateCallback(ev);
      }
      /**
       * @name preventTranslateCallback
       * @memberOf BrowserEventTranslator_Base#
       * @type function
       * @description trueを返せばeventHandlerが呼ばれなくなるcallback
       */
      preventTranslateCallback(ev) {
        return false;
      }
      /**
       * @name preventDefaultCallback
       * @memberOf BrowserEventTranslator_Base#
       * @see BrowserEventTranslator#preventDefaultCallback
       */
      /**
       * @name preventDefaultCallback
       * @memberOf BrowserEventTranslator#
       * @type BrowserEventTranslator~PreventDefaultCallback
       * @default BrowserEventTranslator#preventDefaultを返す関数
       * @see BrowserEventTranslator#preventDefault
       * @see BrowserEventTranslator_Base#preventDefaultCallback
       */
      preventDefaultCallback(ev) {
        /* overridable */
        return this.preventDefault;
      }
      /**
       * @name stopPropagationCallback
       * @memberOf BrowserEventTranslator_Base#
       * @see BrowserEventTranslator#stopPropagationCallback
       */
      /**
       * @name stopPropagationCallback
       * @memberOf BrowserEventTranslator#
       * @type BrowserEventTranslator~StopPropagationCallback
       * @default BrowserEventTranslator#stopPropagationを返す関数
       * @see BrowserEventTranslator#stopPropagation
       * @see BrowserEventTranslator_Base#stopPropagationCallback
       */
      stopPropagationCallback(ev) {
        /* overridable */
        return this.stopPropagation;
      }
      /**
       * @function destroy
       * @memberOf BrowserEventTranslator_Base#
       * @see BrowserEventTranslator#destroy
       */
      /**
       * @function destroy
       * @memberOf BrowserEventTranslator#
       * @see BrowserEventTranslator_Base#destroy
       * @description <pre>要素に設定されたUIEvent,当objectに設定されたBeautifulProperties Eventを共に削除する</pre>
       */
      destroy() {
        if (this.trace) {
          console.log(this.tracePrefix + 'destroy');
        }
        const dict = this._DOMEventType2handlers;
        const el = this.el;
        const types = Object.keys(dict);
        for (const type of types) {
          const handlers = dict[type];
          for (const handler of handlers) {
            el.removeEventListener(type, handler, false);
          }
          handlers.length = 0;
        }
        this.off();
      }
      /**
       * @function isHorizontalSwipe
       * @memberOf BrowserEventTranslator_Base#
       * @param distance
       * @returns {boolean} 左右swipeだと判定されればtrue
       * @see BrowserEventTranslator#swipeDistance
       * @see BrowserEventTranslator#horizontalSwipeDegree
       */
      isHorizontalSwipe(distance) {
        const diagonal = Math.sqrt(Math.pow(distance.vertical, 2) + Math.pow(distance.horizontal, 2));
        const deg = degree(Math.asin(distance.vertical / diagonal));
        return diagonal >= this.swipeDistance && deg <= this.horizontalSwipeDegree;
      }
      /**
       * @function isVerticalSwipe
       * @memberOf BrowserEventTranslator_Base#
       * @param distance
       * @returns {boolean} 上下swipeだと判定されればtrue
       * @see BrowserEventTranslator#swipeDistance
       * @see BrowserEventTranslator#horizontalSwipeDegree
       */
      isVerticalSwipe(distance) {
        const diagonal = Math.sqrt(Math.pow(distance.vertical, 2) + Math.pow(distance.horizontal, 2));
        const deg = degree(Math.asin(distance.vertical / diagonal));
        // 角度判定のみ異なる
        return diagonal >= this.swipeDistance && deg > this.horizontalSwipeDegree;
      }
      /**
       * @function isNotSlided
       * @memberOf BrowserEventTranslator_Base#
       * @param {BrowserEventTranslator.Point} origin
       * @param {Array.<BrowserEventTranslator.Point>} tracking
       * @returns {boolean} pointerがスライドしていないと判定されればtrue
       * @see BrowserEventTranslator#dontSlideDistance
       */
      isNotSlided(origin, tracking) {
        const distance = this.dontSlideDistance;
        const min_x = origin.x - distance / 2;
        const max_x = min_x + distance;
        const min_y = origin.y - distance / 2;
        const max_y = min_y + distance;
        return (tracking || []).every(point => {
          return min_x <= point.x && point.x <= max_x && min_y <= point.y && point.y <= max_y;
        });
      }
      /**
       * @function tapOrDoubleTapIssuer
       * @memberOf BrowserEventTranslator_Base#
       * @param {UIEvent} ev
       * @param {BrowserEventTranslator.Point} point
       * @description <pre>tap/doubletapのハンドリングを行う。
       * 1度目のタップの後doubleTapTimeLimit ms以内に2度目のタップがあればダブルタップとして扱い、なければシングルタップとして扱う。
       * </pre>
       */
      tapOrDoubleTapIssuer(ev, point) {
        if (this.tapped) {
          clearTimeout(this.tapped);
          delete this.tapped;
          if (this.trace) {
            console.log(this.tracePrefix + 'recognize as doubleTap', ev, point);
          }
          this.trigger(EventType.doubleTap, ev, point);
        } else {
          this.tapped = setTimeout(tapIssuer.bind(this, ev, point), this.doubleTapTimeLimit);
        }
      }
      /**
       * @function pointsFromEvent
       * @memberOf BrowserEventTranslator_Base#
       * @abstract
       *
       * @param {PointerEvent|TouchEvent|MouseEvent} ev
       * @returns {Array.<BrowserEventTranslator.Point>} points
       * @description event objectから座標情報の配列を取得する
       */
      /**
       * @function setUpPointerTracking
       * @memberOf BrowserEventTranslator_Base#
       * @abstract
       *
       * @param {PointerEvent|TouchEvent|MouseEvent} ev
       *
       * @description pointerの追跡を開始する
       */
      /**
       * @function trackPointer
       * @memberOf BrowserEventTranslator_Base#
       * @abstract
       *
       * @param {PointerEvent|TouchEvent|MouseEvent} ev
       *
       * @description pointerの移動を記録する
       */
      /**
       * @function stopPointerTracking
       * @memberOf BrowserEventTranslator_Base#
       * @abstract
       *
       * @param {PointerEvent|TouchEvent|MouseEvent} ev
       * @returns {BrowserEventTranslator_PointInfo}
       *
       * @description pointerの追跡を終了し、追跡終了したpointerに紐づいていたPointInfoを返す
       */
      /**
       * @function finishPointerTracking
       * @memberOf BrowserEventTranslator_Base#
       * @param {PointerEvent|TouchEvent|MouseEvent} ev
       *
       * @description 追跡終了したpointerの足跡がどのジェスチャであるかを判定し、BeautifulProperties Eventとして発火させる
       */
      finishPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'finishPointerTracking', ev);
        }
        /**
         * @type {BrowserEventTranslator_PointInfo}
         */
        const pointInfo = this.stopPointerTracking(ev);
        // トラッキングされていなかったら中断
        if (!pointInfo) {
          return;
        }
        const tracking = pointInfo.tracking;
        const start = pointInfo.start;
        let current = pointInfo.current;
        // 追跡終了後のアクティブな接地点
        const points = this.pointsFromEvent(ev);
        // pointerdown/touchstart/mousedownから指が移動してなければ
        if (start === current) {
          // 最後の座標点でタッチが終えたものとする
          current = start.clone();
          current.at = Date.now();
        }
        // 長押し以前の早さ、つまり通常のイベント発生速度か
        if (current.at - start.at > this.longPressTimeLimit) {
          return;
        }
        // タップ・ダブルタップは1本指で行うと定義するので、追跡終了後のアクティブな接地点がなく、スライドもしていないのが条件になる。
        if (points.length === 0 && this.isNotSlided(start, tracking)) {
          this.tapOrDoubleTapIssuer(ev, current);
        } else if (current.at - start.at < this.swipeTimeLimit) {
          // スワイプかも(時間的にはスワイプと判断できる範囲)
          const direction = {
            vertical: current.y > start.y ? 'DOWN' : 'UP',
            horizontal: current.x > start.x ? 'RIGHT' : 'LEFT'
          };
          // いちいち全ての領域について網羅するのもあれなので正正の領域にもってくる
          const distance = {
            vertical: Math.abs(current.y - start.y),
            horizontal: Math.abs(current.x - start.x)
          };
          let eventName;
          if (this.isHorizontalSwipe(distance)) {
            eventName = 'swipe' + capitalFirstLetter(direction.horizontal);
          } else if (this.isVerticalSwipe(distance)) {
            eventName = 'swipe' + capitalFirstLetter(direction.vertical);
          }
          if (eventName) {
            // スワイプ
            if (this.trace) {
              console.log(this.tracePrefix + 'recognize as ' + eventName);
            }
            this.trigger(EventType[eventName], current);
          }
        }
      }
    }
    const proto = Base.prototype;
    BeautifulProperties.Events.provideMethods(proto);
    /**
     * @name _DOMEventType2handlers
     * @memberOf BrowserEventTranslator_Base#
     * @see BrowserEventTranslator#el
     * @private
     * @description BrowserEventTranslatorでDOM要素(el)に登録した全てのevent handlerをevent type別に抱えておく為の配列の辞書
     */
    BeautifulProperties.LazyInitializable.define(proto, '_DOMEventType2handlers', {
      enumerable: false,
      init: function () {
        return Object.create(null);
      }
    });
    function degree(rad) {
      return rad / Math.PI * 180;
    }
    function tapIssuer(ev, point) {
      if (this.trace) {
        console.log(this.tracePrefix + 'recognize as tap', ev, point);
      }
      this.trigger(EventType.tap, ev, point);
      delete this.tapped;
    }
    function capitalFirstLetter(s) {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    return Base;
  }();
  BrowserEventTranslator_PointInfo = function () {
    /**
     * @class BrowserEventTranslator_PointInfo
     *
     * @param {BrowserEventTranslator_Point} point
     *
     * @property {Array.<BrowserEventTranslator_PointInfo.Point>} tracking トラッキング中のPointの履歴
     * @property {BrowserEventTranslator_PointInfo.Point} start トラッキング開始時点でのPoint
     * @property {BrowserEventTranslator_PointInfo.Point} current 最新のPoint
     * @property {number} at 作成時間
     * @private
     */
    class PointInfo {
      constructor(point) {
        this.tracking = [];
        this.update(point);
        this.start = this.current;
        this.at = Date.now();
      }
      update(point) {
        point.at = Date.now();
        this.current = point;
        this.tracking.push(point);
      }
    }
    /**
     * @constructor BrowserEventTranslator_PointInfo.Point
     * @extends BrowserEventTranslator.Point
     * @property {number} at 時間
     * @description 実際にはコンストラクタは存在しないがPointInfoは受け取ったPointを拡張して使うのでその型
     * @private
     */
    return PointInfo;
  }();
  BrowserEventTranslator_Point = function () {
    /**
     *
     * @class Point
     * @memberOf BrowserEventTranslator
     * @property {number} x
     * @property {number} y
     * @description 2次元座標
     */
    class Point {
      /**
       * @function fromEvent
       * @memberOf BrowserEventTranslator.Point
       * @param {UIEvent} ev
       * @returns {BrowserEventTranslator.Point}
       * @description PointerEventないしMouseEventからPoint objectに変換する
       */
      static fromEvent(ev) {
        const point = new Point();
        point.x = ev.clientX;
        point.y = ev.clientY;
        return point;
      }
      /**
       * @function fromTouch
       * @memberOf BrowserEventTranslator.Point
       * @param {Touch} touch
       * @returns {BrowserEventTranslator.Point}
       * @description TouchEvent#touchesに格納されているTouchからPoint objectに変換する
       */
      static fromTouch(touch) {
        const point = new Point();
        point.x = touch.clientX;
        point.y = touch.clientY;
        return point;
      }
      /**
       * @function fromDict
       * @memberOf BrowserEventTranslator.Point
       * @param {{x:number,y:number}} dict
       * @returns {BrowserEventTranslator.Point}
       * @description x,yの辞書からPoint objectに変換する
       */
      static fromDict(dict) {
        const point = new Point();
        point.x = dict.x;
        point.y = dict.y;
        return point;
      }
      /**
       * @function distance
       * @memberOf BrowserEventTranslator.Point#
       * @param {BrowserEventTranslator.Point} otherPoint
       * @returns {number}
       * @description 2点間の距離を取得する
       */
      distance(otherPoint) {
        return Math.sqrt(Math.pow(this.x - otherPoint.x, 2) + Math.pow(this.y - otherPoint.y, 2));
      }
      /**
       * @function toDict
       * @memberOf BrowserEventTranslator.Point#
       * @returns {{x:number,y:number}}
       * @description 同じ座標情報を持った辞書を返す
       */
      toDict() {
        const dict = Object.create(null);
        dict.x = this.x;
        dict.y = this.y;
        return dict;
      }
      /**
       * @function clone
       * @memberOf BrowserEventTranslator.Point#
       * @returns {BrowserEventTranslator.Point}
       * @description 自身の複製を返す
       */
      clone() {
        const point = new Point();
        point.x = this.x;
        point.y = this.y;
        return point;
      }
    }
    return Point;
  }();
  BrowserEventTranslator_env_supports = function () {
    const supports = Object.create(null);
    supports.PointerEvent = 'onpointerdown' in document.documentElement;
    supports.TouchEvent = 'ontouchstart' in document.documentElement;
    supports.MouseEvent = 'onmousedown' in document.documentElement;
    Object.freeze(supports);
    return supports;
  }();
  BrowserEventTranslator_Pointer = function () {
    const [Base, PointInfo, Point, EventType] = [
      BrowserEventTranslator_Base,
      BrowserEventTranslator_PointInfo,
      BrowserEventTranslator_Point,
      BrowserEventTranslator_EventType
    ];
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
          this._addDOMEvent(type, handler);
        }
      }
      /**
       *
       * @namespace eventHandlers
       * @memberOf BrowserEventTranslator_Pointer
       * @description BrowserEventTranslator_Pointerで設定するPointerEventのevent handler
       * @private
       */
      static get eventHandlers() {
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
          this._addEventTrace(events, function (ev) {
            console.log(this.tracePrefix + ev.type, ev.pointerId, this.pointsFromEvent(ev).length, ev);
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
        const sortedPointerIds = Object.keys(pointInfoDict).map(pointerId => {
          const pointInfo = pointInfoDict[pointerId];
          return {
            at: pointInfo.at,
            id: pointerId
          };
        }).sort((a, b) => b - a).map(dict => dict.id);
        const evs = sortedPointerIds.map(id => eventDict[id]).filter(ev => !!ev);
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
      stopPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking', ev.pointerId);
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
          console.log(this.tracePrefix + 'setUpPointerTracking', ev.pointerId);
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
          console.log(this.tracePrefix + 'trackPointer', ev.pointerId);
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
  }();
  BrowserEventTranslator_Touch = function () {
    const [Base, PointInfo, Point, EventType] = [
      BrowserEventTranslator_Base,
      BrowserEventTranslator_PointInfo,
      BrowserEventTranslator_Point,
      BrowserEventTranslator_EventType
    ];
    const events = 'touchstart touchend touchmove touchenter touchleave touchcancel'.split(' ');
    const eventHandlers = Object.create(null);
    const _difference = (a1, a2) => a1.filter(value => !a2.includes(value));
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
        super(el, options);
        this.pointInfoDict = Object.create(null);
        this._addAllEventTrace();
        const types = Object.keys(eventHandlers);
        for (const type of types) {
          const handler = eventHandlers[type];
          this._addDOMEvent(type, handler);
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
      static get eventHandlers() {
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
          this._addEventTrace(events, function (ev) {
            const identifiers = Array.from(ev.touches).map(touch => touch.identifier);
            console.log(this.tracePrefix + ev.type, identifiers, ev);
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
      stopPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking', ev);
        }
        const pointInfoDict = this.pointInfoDict;
        const identifiers4remove = _difference(Object.keys(pointInfoDict), Array.from(ev.touches).map(touch => touch.identifier));
        const removed = identifiers4remove.map(identifier => {
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
          console.log(this.tracePrefix + 'setUpPointerTracking', ev);
        }
        const pointInfoDict = this.pointInfoDict;
        const touches = Array.from(ev.touches);
        const identifier2touch = Object.create(null);
        touches.forEach(function (touch) {
          identifier2touch[touch.identifier] = touch;
        });
        const identifiers4add = _difference(touches.map(touch => touch.identifier), Object.keys(pointInfoDict));
        const added = identifiers4add.map(identifier => {
          const touch = identifier2touch[identifier];
          pointInfoDict[identifier] = new PointInfo(Point.fromTouch(touch));
          return pointInfoDict[identifier];
        });
        // 長押し計測のスタート
        this.longPress = setTimeout(longPressIssuer.bind(this, added[0]), this.longPressTimeLimit);
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
          console.log(this.tracePrefix + 'trackPointer', ev);
        }
        const pointInfoDict = this.pointInfoDict;
        // 接地点の移動と接地点の追加が同時に起こった場合、例えば指を動かしながらもう一本の指で触れる等した場合、
        // touchstartとtouchesの個数が増えた状態でのtouchmoveのどちらが先に起こるか分からない
        Array.from(ev.touches).forEach(touch => {
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
      const pointInfoList = Object.keys(this.pointInfoDict).map(key => this.pointInfoDict[key]);
      if (pointInfoList.includes(pointInfo) && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
        if (this.trace) {
          console.log(this.tracePrefix + 'recognize as longPress');
        }
        this.trigger(EventType.longPress, pointInfo.current);
      }
    }
    return BrowserEventTranslator;
  }();
  BrowserEventTranslator_Mouse = function () {
    const [Base, PointInfo, Point, EventType] = [
      BrowserEventTranslator_Base,
      BrowserEventTranslator_PointInfo,
      BrowserEventTranslator_Point,
      BrowserEventTranslator_EventType
    ];
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
        super(el, options);
        this._addAllEventTrace();
        const types = Object.keys(eventHandlers);
        for (const type of types) {
          const handler = eventHandlers[type];
          this._addDOMEvent(type, handler);
        }
      }
      /**
       *
       * @namespace eventHandlers
       * @memberOf BrowserEventTranslator_Mouse
       * @description BrowserEventTranslator_Mouseで設定するMouseEventのevent handler
       * @private
       */
      static get eventHandlers() {
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
          this._addEventTrace(events, function (ev) {
            console.log(this.tracePrefix + ev.type, ev);
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
      stopPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking');
        }
        const pointInfo = this.pointInfo;
        delete this.pointInfo;
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
      }
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
  }();
  BrowserEventTranslator_TouchAndMouse = function () {
    const [Base, Touch, Mouse] = [
      BrowserEventTranslator_Base,
      BrowserEventTranslator_Touch,
      BrowserEventTranslator_Mouse
    ];
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
        } else if (ev instanceof MouseEvent) {
          return mouseProto.pointsFromEvent.call(this, ev);
        }
      }
      stopPointerTracking(ev) {
        if (ev instanceof TouchEvent) {
          return touchProto.stopPointerTracking.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          return mouseProto.stopPointerTracking.call(this, ev);
        }
      }
      setUpPointerTracking(ev) {
        if (ev instanceof TouchEvent) {
          touchProto.setUpPointerTracking.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          mouseProto.setUpPointerTracking.call(this, ev);
        }
      }
      trackPointer(ev) {
        if (ev instanceof TouchEvent) {
          touchProto.trackPointer.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          mouseProto.trackPointer.call(this, ev);
        }
      }
    }
    return BrowserEventTranslator;
  }();
  BrowserEventTranslator_env_ua_isIOS = function isIOS() {
    return navigator.userAgent.indexOf('like Mac OS X') >= 0;
  };
  BrowserEventTranslator_env_ua_isAndroid = function isAndroid() {
    return navigator.userAgent.indexOf('Android') >= 0;
  };
  BrowserEventTranslator = function () {
    const [Pointer, Touch, Mouse, Point, TouchAndMouse, EventType, supports, isIOS, isAndroid] = [
      BrowserEventTranslator_Pointer,
      BrowserEventTranslator_Touch,
      BrowserEventTranslator_Mouse,
      BrowserEventTranslator_Point,
      BrowserEventTranslator_TouchAndMouse,
      BrowserEventTranslator_EventType,
      BrowserEventTranslator_env_supports,
      BrowserEventTranslator_env_ua_isIOS,
      BrowserEventTranslator_env_ua_isAndroid
    ];
    /**
     * @typedef BrowserEventTranslator~Options
     * @property {number=} swipeDistance
     * @property {number=} swipeTimeLimit
     * @property {number=} dontSlideDistance
     * @property {number=} doubleTapTimeLimit
     * @property {number=} horizontalSwipeDegree
     * @property {number=} longPressTimeLimit
     * @property {boolean=} preventDefault
     * @property {boolean=} stopPropagation
     * @property {boolean=} trace
     * @property {string=} tracePrefix
     * @property {BrowserEventTranslator~PreventDefaultCallback=} preventDefaultCallback
     * @property {BrowserEventTranslator~StopPropagationCallback=} stopPropagationCallback
     * @description <pre>BrowserEventTranslatorのoptions
     * コンストラクタに渡すと各propertyに設定される。</pre>
     * @see BrowserEventTranslator
     */
    /**
     * @callback BrowserEventTranslator~PreventDefaultCallback
     * @param {UIEvent} ev
     * @returns {boolean} trueを返せばev.preventDefault()が呼ばれるようになる
     */
    /**
     * @callback BrowserEventTranslator~StopPropagationCallback
     * @param {UIEvent} ev
     * @returns {boolean} trueを返せばev.stopPropagation()が呼ばれるようになる
     */
    /**
     * @name el
     * @memberOf BrowserEventTranslator#
     * @type Element
     * @description event変換の対象となるDOM要素
     */
    /**
     * @name options
     * @memberOf BrowserEventTranslator#
     * @type BrowserEventTranslator~Options
     */
    /**
     * @name swipeDistance
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 30
     * @description pointerがこれ以上動いていればスワイプ動作であるとする基準値(px)
     */
    /**
     * @name swipeTimeLimit
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 300
     * @description これ以上の時間pointerを動かしていたらスワイプと見なさいないとする基準値(ms)
     */
    /**
     * @name dontSlideDistance
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 20
     * @description この範囲内のpointerの動きであれば無視する基準値(px)
     */
    /**
     * @name doubleTapTimeLimit
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 300
     * @description これよりタップ間隔が開いたらダブルタップと見なさない基準値(ms)
     */
    /**
     * @name horizontalSwipeDegree
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 50
     * @description これより角度が大きいと水平スワイプではなく垂直スワイプと見なす基準値(deg)
     */
    /**
     * @name longPressTimeLimit
     * @type number
     * @memberOf BrowserEventTranslator#
     * @default 1000
     * @description これより長時間pointerが接地していればlongpressだとみなす基準値(ms)
     */
    /**
     * @name preventDefault
     * @type boolean
     * @memberOf BrowserEventTranslator#
     * @default true
     */
    /**
     * @name stopPropagation
     * @type boolean
     * @memberOf BrowserEventTranslator#
     * @default false
     */
    /**
     * @name trace
     * @type boolean
     * @memberOf BrowserEventTranslator#
     * @default false
     * @description trueならlog出力する
     */
    /**
     * @name tracePrefix
     * @type string=
     * @memberOf BrowserEventTranslator#
     * @description log出力の際に付加するprefix
     */
    /**
     *
     * @param {Element} el
     * @param {BrowserEventTranslator~options} options
     * @constructor BrowserEventTranslator
     * @description <pre>Pointer/Mouse/Touchの各eventについて以下フローで追跡し、ジェスチャ判定を行う。
     * pointerdown/mousedown/touchstart event
     * ↓
     * setUpPointerTracking(ev)
     * ↓
     * repeat pointermove/mousemove/touchmove event → trackPointer(ev)
     * ↓
     * pointerup/mouseup/touchend event
     * ↓
     * stopPointerTracking(ev)
     * ↓
     * finishPointerTracking(ev)
     * </pre>
     * @see BrowserEventTranslator_Base
     */
    const BrowserEventTranslator = (() => {
      // MobileSafariはMouseEventもサポートしているので他環境と同じ優先順位で振り分けると決して発火しないMouseEvent版になり操作できない
      if (isIOS()) {
        if (supports.TouchEvent) {
          return Touch;
        } else {
          console.error('MobileSafari(iOS)でTouchEvent非サポートはおかしい');
          throw new Error('MobileSafari(iOS)でTouchEvent非サポートはおかしい');
        }
      }
      if (supports.PointerEvent) {
        return Pointer;
      }
      // AndroidChrome上ではTouchEventの後でMouseEventも発火してしまうのでTouchAndMouseを返すと問題がある
      // (PointerEvent未対応のChrome54以前)
      if (isAndroid()) {
        return Touch;
      }
      // タッチパネル+マウスを搭載したマシンとWin8+でのGoogle Chrome等MouseEvent/TouchEvent両サポート環境
      // (PointerEvent未対応のChrome54以前)
      if (supports.MouseEvent && supports.TouchEvent) {
        return TouchAndMouse;
      }
      if (supports.MouseEvent) {
        return Mouse;
      }
      if (supports.TouchEvent) {
        return Touch;
      }
    })();
    BrowserEventTranslator.Point = Point;
    BrowserEventTranslator.EventType = EventType;
    return BrowserEventTranslator;
  }();
  return BrowserEventTranslator;
});