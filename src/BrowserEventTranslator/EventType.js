define('BrowserEventTranslator/EventType',function () {
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
});