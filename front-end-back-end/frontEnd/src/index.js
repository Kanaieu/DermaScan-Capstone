import router from './router/routes.js';
import './styles/main.css';
import { setupAnalysisEvents } from './pages/skinAnalysis.js';
import { setupLoginForm } from './pages/Login.js';
import { setupRegisterForm } from './pages/Register.js';

// Panggil router saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', () => {
  router();
  setupAnalysisEvents(); // panggil di awal juga
  setupLoginForm();
  setupRegisterForm();
});

// Update tampilan ketika hash URL berubah (#/home, #/profile, dll)
window.addEventListener('hashchange', () => {
  router();
  setupAnalysisEvents(); // custom function
  setupLoginForm();
  setupRegisterForm();
});

// listener untuk menampilkan preview gambar
document.addEventListener('change', (e) => {
  if (e.target.id === 'photo-input') {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const previewHTML = `
        <img src="${reader.result}" alt="Preview" style="max-width: 100%; border-radius: 4px;" />
      `;
      document.getElementById('upload-box').innerHTML = previewHTML;
      document.getElementById('upload-box').setAttribute('data-image', reader.result); // Simpan data
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'submit-analysis') {
    const uploadBox = document.getElementById('upload-box');
    const imageData = uploadBox.getAttribute('data-image');
    if (!imageData) {
      alert('Please upload a photo first.');
      return;
    }

    // Tampilkan hasil
    const resultSection = document.getElementById('result-section');
    resultSection.classList.remove('hidden');

    // Simulasi proses analisis
    const resultHTML = `
      <img src="${imageData}" alt="Result" style="max-width:100%; margin-bottom: 12px; border-radius: 4px;" />
      <p><strong>Detected Condition:</strong><br>Atopic Dermatitis</p>
      <p><strong>Explanation:</strong><br>A chronic skin condition causing itchy, inflamed skin.</p>
      <p><strong>Suggested Treatment:</strong><br>Moisturizing creams and topical corticosteroids as prescribed.</p>
      <button id="save-result">Save to Profile</button>
    `;
    document.querySelector('.result-section').innerHTML = `<h2>Diagnosis Result</h2>${resultHTML}`;

    // Reset upload area
    uploadBox.innerHTML = `
      <input type="file" id="photo-input" accept="image/*" hidden />
      <label for="photo-input" class="upload-label" id="drop-area">
        <img src="/assets/upload-icon.png" alt="Upload" />
        <p><span>Drag & Drop</span> or <span class="browse">Browse</span> to upload</p>
      </label>
    `;
    uploadBox.removeAttribute('data-image');
  }
  setupAnalysisEvents();
});

document.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('photo-input');

  // Highlight saat drag masuk
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;

      // Trigger manual change event biar preview jalan
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  });
});

