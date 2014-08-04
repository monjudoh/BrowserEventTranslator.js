/**
 * @module BrowserEventTranslator
 * @version 0.02
 * @author jbking,monjudoh
 * @copyright (c) 2014 jbking,monjudoh<br/>
 * Dual licensed under the MIT (MIT-LICENSE.txt)<br/>
 * and GPL (GPL-LICENSE.txt) licenses.
 * @see https://github.com/monjudoh/BrowserEventTranslator.js
 * @see BrowserEventTranslator
 */
define('BrowserEventTranslator', [
  'underscore',
  'BeautifulProperties'
], function (underscore, BeautifulProperties) {
  var BrowserEventTranslator_EventType = function () {
      /**
       * @name EventType
       * @namespace
       * @memberOf BrowserEventTranslator
       */
      var EventType = {
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
  var BrowserEventTranslator_Base = function (_, BeautifulProperties, EventType) {
      /**
       * @callback BrowserEventTranslator_Base~DOMEventHandler
       * @this BrowserEventTranslator
       * @param {UIEvent} ev
       * @private
       * @description <pre>BrowserEventTranslatorにbindされたDOMEventのhandler</pre>
       */
      /**
       *
       * @param {Element} el
       * @param {BrowserEventTranslator~Options} options
       * @constructor BrowserEventTranslator_Base
       * @private
       */
      function Base(el, options) {
        this.el = el;
        options = _.defaults(options || {}, {
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
        });
        this.options = options;
        _.map(options, function (value, name) {
          BeautifulProperties.Hookable.define(this, name, { value: value });
          BeautifulProperties.Observable.define(this, name);
        }, this);
        if ((options || {}).preventDefaultCallback) {
          this.preventDefaultCallback = options.preventDefaultCallback;
        }
        if ((options || {}).stopPropagationCallback) {
          this.stopPropagationCallback = options.stopPropagationCallback;
        }
        if (this.tracePrefix) {
          this.tracePrefix += ': ';
        } else {
          this.tracePrefix = '';
        }
      }
      var proto = Base.prototype;
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
      /**
       * @function _addDOMEvent
       * @memberOf BrowserEventTranslator_Base#
       * @param {string} type event type
       * @param {BrowserEventTranslator_Base~DOMEventHandler} handler
       * @see BrowserEventTranslator#el
       * @private
       * @description DOMEventのhandlerをラップして、BrowserEventTranslatorにbindされ、ガード込みのhandlerにした上でDOM要素(el)に登録する。
       */
      proto._addDOMEvent = function _addDOMEvent(type, handler) {
        var self = this;
        function wrappedHandler(ev) {
          if (self._preHandleEventGuard(ev)) {
            return;
          }
          handler.call(self, ev);
        }
        var dict = this._DOMEventType2handlers;
        if (!dict[type]) {
          dict[type] = [];
        }
        dict[type].push(wrappedHandler);
        this.el.addEventListener(type, wrappedHandler, false);
      };
      /**
       * @function _addEventTrace
       * @memberOf BrowserEventTranslator_Base#
       * @param {Array.<string>} types
       * @param {BrowserEventTranslator_Base~DOMEventHandler} traceHandler log出力用handler
       * @private
       * @description typesで指定されたtypeのeventが発火したらlogを出力するようにする
       */
      proto._addEventTrace = function _addEventTrace(types, traceHandler) {
        var addDOMEvent = this._addDOMEvent.bind(this);
        types.forEach(function (type) {
          addDOMEvent(type, traceHandler);
        });
      };
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Base#
       * @private
       * @abstract
       * @description その環境に存在する全てのevent typeについてeventが発火したらlogを出力するようにする
       */
      proto._addAllEventTrace = function _addAllEventTrace() {
      };
      /**
       * @function _preHandleEventGuard
       * @memberOf BrowserEventTranslator_Base#
       * @param {UIEvent} ev
       * @returns {boolean} prevented
       * @description 各eventに設定されたhandlerが呼ばれる前のガード。trueを返した場合はhandlerを呼ばない。
       * @private
       */
      proto._preHandleEventGuard = function _preHandleEventGuard(ev) {
        if (this.preventDefaultCallback(ev)) {
          ev.preventDefault();
        }
        if (this.stopPropagationCallback(ev)) {
          ev.stopPropagation();
        }
        return this.preventTranslateCallback(ev);
      };
      /**
       * @name preventTranslateCallback
       * @memberOf BrowserEventTranslator_Base#
       * @type function
       * @description trueを返せばeventHandlerが呼ばれなくなるcallback
       */
      proto.preventTranslateCallback = function (ev) {
        return false;
      };
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
      proto.preventDefaultCallback = function (ev) {
        /* overridable */
        return this.preventDefault;
      };
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
      proto.stopPropagationCallback = function (ev) {
        /* overridable */
        return this.stopPropagation;
      };
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
      proto.destroy = function () {
        if (this.trace) {
          console.log(this.tracePrefix + 'destroy');
        }
        var dict = this._DOMEventType2handlers;
        var el = this.el;
        Object.keys(dict).forEach(function (type) {
          var handlers = dict[type];
          handlers.forEach(function (handler) {
            el.removeEventListener(type, handler, false);
          });
          handlers.length = 0;
        });
        this.off();
      };
      function degree(rad) {
        return rad / Math.PI * 180;
      }
      /**
       * @function isHorizontalSwipe
       * @memberOf BrowserEventTranslator_Base#
       * @param distance
       * @returns {boolean} 左右swipeだと判定されればtrue
       * @see BrowserEventTranslator#swipeDistance
       * @see BrowserEventTranslator#horizontalSwipeDegree
       */
      proto.isHorizontalSwipe = function (distance) {
        var diagonal = Math.sqrt(Math.pow(distance.vertical, 2) + Math.pow(distance.horizontal, 2)), deg = degree(Math.asin(distance.vertical / diagonal));
        return diagonal >= this.swipeDistance && deg <= this.horizontalSwipeDegree;
      };
      /**
       * @function isVerticalSwipe
       * @memberOf BrowserEventTranslator_Base#
       * @param distance
       * @returns {boolean} 上下swipeだと判定されればtrue
       * @see BrowserEventTranslator#swipeDistance
       * @see BrowserEventTranslator#horizontalSwipeDegree
       */
      proto.isVerticalSwipe = function (distance) {
        var diagonal = Math.sqrt(Math.pow(distance.vertical, 2) + Math.pow(distance.horizontal, 2)), deg = degree(Math.asin(distance.vertical / diagonal));
        // 角度判定のみ異なる
        return diagonal >= this.swipeDistance && deg > this.horizontalSwipeDegree;
      };
      /**
       * @function isNotSlided
       * @memberOf BrowserEventTranslator_Base#
       * @param {BrowserEventTranslator.Point} origin
       * @param {Array.<BrowserEventTranslator.Point>} tracking
       * @returns {boolean} pointerがスライドしていないと判定されればtrue
       * @see BrowserEventTranslator#dontSlideDistance
       */
      proto.isNotSlided = function (origin, tracking) {
        var distance = this.dontSlideDistance, min_x = origin.x - distance / 2, max_x = min_x + distance, min_y = origin.y - distance / 2, max_y = min_y + distance;
        return _.all(tracking || [], function (point) {
          return min_x <= point.x && point.x <= max_x && min_y <= point.y && point.y <= max_y;
        });
      };
      /**
       * @function tapOrDoubleTapIssuer
       * @memberOf BrowserEventTranslator_Base#
       * @param {UIEvent} ev
       * @param {BrowserEventTranslator.Point} point
       * @description <pre>tap/doubletapのハンドリングを行う。
       * 1度目のタップの後doubleTapTimeLimit ms以内に2度目のタップがあればダブルタップとして扱い、なければシングルタップとして扱う。
       * </pre>
       */
      proto.tapOrDoubleTapIssuer = function tapOrDoubleTapIssuer(ev, point) {
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
      };
      function tapIssuer(ev, point) {
        if (this.trace) {
          console.log(this.tracePrefix + 'recognize as tap', ev, point);
        }
        this.trigger(EventType.tap, ev, point);
        delete this.tapped;
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
      proto.finishPointerTracking = function (ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'finishPointerTracking', ev);
        }
        /**
         * @type {BrowserEventTranslator_PointInfo}
         */
        var pointInfo = this.stopPointerTracking(ev);
        // トラッキングされていなかったら中断
        if (!pointInfo) {
          return;
        }
        var tracking = pointInfo.tracking;
        var start = pointInfo.start;
        var current = pointInfo.current;
        // 追跡終了後のアクティブな接地点
        var points = this.pointsFromEvent(ev);
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
          var direction = {
              vertical: current.y > start.y ? 'DOWN' : 'UP',
              horizontal: current.x > start.x ? 'RIGHT' : 'LEFT'
            },
            // いちいち全ての領域について網羅するのもあれなので正正の領域にもってくる
            distance = {
              vertical: Math.abs(current.y - start.y),
              horizontal: Math.abs(current.x - start.x)
            }, eventName;
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
      };
      function capitalFirstLetter(s) {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
      }
      return Base;
    }(underscore, BeautifulProperties, BrowserEventTranslator_EventType);
  var BrowserEventTranslator_PointInfo = function () {
      /**
       * @constructor BrowserEventTranslator_PointInfo
       *
       * @param {BrowserEventTranslator_Point} point
       *
       * @property {Array.<BrowserEventTranslator_PointInfo.Point>} tracking トラッキング中のPointの履歴
       * @property {BrowserEventTranslator_PointInfo.Point} start トラッキング開始時点でのPoint
       * @property {BrowserEventTranslator_PointInfo.Point} current 最新のPoint
       * @property {number} at 作成時間
       * @private
       */
      function PointInfo(point) {
        this.tracking = [];
        this.update(point);
        this.start = this.current;
        this.at = Date.now();
      }
      var proto = PointInfo.prototype;
      proto.update = function update(point) {
        point.at = Date.now();
        this.current = point;
        this.tracking.push(point);
      };
      /**
       * @constructor BrowserEventTranslator_PointInfo.Point
       * @extends BrowserEventTranslator.Point
       * @property {number} at 時間
       * @description 実際にはコンストラクタは存在しないがPointInfoは受け取ったPointを拡張して使うのでその型
       * @private
       */
      return PointInfo;
    }();
  var BrowserEventTranslator_Point = function () {
      /**
       *
       * @constructor Point
       * @memberOf BrowserEventTranslator
       * @property {number} x
       * @property {number} y
       * @description 2次元座標
       */
      function Point() {
      }
      /**
       * @function fromEvent
       * @memberOf BrowserEventTranslator.Point
       * @param {UIEvent} ev
       * @returns {BrowserEventTranslator.Point}
       * @description PointerEventないしMouseEventからPoint objectに変換する
       */
      Point.fromEvent = function fromEvent(ev) {
        var point = new Point();
        point.x = ev.clientX;
        point.y = ev.clientY;
        return point;
      };
      /**
       * @function fromTouch
       * @memberOf BrowserEventTranslator.Point
       * @param {Touch} touch
       * @returns {BrowserEventTranslator.Point}
       * @description TouchEvent#touchesに格納されているTouchからPoint objectに変換する
       */
      Point.fromTouch = function fromTouch(touch) {
        var point = new Point();
        point.x = touch.clientX;
        point.y = touch.clientY;
        return point;
      };
      /**
       * @function fromDict
       * @memberOf BrowserEventTranslator.Point
       * @param {{x:number,y:number}} dict
       * @returns {BrowserEventTranslator.Point}
       * @description x,yの辞書からPoint objectに変換する
       */
      Point.fromDict = function fromDict(dict) {
        var point = new Point();
        point.x = dict.x;
        point.y = dict.y;
        return point;
      };
      var proto = Point.prototype;
      /**
       * @function distance
       * @memberOf BrowserEventTranslator.Point#
       * @param {BrowserEventTranslator.Point} otherPoint
       * @returns {number}
       * @description 2点間の距離を取得する
       */
      proto.distance = function distance(otherPoint) {
        return Math.sqrt(Math.pow(this.x - otherPoint.x, 2) + Math.pow(this.y - otherPoint.y, 2));
      };
      /**
       * @function toDict
       * @memberOf BrowserEventTranslator.Point#
       * @returns {{x:number,y:number}}
       * @description 同じ座標情報を持った辞書を返す
       */
      proto.toDict = function toDict() {
        var dict = Object.create(null);
        dict.x = this.x;
        dict.y = this.y;
        return dict;
      };
      /**
       * @function clone
       * @memberOf BrowserEventTranslator.Point#
       * @returns {BrowserEventTranslator.Point}
       * @description 自身の複製を返す
       */
      proto.clone = function clone() {
        var point = new Point();
        point.x = this.x;
        point.y = this.y;
        return point;
      };
      return Point;
    }();
  var BrowserEventTranslator_env_supports = function () {
      var supports = Object.create(null);
      (function () {
        supports.PointerEvent = !!navigator.pointerEnabled;
        // prefixed
        supports.MSPointerEvent = !!navigator.msPointerEnabled;
        supports.TouchEvent = 'ontouchstart' in document.documentElement;
        supports.MouseEvent = 'onmousedown' in document.documentElement;
      }());
      return supports;
    }();
  var BrowserEventTranslator_Pointer = function (Base, PointInfo, Point, EventType, supports, _) {
      var proto = Object.create(Base.prototype);
      proto.constructor = BrowserEventTranslator;
      BrowserEventTranslator.prototype = proto;
      var symbols;
      var events = 'pointerdown pointerup pointercancel pointermove pointerover pointerout pointerenter pointerleave gotpointercapture lostpointercapture'.split(' ');
      (function () {
        symbols = Object.create(null);
        var properties = 'setPointerCapture releasePointerCapture touchAction'.split(' ');
        if (supports.PointerEvent) {
          _([
            events,
            properties
          ]).flatten().forEach(function (key) {
            symbols[key] = key;
          });
        } else if (supports.MSPointerEvent) {
          events.forEach(function (key) {
            symbols[key] = key.replace(/pointer(.)/, function ($0, $1) {
              return 'Pointer' + $1.toUpperCase();
            }).replace(/^./, function ($0) {
              return 'MS' + $0.toUpperCase();
            });
          });
          properties.forEach(function (key) {
            symbols[key] = key.replace(/pointer(.)/, function ($0, $1) {
              return 'Pointer' + $1.toUpperCase();
            }).replace(/^./, function ($0) {
              return 'ms' + $0.toUpperCase();
            });
          });
        }
      }());
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
       * @param {BrowserEventTranslator~Options} options
       * @property {object} eventDict key:pointerId,value:PointerEventの辞書。現在このBrowserEventTranslatorでトラッキングされている最中のもの。
       * @private
       */
      function BrowserEventTranslator(el, options) {
        Base.call(this, el, options);
        this.pointInfoDict = Object.create(null);
        this.eventDict = Object.create(null);
        this.el.style[symbols['touchAction']] = 'none';
        var addDOMEvent = this._addDOMEvent.bind(this);
        _(eventHandlers).each(function (handler, type) {
          addDOMEvent(symbols[type], handler);
        });
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Pointer#
       * @override
       * @private
       * @see BrowserEventTranslator_Base#_addAllEventTrace
       */
      proto._addAllEventTrace = function _addAllEventTrace() {
        if (this.options.trace) {
          this._addEventTrace(events.map(function (type) {
            return symbols[type];
          }), function (ev) {
            console.log(this.tracePrefix + ev.type, ev.pointerId, this.pointsFromEvent(ev).length, ev);
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
        var sortedPointerIds = Object.keys(pointInfoDict).map(function (pointerId) {
            var pointInfo = pointInfoDict[pointerId];
            return {
              at: pointInfo.at,
              id: pointerId
            };
          }).sort(function (a, b) {
            return b - a;
          }).map(function (dict) {
            return dict.id;
          });
        var evs = _.compact(sortedPointerIds.map(function (id) {
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
      proto.stopPointerTracking = function stopPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking', ev.pointerId);
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
          console.log(this.tracePrefix + 'setUpPointerTracking', ev.pointerId);
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
          console.log(this.tracePrefix + 'trackPointer', ev.pointerId);
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
    }(BrowserEventTranslator_Base, BrowserEventTranslator_PointInfo, BrowserEventTranslator_Point, BrowserEventTranslator_EventType, BrowserEventTranslator_env_supports, underscore);
  var BrowserEventTranslator_Touch = function (Base, PointInfo, Point, EventType, _) {
      var proto = Object.create(Base.prototype);
      proto.constructor = BrowserEventTranslator;
      BrowserEventTranslator.prototype = proto;
      var Array_from = function () {
          return function (arrayLike) {
            var slice = Array.prototype.slice;
            return slice.call(arrayLike);
          };
        }();
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
        Base.call(this, el, options);
        this.pointInfoDict = Object.create(null);
        this._addAllEventTrace();
        var addDOMEvent = this._addDOMEvent.bind(this);
        _(eventHandlers).each(function (handler, type) {
          addDOMEvent(type, handler);
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
          this._addEventTrace(events, function (ev) {
            var identifiers = Array_from(ev.touches).map(function (touch) {
                return touch.identifier;
              });
            console.log(this.tracePrefix + ev.type, identifiers, ev);
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
        return Array_from(ev.touches).map(Point.fromTouch);
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
      proto.stopPointerTracking = function stopPointerTracking(ev) {
        if (this.trace) {
          console.log(this.tracePrefix + 'stopPointerTracking', ev);
        }
        var pointInfoDict = this.pointInfoDict;
        var identifiers4remove = _.difference(Object.keys(pointInfoDict), Array_from(ev.touches).map(function (touch) {
            return touch.identifier;
          }));
        var removed = identifiers4remove.map(function (identifier) {
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
          console.log(this.tracePrefix + 'setUpPointerTracking', ev);
        }
        var pointInfoDict = this.pointInfoDict;
        var touches = Array_from(ev.touches);
        var identifier2touch = Object.create(null);
        touches.forEach(function (touch) {
          identifier2touch[touch.identifier] = touch;
        });
        var identifiers4add = _.difference(touches.map(function (touch) {
            return touch.identifier;
          }), Object.keys(pointInfoDict));
        var added = identifiers4add.map(function (identifier) {
            var touch = identifier2touch[identifier];
            pointInfoDict[identifier] = new PointInfo(Point.fromTouch(touch));
            return pointInfoDict[identifier];
          });
        // 長押し計測のスタート
        this.longPress = setTimeout(longPressIssuer.bind(this, added[0]), this.longPressTimeLimit);
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
          console.log(this.tracePrefix + 'trackPointer', ev);
        }
        var pointInfoDict = this.pointInfoDict;
        // 接地点の移動と接地点の追加が同時に起こった場合、例えば指を動かしながらもう一本の指で触れる等した場合、
        // touchstartとtouchesの個数が増えた状態でのtouchmoveのどちらが先に起こるか分からない
        Array_from(ev.touches).forEach(function (touch) {
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
        if (_(_.values(this.pointInfoDict)).contains(pointInfo) && this.isNotSlided(pointInfo.start, pointInfo.tracking)) {
          if (this.trace) {
            console.log(this.tracePrefix + 'recognize as longPress');
          }
          this.trigger(EventType.longPress, pointInfo.current);
        }
      }
      return BrowserEventTranslator;
    }(BrowserEventTranslator_Base, BrowserEventTranslator_PointInfo, BrowserEventTranslator_Point, BrowserEventTranslator_EventType, underscore);
  var BrowserEventTranslator_Mouse = function (Base, PointInfo, Point, EventType, _) {
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
       * @param {BrowserEventTranslator~Options} options
       * @property {BrowserEventTranslator_PointInfo} pointInfo
       * @private
       */
      function BrowserEventTranslator(el, options) {
        Base.call(this, el, options);
        this._addAllEventTrace();
        var addDOMEvent = this._addDOMEvent.bind(this);
        _(eventHandlers).each(function (handler, type) {
          addDOMEvent(type, handler);
        });
      }
      /**
       * @function _addAllEventTrace
       * @memberOf BrowserEventTranslator_Mouse#
       * @override
       * @private
       * @see BrowserEventTranslator_Base#_addAllEventTrace
       */
      proto._addAllEventTrace = function _addAllEventTrace() {
        if (this.options.trace) {
          this._addEventTrace(events, function (ev) {
            console.log(this.tracePrefix + ev.type, ev);
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
      proto.stopPointerTracking = function stopPointerTracking(ev) {
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
    }(BrowserEventTranslator_Base, BrowserEventTranslator_PointInfo, BrowserEventTranslator_Point, BrowserEventTranslator_EventType, underscore);
  var BrowserEventTranslator_TouchAndMouse = function (Base, Touch, Mouse, _) {
      var proto = Object.create(Base.prototype);
      proto.constructor = BrowserEventTranslator;
      BrowserEventTranslator.prototype = proto;
      var touchProto = Touch.prototype;
      var mouseProto = Mouse.prototype;
      var eventHandlers = Object.create(null);
      _(Touch.eventHandlers).each(function (val, key) {
        eventHandlers[key] = val;
      });
      _(Mouse.eventHandlers).each(function (val, key) {
        eventHandlers[key] = val;
      });
      /**
       * @constructor BrowserEventTranslator_TouchAndMouse
       * @extends BrowserEventTranslator_Base
       * @see BrowserEventTranslator_Touch
       * @see BrowserEventTranslator_Mouse
       *
       * @param {Element} el
       * @param {BrowserEventTranslator~Options} options
       * @private
       */
      function BrowserEventTranslator(el, options) {
        Base.call(this, el, options);
        this.pointInfoDict = Object.create(null);
        touchProto._addAllEventTrace.call(this);
        mouseProto._addAllEventTrace.call(this);
        var addDOMEvent = this._addDOMEvent.bind(this);
        _(eventHandlers).each(function (handler, type) {
          addDOMEvent(type, handler);
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
        } else if (ev instanceof MouseEvent) {
          return mouseProto.pointsFromEvent.call(this, ev);
        }
      };
      proto.stopPointerTracking = function stopPointerTracking(ev) {
        if (ev instanceof TouchEvent) {
          return touchProto.stopPointerTracking.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          return mouseProto.stopPointerTracking.call(this, ev);
        }
      };
      proto.setUpPointerTracking = function setUpPointerTracking(ev) {
        if (ev instanceof TouchEvent) {
          touchProto.setUpPointerTracking.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          mouseProto.setUpPointerTracking.call(this, ev);
        }
      };
      proto.trackPointer = function trackPointer(ev) {
        if (ev instanceof TouchEvent) {
          touchProto.trackPointer.call(this, ev);
        } else if (ev instanceof MouseEvent) {
          mouseProto.trackPointer.call(this, ev);
        }
      };
      return BrowserEventTranslator;
    }(BrowserEventTranslator_Base, BrowserEventTranslator_Touch, BrowserEventTranslator_Mouse, underscore);
  var BrowserEventTranslator_env_ua_isIOS = function isIOS() {
    var ua = navigator.userAgent;
    return ua.indexOf('like Mac OS X') >= 0;
  };
  var BrowserEventTranslator_env_ua_isIE = function isIE() {
    var ua = navigator.userAgent;
    return ua.indexOf('compatible; MSIE') >= 0 || ua.indexOf('Trident/') >= 0;
  };
  var BrowserEventTranslator_env_ua_isWindows7 = function isWindows7() {
    var ua = navigator.userAgent;
    var windowsPattern = /Windows ([ .a-zA-Z0-9]+)[;\\)]/;
    var windowsNtPattern = /NT (\d\.\d)/;
    // WindowsNT系でない場合は関係ない
    var match = windowsPattern.exec(ua);
    if (!match) {
      return false;
    }
    // NT系でない場合は関係ない
    var version = windowsNtPattern.exec(match[1]);
    if (!version) {
      return false;
    }
    // XP:5.1 Vista:6.0 7:6.1 8:6.2 8.1:6.3
    return parseFloat(version[1]) === 6.1;
  };
  var BrowserEventTranslator = function (Pointer, Touch, Mouse, Point, TouchAndMouse, EventType, supports, isIOS, isIE, isWindows7) {
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
      var BrowserEventTranslator = function () {
          // MobileSafariはMouseEventもサポートしているので他環境と同じ優先順位で振り分けると決して発火しないMouseEvent版になり操作できない
          if (isIOS()) {
            if (supports.TouchEvent) {
              return Touch;
            } else {
              console.error('MobileSafari(iOS)\u3067TouchEvent\u975E\u30B5\u30DD\u30FC\u30C8\u306F\u304A\u304B\u3057\u3044');
              throw new Error('MobileSafari(iOS)\u3067TouchEvent\u975E\u30B5\u30DD\u30FC\u30C8\u306F\u304A\u304B\u3057\u3044');
            }
          }
          // Win7のIE10/11でもPointerEventが使えるのだがinput type='range'の親要素でsetPointerCapture()するとつまみを動かせなくなるため、
          // Win7のIE10/11ではPointerEventは使わないでおく
          if (isIE() && isWindows7()) {
            return Mouse;
          }
          if (supports.PointerEvent || supports.MSPointerEvent) {
            return Pointer;
          }
          // タッチパネル+マウスを搭載したマシンとWin8+でのGoogle Chrome等MouseEvent/TouchEvent両サポート環境
          if (supports.MouseEvent && supports.TouchEvent) {
            return TouchAndMouse;
          }
          if (supports.MouseEvent) {
            return Mouse;
          }
          if (supports.TouchEvent) {
            return Touch;
          }
        }();
      BrowserEventTranslator.Point = Point;
      BrowserEventTranslator.EventType = EventType;
      return BrowserEventTranslator;
    }(BrowserEventTranslator_Pointer, BrowserEventTranslator_Touch, BrowserEventTranslator_Mouse, BrowserEventTranslator_Point, BrowserEventTranslator_TouchAndMouse, BrowserEventTranslator_EventType, BrowserEventTranslator_env_supports, BrowserEventTranslator_env_ua_isIOS, BrowserEventTranslator_env_ua_isIE, BrowserEventTranslator_env_ua_isWindows7);
  return BrowserEventTranslator;
});