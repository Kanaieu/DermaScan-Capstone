import Header from '../components/header.js';
import Footer from '../components/footer.js';

const Profile = () => {
  return `
    ${Header()}
    <main class="bg-white min-h-screen py-12 px-4 flex justify-center">
      <div class="w-full max-w-xl flex flex-col items-center text-center">

        <!-- Profile Info -->
        <img src="assets/avatar.png" alt="User Avatar" class="w-24 h-24 rounded-full object-cover border mb-6" />
        <h2 class="text-2xl font-semibold text-gray-800">Jordan Lee</h2>
        <p class="text-gray-600 text-sm mb-4">jordan@email.com</p>
        <div class="flex flex-row gap-4 mb-8">
          <button onclick="navigateToEditProfile()" class="bg-black text-white text-sm px-5 py-2 rounded">Edit Profile</button>
          <button class="bg-black text-white text-sm px-5 py-2 rounded">Logout</button>
        </div>

        <!-- Diagnosis History -->
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Diagnosis History</h3>
        <div class="flex flex-col items-center gap-10 w-full">
          ${renderDiagnosis("Psoriasis", "13 March 2025", "Advised to use topical corticosteroids and moisturizers.", "assets/psoriasis.jpg")}
          ${renderDiagnosis("Eczema", "05 February 2025", "Apply fragrance-free moisturizer and consult dermatologist if needed.", "assets/eczema.jpg")}
          ${renderDiagnosis("Contact Dermatitis", "17 January 2025", "Recommend avoidance of irritants and use of mild soaps.", "assets/dermatitis.jpeg")}
        </div>

      </div>
    </main>
    ${Footer()}
  `;
};

function renderDiagnosis(title, date, desc, imagePath) {
  return `
    <div class="flex flex-col items-center text-center">
      <img src="${imagePath}" alt="${title}" class="w-48 h-48 object-cover rounded border mb-3" />
      <p class="font-semibold text-gray-800">${title} <span class="text-sm text-gray-500">${date}</span></p>
      <p class="text-sm text-gray-700 mt-1 w-full max-w-md">${desc}</p>
    </div>
  `;
}

window.navigateToEditProfile = () => {
  window.location.href = "#/EditProfile";
};

export default Profile;