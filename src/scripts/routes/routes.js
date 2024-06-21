import {showRestaurantList, showFavoriteList, showRestaurantDetail }from '../../scripts/index';
 
const routes = {
  '/': showRestaurantList,
  '/favorite': showFavoriteList,
  '/detail/:id': showRestaurantDetail,
};

const parseUrl = () => {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const request = url.split('/');
  return {
    resource: request[1] || null,
    id: request[2] || null,
    verb: request[3] || null,
  };
};
 
export default {routes, parseUrl};