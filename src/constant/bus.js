/**
 * 公車資訊
 */
export class BusObj {
  routeUID = ""; // 路線唯一識別代碼
  zh_tw = ""; // 路線名稱 中文
  en = ""; // 路線名稱 英文
  departureStopNameZh = ""; // 起站中文名稱
  destinationStopNameZh = ""; // 終點站中文名稱
  isLove = false; // 是否加入常用

  constructor(routeUID, zh_tw, en, departureStopNameZh, destinationStopNameZh) {
    this.routeUID = routeUID;
    this.zh_tw = zh_tw;
    this.en = en;
    this.departureStopNameZh = departureStopNameZh;
    this.destinationStopNameZh = destinationStopNameZh;
    // this.isLove = isLove;
  }
}
