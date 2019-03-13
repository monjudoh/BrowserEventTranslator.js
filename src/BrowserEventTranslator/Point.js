define('BrowserEventTranslator/Point',
[],
function(){
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
    };
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
    };
    /**
     * @function distance
     * @memberOf BrowserEventTranslator.Point#
     * @param {BrowserEventTranslator.Point} otherPoint
     * @returns {number}
     * @description 2点間の距離を取得する
     */
    distance(otherPoint){
      return Math.sqrt(Math.pow(this.x - otherPoint.x,2)+Math.pow(this.y - otherPoint.y,2));
    };
    /**
     * @function toDict
     * @memberOf BrowserEventTranslator.Point#
     * @returns {{x:number,y:number}}
     * @description 同じ座標情報を持った辞書を返す
     */
    toDict(){
      const dict = Object.create(null);
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
    clone(){
      const point = new Point();
      point.x = this.x;
      point.y = this.y;
      return point;
    };
  }
  return Point;
});