/**
 * 公車資訊
 */
export class BusObj {
  zh_tw = ""; // 路線名稱 中文
  en = ""; // 路線名稱 英文
  departureStopNameZh = ""; // 起站中文名稱
  destinationStopNameZh = ""; // 終點站中文名稱
  isLove = false; // 是否加入常用

  constructor(zh_tw, en, departureStopNameZh, destinationStopNameZh) {
    this.zh_tw = zh_tw;
    this.en = en;
    this.departureStopNameZh = departureStopNameZh;
    this.destinationStopNameZh = destinationStopNameZh;
    // this.isLove = isLove;
  }
}
