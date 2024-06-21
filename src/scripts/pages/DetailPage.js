import RestaurantSource from '../data/restaurant-source';
import UrlParser from '../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../utils/favorite-button-initiator';

const DetailPage = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="favoriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  },
};

export default DetailPage;
