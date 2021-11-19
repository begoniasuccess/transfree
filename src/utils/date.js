import moment from "moment";

/**
 * Get current datetime format with 'YYYY/MM/DD HH:mm:ss'.
 * @returns {string}
 */
export const getCurrentDateTime = () => {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}

/**
 * Format the 4 code timestamp. For example: (0510) -> (05:10)
 * @param timestamp
 * @returns {string}
 */
export const formatTimeStamp = (timestamp) => {
    return `${timestamp.substr(0, 2)}:${timestamp.substr(2, 4)}`;
}
