import moment from "moment";

/**
 * Get current datetime format with 'YYYY/MM/DD HH:mm:ss'.
 * @returns {string}
 */
export const getCurrentDateTime = () => {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}
