define('BrowserEventTranslator',
[
  'BrowserEventTranslator/Pointer','BrowserEventTranslator/Point',
  'BrowserEventTranslator/EventType'
],
function () {
  const [Pointer, Point, EventType] = [require('BrowserEventTranslator/Pointer'),
    require('BrowserEventTranslator/Point'),
    require('BrowserEventTranslator/EventType')];
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
  const BrowserEventTranslator = Pointer;
  BrowserEventTranslator.Point = Point;
  BrowserEventTranslator.EventType = EventType;
  return BrowserEventTranslator;
});