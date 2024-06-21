export function renderRestaurantList(restaurants) {
  const restaurantListElement = document.querySelector('#restaurant-list');
  restaurantListElement.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const restaurantElement = document.createElement('div');
    restaurantElement.classList.add('restaurant');
    restaurantElement.innerHTML = `
      <img src="" alt="cok" class="restaurant-image">
      <div class="restaurant-info">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.description}</p>
      </div>
    `;
    restaurantListElement.appendChild(restaurantElement);
  });
}
