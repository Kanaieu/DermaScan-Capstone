const Header = () => {
  return `
    <header>
      <div style="display: flex; align-items: center;">
        <img src="/assets/logo.png" alt="Logo" />
        <span class="logo">DermaScan</span>
      </div>
      <nav>
        <a href="#/">Home</a>
        <a href="#/analysis">Skin Analysis</a>
        <a href="#/education">Education</a>
        <a href="#/profile">Profile</a>
        <a href="#/about">About</a>
      </nav>
      <div>
        <button>Login</button>
      </div>
    </header>
  `;
};

export default Header;
