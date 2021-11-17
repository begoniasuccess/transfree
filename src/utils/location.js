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
