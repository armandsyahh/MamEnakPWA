import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import RestaurantApi from './data/RestaurantApi';
import FavoriteRestaurantIdb from './data/idb';


console.log('Hello Coders! :)');

// Fungsi untuk mendapatkan URL gambar berdasarkan resolusi
function getImageUrl(pictureId, resolution) {
    return `https://restaurant-api.dicoding.dev/images/${resolution}/${pictureId}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const drawer = document.querySelector('.drawer');

    hamburgerMenu.addEventListener('click', () => {
        const isExpanded = drawer.classList.toggle('open');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Handle keyboard accessibility for the hamburger menu
    hamburgerMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const isExpanded = drawer.classList.toggle('open');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
            event.preventDefault();
        }
    });

    try {
        const restaurants = await RestaurantApi.listRestaurants();
        const restaurantList = document.getElementById('restaurant-list');
        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('restaurant-card');
            restaurantCard.innerHTML = `
                <picture>
                    <source srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                    <source srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                    <img src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                </picture>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <button class="favorite-button" data-id="${restaurant.id}">Favorite</button>
                <button class="detail-button" data-id="${restaurant.id}">View Details</button>
            `;
            restaurantList.appendChild(restaurantCard);

            // Add event listener to favorite button
            const favoriteButton = restaurantCard.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', async (event) => {
                event.stopPropagation();
                const restaurantData = {
                    id: restaurant.id,
                    name: restaurant.name,
                    pictureId: restaurant.pictureId,
                    city: restaurant.city,
                    rating: restaurant.rating
                };
                await FavoriteRestaurantIdb.putRestaurant(restaurantData);
                alert(`${restaurant.name} has been added to favorites`);
            });

            // Add event listener to detail button
            const detailButton = restaurantCard.querySelector('.detail-button');
            detailButton.addEventListener('click', () => {
                window.location.hash = `#/detail/${restaurant.id}`;
            });
        });
    } catch (error) {
        console.error('Error fetching or adding restaurant data:', error); // Menambahkan penanganan kesalahan saat fetching atau menambahkan data restoran
    }

    async function showRestaurantDetail(restaurantId) {
        console.log('Fetching restaurant detail with ID:', restaurantId);
        try {
            const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${restaurantId}`);
            const data = await response.json();
            const { restaurant } = data;
            console.log('Restaurant detail:', restaurant);
            const restaurantDetail = document.getElementById('restaurant-list');
            restaurantDetail.innerHTML = `
                 <div class="restaurant-detail">
                <picture>
                    <source srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                    <source srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                    <img src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                </picture>
                <h2>${restaurant.name}</h2>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <p>${restaurant.description}</p>
                <h2>Menu</h2>
                <h3>Makanan</h3>
                <ul>
                    ${restaurant.menus.foods.map(food => `<p>${food.name}</p>`).join('')}
                </ul>
                <h3>Minuman</h3>
                <ul>
                    ${restaurant.menus.drinks.map(drink => `<p>${drink.name}</p>`).join('')}
                </ul>
                <h2>Customer Reviews</h2>
                <div id="customer-reviews">
                    ${restaurant.customerReviews.map(review => `
                        <div class="review">
                            <p><strong>${review.name}</strong></p>
                            <p>${review.review}</p>
                            <p><em>${review.date}</em></p>
                        </div>
                    `).join('')}
                </div>
                <h2>Add Review</h2>
                <form id="add-review-form">
                    <input type="text" id="reviewer-name" name="name" placeholder="Your name" required>
                    <textarea id="review-text" name="review" placeholder="Your review" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
            restaurantDetail.style.display = 'block';
            const reviewForm = document.getElementById('add-review-form');
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await addReview(restaurantId);
        });
    } catch (error) {
        console.error('Error fetching restaurant detail:', error);
    }
}

    
    async function addReview(restaurantId) {
        const name = document.getElementById('reviewer-name').value;
        const review = document.getElementById('review-text').value;
    
        const reviewData = {
            id: restaurantId,
            name: name,
            review: review,
        };
    
        try {
            const response = await fetch('https://restaurant-api.dicoding.dev/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
    
            const data = await response.json();
            if (!data.error) {
                const customerReviews = data.customerReviews;
                const reviewContainer = document.getElementById('customer-reviews');
                reviewContainer.innerHTML = customerReviews.map(review => `
                    <div class="review">
                        <p><strong>${review.name}</strong></p>
                        <p>${review.review}</p>
                        <p><em>${review.date}</em></p>
                    </div>
                `).join('');
    
                // Clear the form
                document.getElementById('add-review-form').reset();
                alert('Review added successfully!');
            } else {
                alert('Failed to add review. Please try again.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review. Please try again.');
        }
    }

    // Fungsi untuk menampilkan daftar restoran favorit
    async function showFavoriteList() {
        try {
            const favorites = await FavoriteRestaurantIdb.getAllRestaurants();
            const favoriteList = document.getElementById('favorite-restaurants');
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
                    window.location.hash = `#/detail/${restaurant.id}`;
                });
            });
            document.getElementById('favorite-list').style.display = 'block';
        } catch (error) {
            console.error('Error fetching favorite restaurants:', error);
        }
    }

    // Router
    function router() {
        const hash = window.location.hash;
        console.log('Hash changed:', hash);
        if (hash.startsWith('#/detail/')) {
            const id = hash.split('/')[2];
            showRestaurantDetail(id);
        } else if (hash === '#/favorite') {
            console.log('Showing favorite list');
            showFavoriteList();
        } else {
            console.log('Showing main content');
        }
    }
    // Event listener for hash change
    window.addEventListener('hashchange', () => {
        router();
    });

    // Event listener for initial page load
    window.addEventListener('load', () => {
        router();
    });

});
