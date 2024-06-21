class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>© 2023 MamEnakPWA. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', Footer);
