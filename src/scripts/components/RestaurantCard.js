class RestaurantCard extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    const { name, pictureId, city, rating, description } = this._restaurant;
    this.innerHTML = `
      <div class="restaurant-card">
        <img src="" alt="cok">
        <div class="restaurant-info">
          <h3>${name}</h3>
          <p>${city}</p>
          <p>Rating: ${rating}</p>
          <p>${description}</p>
          <a href="#/detail/${this._restaurant.id}">View Details</a>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-card', RestaurantCard);
