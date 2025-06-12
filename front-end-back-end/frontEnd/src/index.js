import router from "./router/routes.js";
import "./styles/main.css";
import { setupAnalysisEvents } from "./pages/skinAnalysis.js";
import { setupLoginForm } from "./pages/Login.js";
import { setupRegisterForm } from "./pages/Register.js";
import { setupProfileEvents } from "./pages/Profile.js";

// Fungsi untuk setup event tombol hamburger
const setupHeaderEvents = () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
};

// Panggil router saat halaman pertama kali dimuat
window.addEventListener("DOMContentLoaded", () => {
  router(); // Render halaman
  setupHeaderEvents(); // Setup event untuk header
  setTimeout(() => {
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Yakin ingin logout?")) {
          localStorage.removeItem("user");
          alert("Logout berhasil!");
          window.location.hash = "/login";
        }
      });
    }
  }, 100);
});

// Update tampilan ketika hash URL berubah (#/home, #/profile, dll)
window.addEventListener("hashchange", () => {
  router();
  setupHeaderEvents(); // Setup ulang event untuk header
  setTimeout(() => {
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Yakin ingin logout?")) {
          localStorage.removeItem("user");
          alert("Logout berhasil!");
          window.location.hash = "/login";
        }
      });
    }
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");

  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
