import { BUS_URL_V2, sendRequest } from "../utils/https";
// import { distance, isInRange } from "../utils/location";
import { RESPONSE_DATA_FORMAT_JSON } from "../constant/common";

const LOCALSTORAGE_KEY = {
    stopList:"ALL-STOP-LIST"
};

const PER_STOPS_PER_CALL = 200;

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

export const getStopList = () => {
    let allStop = window.localStorage.getItem(LOCALSTORAGE_KEY.stopList);
    return JSON.parse(allStop);
}

export const setStopList = (stopData) => {
    if (typeof stopData !== "string"){
        stopData = JSON.stringify(stopData);
    }
    window.localStorage.setItem(LOCALSTORAGE_KEY.stopList, stopData);
    return stopData.length;
}

export const addStopList = (stopData) => {
    if (typeof stopData == "string"){
        stopData = JSON.parse(stopData);
    }
    let allStopList = getStopList();
    allStopList = allStopList.concat(stopData);
    setStopList(allStopList);
    return allStopList.length;
}

export const callStopList = (city) => {
    if (cityList.indexOf(city) < 0) return false;
    let skip = getStopList().length;
    let baseUrl = `${BUS_URL_V2}/Stop/City/${city}?$format=${RESPONSE_DATA_FORMAT_JSON}`;    
    let url = `${baseUrl}&$top=${PER_STOPS_PER_CALL}&$skip=${skip}`;  
    sendRequest("get", url)
        .then((res) =>{
            let stopList = res.data;
            //設定城市
            stopList.foreach((aStop, index) => {
                aStop;
                stopList[index].city = city;
            });
            addStopList(stopList);
        })
        .catch((err) => {
            console.log("Get callStopList occurs error：" + err);
        });    
}