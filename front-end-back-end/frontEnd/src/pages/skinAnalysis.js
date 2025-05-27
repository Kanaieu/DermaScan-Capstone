import Header from '../components/header.js';
import Footer from '../components/footer.js';

const Analysis = () => {
  return `
    ${Header()}
    <main class="analysis-container">
      <section class="upload-section" id="upload-section">
        <h2>Upload Skin Photo</h2>
        <div class="upload-box" id="upload-box">
          <input type="file" id="photo-input" accept="image/*" hidden />
          <label for="photo-input" class="upload-label" id="drop-area">
            <img src="/assets/upload-icon.png" alt="Upload" />
            <p><span>Drag & Drop</span> or <span class="browse">Browse</span> to upload</p>
          </label>
        </div>
        <button id="submit-analysis">Submit for Analysis</button>
      </section>

      <section class="result-section hidden" id="result-section">
        <h2>Diagnosis Result</h2>
        <div class="preview-box" id="preview-box"></div>
        <div id="diagnosis-info">
          <p><strong>Detected Condition:</strong><br></p>
          <p><strong>Explanation:</strong><br></p>
          <p><strong>Suggested Treatment:</strong><br></p>
        </div>
        <button id="save-result"></button>
      </section>
    </main>
    ${Footer()}
  `;
};

export const setupAnalysisEvents = () => {
  if (location.hash !== '#/analysis') return;
  const dropArea = document.getElementById('drop-area');
  const fileInput = document.getElementById('photo-input');

  if (!dropArea || !fileInput) return;

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

      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  });
}


export default Analysis;
