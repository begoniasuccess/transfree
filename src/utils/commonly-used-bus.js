/**
 * Use this key to store commonly used bus in localStorage.
 * @type {string}
 */
const LOCALSTORAGE_KEY = "TRANSFREE_COMMONLY_USED_BUS";

/**
 * Add bus to commonly used list.
 * @param bus bus object
 */
export const addBus = (bus) => {
  let allBus = getAllBus();
  if (allBus === null) {
    allBus = new Array();
  }
  allBus.push(bus);
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(allBus));
};

/**
 * Remove one bus from commonly used list by routeId.
 * @param routeId route id
 */
export const removeBus = (routeId) => {
  let allBus = getAllBus();
  allBus = allBus.filter((bus) => bus.RouteID !== routeId);
  if (allBus !== null) {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(allBus));
  }
};

/**
 * Get all commonly used bus.
 * @returns {any} commonly used bus list
 */
export const getAllBus = () => {
  let allBus = window.localStorage.getItem(LOCALSTORAGE_KEY);
  //   return allBus;
  return JSON.parse(allBus);
};

/**
 * Search commonly used bus by city and routeName
 * @param city city
 * @param routeName route name
 * @returns {*} commonly used bus after fuzzy query
 */
export const filterBus = (city, routeName) => {
  let allBus = getAllBus();

  if (city) {
    allBus = allBus.filter((bus) => bus.City === city);
  }
  if (routeName) {
    allBus = allBus.filter((bus) => bus.RouteName.Zh_tw === routeName);
  }

  return allBus;
};

/**
 * Remove all commonly used bus.
 */
export const removeAllBus = () => {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
};
