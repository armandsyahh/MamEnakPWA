class ReviewList extends HTMLElement {
  set reviews(reviews) {
    this._reviews = reviews;
    this.render();
  }

  render() {
    this.innerHTML = '<h3>Customer Reviews</h3>';
    this._reviews.forEach((review) => {
      const reviewItem = document.createElement('div');
      reviewItem.classList.add('review-item');
      reviewItem.innerHTML = `
        <p><strong>${review.name}</strong></p>
        <p>${review.review}</p>
        <p><em>${review.date}</em></p>
      `;
      this.appendChild(reviewItem);
    });
  }
}

customElements.define('review-list', ReviewList);
