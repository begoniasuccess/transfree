import axios from "axios";
import { BUS_URL_V2, sendRequest } from "../utils/https";
/**
 * Get user's current location information.
 * @returns {Promise<unknown>} Response body contains country, city, lat, lon etc.
 */
export const getCurrentLocationInfo = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://ip-api.com/json')
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2)) return 0;    
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    //distance unit: km
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
    
}

export const isInRange = (lat1, lon1, lat2, lon2, limitDist) => {
    let dist = distance(lat1, lon1, lat2, lon2);
    return (dist <= limitDist);
    
}

export const cityList = [
    "NewTaipei",
    "Taoyuan",
    "Taichung",
    "Tainan",
    "Kaohsiung",
    "Keelung",
    "Hsinchu",
    "HsinchuCounty",
    "MiaoliCounty",
    "ChanghuaCounty",
    "NantouCounty",
    "YunlinCounty",
    "ChiayiCounty",
    "Chiayi",
    "PingtungCounty",
    "YilanCounty",
    "HualienCounty",
    "TaitungCounty",
    "KinmenCounty",
    "PenghuCounty",
    "LienchiangCounty",
    "Taipei"
];

const callStopPerTimes = 200;

export const allStopListRaw = [];

export const getStopList = (city) => {
    if (cityList.indexOf(city) < 0) return false;
    sendRequest(
        "get",
        `${BUS_URL_V2}/Stop/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}&$top=${callStopPerTimes}&$skip=${skip}`
        )
        .then((res) => {
        //   // console.log({ getStopList: res });
        //   //為 stops 加上 與使用者當前的距離(km)
        //   res.data.forEach((aStop, index)=>{
        //     let stopLat = aStop.StopPosition.PositionLat;
        //     let stopLon = aStop.StopPosition.PositionLon;
        //     let distFromCenter = distance(self.center[0], self.center[1], stopLat, stopLon);
        //     res.data[index].distance = distFromCenter;
        //   });

            //將stops寫入rawStopList
            self.rawStopList = self.rawStopList.concat(res.data);

            self.setStopList();

            //未搜尋完的站牌，分批呼叫
            //注意：實作local快取機制前，暫時設置總搜尋上限避免本頁loading時間過長
            //餘下的資料由背景更新function-->resetData()去實現
            if (res.data.length == 200 && self.rawStopList.length < 2000) {
                self.getStopList();
            }
            
        })
        .catch((err) => {
            window.alert("Get getStopList occurs error：" + err);
        });
    
}




