import Home from '../pages/Home.js';
import Analysis from '../pages/skinAnalysis.js'
import Education from '../pages/Education.js';
import Profile from '../pages/Profile.js';
import About from '../pages/About.js';
import LoginPage from '../pages/Login.js';
import RegisterPage from '../pages/Register.js';

const routes = {
  '/': Home,
  '/analysis': Analysis,
  '/education': Education,
  '/profile': Profile,
  '/about': About,
  '/login': LoginPage,
  '/register': RegisterPage
};

const router = () => {
  const path = location.hash.slice(1) || '/';
  const view = routes[path] || Home;
  document.getElementById('app').innerHTML = view();
};

export default router;
