define('BrowserEventTranslator/Base',
['underscore', 'BeautifulProperties','BrowserEventTranslator/EventType'],
function () {
  const [_, EventType] = [require('underscore'),require('BrowserEventTranslator/EventType')];
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
  function Base(el, options){
    this.el = el;
    options = _.defaults(options || {}, {
      swipeDistance: 30, // px
      swipeTimeLimit: 300, //ms
      dontSlideDistance: 20, // px
      doubleTapTimeLimit: 300, // ms
      horizontalSwipeDegree: 50, // deg
      longPressTimeLimit: 1000,
      preventDefault: true,
      stopPropagation: false,
      trace: false,
      tracePrefix: undefined
    });
    this.options = options;
    _.map(options,function (value, name) {
      BeautifulProperties.Hookable.define(this, name, {value: value});
      BeautifulProperties.Observable.define(this, name);
    },
    this);
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
  BeautifulProperties.LazyInitializable.define(proto,'_DOMEventType2handlers',{
    enumerable:false,
    init:function(){
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
  proto._addDOMEvent = function _addDOMEvent(type,handler) {
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
    this.el.addEventListener(type,wrappedHandler,false);
  };
  /**
   * @function _addEventTrace
   * @memberOf BrowserEventTranslator_Base#
   * @param {Array.<string>} types
   * @param {BrowserEventTranslator_Base~DOMEventHandler} traceHandler log出力用handler
   * @private
   * @description typesで指定されたtypeのeventが発火したらlogを出力するようにする
   */
  proto._addEventTrace = function _addEventTrace(types,traceHandler){
    var addDOMEvent = this._addDOMEvent.bind(this);
    types.forEach(function (type) {
      addDOMEvent(type,traceHandler);
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
    Object.keys(dict).forEach(function(type){
      var handlers = dict[type];
      handlers.forEach(function(handler){
        el.removeEventListener(type,handler,false);
      });
      handlers.length = 0;
    });
    this.off();
  };
  function degree (rad) { return rad / Math.PI * 180; }

  /**
   * @function isHorizontalSwipe
   * @memberOf BrowserEventTranslator_Base#
   * @param distance
   * @returns {boolean} 左右swipeだと判定されればtrue
   * @see BrowserEventTranslator#swipeDistance
   * @see BrowserEventTranslator#horizontalSwipeDegree
   */
  proto.isHorizontalSwipe = function (distance) {
    var
    diagonal = Math.sqrt(Math.pow(distance.vertical, 2) +
    Math.pow(distance.horizontal, 2)),
    deg = degree(Math.asin(distance.vertical / diagonal));
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
    var
    diagonal = Math.sqrt(Math.pow(distance.vertical, 2) +
    Math.pow(distance.horizontal, 2)),
    deg = degree(Math.asin(distance.vertical / diagonal));
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
    var
    distance = this.dontSlideDistance,
    min_x = origin.x - distance / 2,
    max_x = min_x + distance,
    min_y = origin.y - distance / 2,
    max_y = min_y + distance;
    return _.all(tracking || [],
    function (point) {
      return min_x <= point.x && point.x <= max_x
      && min_y <= point.y && point.y <= max_y;
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
  proto.tapOrDoubleTapIssuer = function tapOrDoubleTapIssuer(ev,point) {
    if (this.tapped) {
      clearTimeout(this.tapped);
      delete this.tapped;
      if (this.trace) {
        console.log(this.tracePrefix + 'recognize as doubleTap',ev,point);
      }
      this.trigger(EventType.doubleTap,ev,point);
    } else {
      this.tapped = setTimeout(tapIssuer.bind(this,ev,point),this.doubleTapTimeLimit);
    }
  };
  function tapIssuer(ev,point) {
    if (this.trace) {
      console.log(this.tracePrefix + 'recognize as tap',ev,point);
    }
    this.trigger(EventType.tap,ev,point);
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
      console.log(this.tracePrefix + 'finishPointerTracking',ev);
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
      this.tapOrDoubleTapIssuer(ev,current);
    } else if (current.at - start.at < this.swipeTimeLimit) {
      // スワイプかも(時間的にはスワイプと判断できる範囲)
      var
      direction = {
        vertical: (current.y > start.y) ? 'DOWN' : 'UP',
        horizontal: (current.x > start.x) ? 'RIGHT' : 'LEFT'
      },
      // いちいち全ての領域について網羅するのもあれなので正正の領域にもってくる
      distance = {
        vertical: Math.abs(current.y - start.y),
        horizontal: Math.abs(current.x - start.x)
      },
      eventName;

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
});