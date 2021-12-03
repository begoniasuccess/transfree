import axios from "axios";

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






