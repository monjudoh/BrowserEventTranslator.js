define('BrowserEventTranslator',
[
  'BrowserEventTranslator/Pointer','BrowserEventTranslator/Touch','BrowserEventTranslator/Mouse','BrowserEventTranslator/Point','BrowserEventTranslator/TouchAndMouse',
  'BrowserEventTranslator/EventType',
  'BrowserEventTranslator/env/supports',
  'BrowserEventTranslator/env/ua/isIOS','BrowserEventTranslator/env/ua/isIE','BrowserEventTranslator/env/ua/isWindows7','BrowserEventTranslator/env/ua/isAndroid'
],
function (Pointer,Touch,Mouse,Point,TouchAndMouse,
          EventType,
          supports,
          isIOS,isIE,isWindows7,isAndroid) {
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
  var BrowserEventTranslator = (function () {
    // MobileSafariはMouseEventもサポートしているので他環境と同じ優先順位で振り分けると決して発火しないMouseEvent版になり操作できない
    if (isIOS()) {
      if (supports.TouchEvent) {
        return Touch;
      } else {
        console.error('MobileSafari(iOS)でTouchEvent非サポートはおかしい');
        throw new Error('MobileSafari(iOS)でTouchEvent非サポートはおかしい');
      }
    }
    // AndroidChrome上ではTouchEventの後でMouseEventも発火してしまうのでTouchAndMouseを返すと問題がある
    if (isAndroid()) {
      return Touch;
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
  })();
  BrowserEventTranslator.Point = Point;
  BrowserEventTranslator.EventType = EventType;
  return BrowserEventTranslator;
});