class HeroElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Welcome to MamEnakPWA</h1>
          <p class="hero__tagline">Find your favorite restaurant here</p>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-element', HeroElement);
