define('BrowserEventTranslator/PointInfo',function () {
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
  function PointInfo(point){
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
});