import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const FavoritePage = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    console.log('Fetching favorite list');
    try {
        const favorites = await FavoriteRestaurantIdb.getAllRestaurants();
        const favoriteList = document.getElementById('favorite-restaurants');
        if (favoriteList) {
            favoriteList.innerHTML = '';
            favorites.forEach(restaurant => {
                const favoriteCard = document.createElement('div');
                favoriteCard.classList.add('restaurant-card');
                favoriteCard.innerHTML = `
                    <picture>
                        <source srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                        <source srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                        <img src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                    </picture>
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.city}</p>
                    <p>Rating: ${restaurant.rating}</p>
                    <button class="detail-button" data-id="${restaurant.id}">View Details</button>
                `;
                favoriteList.appendChild(favoriteCard);

                // Add event listener to detail button
                const detailButton = favoriteCard.querySelector('.detail-button');
                detailButton.addEventListener('click', () => {
                    window.location.href = `#/detail/${restaurant.id}`;
                });
            });
            document.getElementById('favorite-list').style.display = 'block';
        } else {
            console.error('Favorite list element not found.');
        }
    } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
    }
  },
};

export default FavoritePage;
