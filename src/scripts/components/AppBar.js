class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav>
        <div class="container">
          <div class="brand">
            <a href="/">MamEnakPWA</a>
          </div>
          <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/favorites">Favorites</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
