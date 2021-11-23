/* eslint-disable */
import axios from "axios";
import jsSHA from "jssha";

export const BUS_URL_V2 = 'https://ptx.transportdata.tw/MOTC/v2/Bus';
// export const BUS_URL_V3 = 'https://ptx.transportdata.tw/MOTC/v3/Bus';

export const sendRequest = (httpMethod, url) => {
    if ("get" === httpMethod.toString().toLowerCase()) {
        return new Promise((resolve, reject) => {
            axios.get(url, {headers: getAuthorizationHeader()})
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    } else if ("post" === httpMethod.toString().toLowerCase()) {
        return new Promise((resolve, reject) => {
            axios.post(url, {headers: getAuthorizationHeader()})
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

const getAuthorizationHeader = () => {
    let AppID = 'e212b195247045edafa3708823b7cc5e';
    let AppKey = 'vOA-PgpYHlRJciuElXMSJ9sc1Mc';

    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return {'Authorization': Authorization, 'X-Date': GMTString};
}
