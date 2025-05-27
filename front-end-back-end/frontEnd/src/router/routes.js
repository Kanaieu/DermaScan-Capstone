import Home from '../pages/Home.js';
import Analysis from '../pages/skinAnalysis.js'
import Education from '../pages/Education.js';
import Profile from '../pages/Profile.js';
import About from '../pages/About.js';

const routes = {
  '/': Home,
  '/analysis': Analysis,
  '/education': Education,
  '/profile': Profile,
  '/about': About,
};

const router = () => {
  const path = location.hash.slice(1) || '/';
  const view = routes[path] || Home;
  document.getElementById('app').innerHTML = view();
};

export default router;
