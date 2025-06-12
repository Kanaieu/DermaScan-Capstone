import Home from '../pages/Home.js';
import Analysis from '../pages/skinAnalysis.js'
import Education from '../pages/Education.js';
import Profile from '../pages/profile.js';
import About from '../pages/About.js';
import LoginPage from '../pages/Login.js';
import RegisterPage from '../pages/Register.js';
import EditProfile from '../pages/EditProfile.js';
import EducationDetails from "../pages/education-details.js";

const routes = {
  '/': Home,
  '/analysis': Analysis,
  '/education': Education,
  '/profile': Profile,
  '/about': About,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/edit-profile': EditProfile
};

const router = async () => {
  const path = location.hash.slice(1) || "/";
  let view;

  if (path.startsWith("/education/")) {
    view = EducationDetails;
  } else {
    view = routes[path] || Home;
  }

  const appElement = document.getElementById("app");
  if (!appElement) {
    console.error("Element with ID 'app' not found.");
    return;
  }
  appElement.innerHTML = '<p class="text-center p-8">Loading page...</p>';
  const viewHtml = await view();
  appElement.innerHTML = viewHtml;

};

export default router;
