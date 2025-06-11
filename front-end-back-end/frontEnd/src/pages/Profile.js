import Header from '../components/header.js';
import Footer from '../components/footer.js';

const Profile = () => {
  return `
    ${Header()}
    <main class="bg-gray-50 min-h-screen py-12 px-4 flex justify-center">
      <div class="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Profile Info -->
        <aside class="col-span-1 flex flex-col items-center text-center">
          <img src="assets/avatar.png" alt="Avatar" class="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300" />
          <h2 class="text-lg font-semibold text-gray-800">Jordan Lee</h2>
          <p class="text-sm text-gray-500 mb-4">jordan@email.com</p>
          <div class="flex flex-col gap-2 w-full px-6">
            <button onclick="navigateToEditProfile()" id="edit-profile-btn" class="bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition">Edit Profile</button>
            <button id="logout-btn" class="bg-gray-200 text-gray-700 text-sm py-2 rounded-md hover:bg-gray-300 transition">Logout</button>
          </div>
        </aside>

        <!-- Diagnosis History -->
        <section class="col-span-2">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Diagnosis History</h3>
          <div class="flex flex-col gap-4">

            ${renderDiagnosis("Psoriasis", "13 March 2025", "Advised to use topical corticosteroids and moisturizers.", "assets/psoriasis.jpg")}
            ${renderDiagnosis("Eczema", "05 February 2025", "Apply fragrance-free moisturizer and consult dermatologist if needed.", "assets/eczema.jpg")}
            ${renderDiagnosis("Contact Dermatitis", "17 January 2025", "Recommend avoidance of irritants and use of mild soaps.", "assets/dermatitis.jpeg")}

          </div>
        </section>

      </div>
    </main>
    ${Footer()}
  `;
};

function renderDiagnosis(title, date, desc, imagePath) {
  return `
    <div class="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
      <div class="flex items-start gap-4 pl-4">
        <img src="${imagePath}" alt="${title}" class="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm group-hover:scale-105 transition" />
        <div>
          <p class="text-lg font-semibold text-gray-800">${title} 
            <span class="text-xs text-gray-500 ml-2">${date}</span>
          </p>
          <p class="text-sm text-gray-600 mt-1 leading-relaxed">${desc}</p>
        </div>
      </div>
    </div>
  `;
}

window.navigateToEditProfile = () => {
  window.location.href = "#/EditProfile";
};

export default Profile;
