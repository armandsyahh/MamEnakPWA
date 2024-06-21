const API_ENDPOINT = 'https://restaurant-api.dicoding.dev/';

class RestaurantSource {
  static async listRestaurants() {
    try {
      const response = await fetch(`${API_ENDPOINT}list`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Failed to fetch list of restaurants:', error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}detail/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Failed to fetch detail of restaurant with id ${id}:`, error);
      return null;
    }
  }

  static async searchRestaurants(query) {
    try {
      const response = await fetch(`${API_ENDPOINT}search?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(`Failed to search restaurants with query "${query}":`, error);
      return [];
    }
  }
}

export default RestaurantSource;
