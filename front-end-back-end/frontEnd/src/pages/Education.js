import Header from "../components/header.js";
import Footer from "../components/footer.js";

const Education = async () => {
  let diseasesData = [];
  let isLoading = true;
  let error = null;

  try {
    const response = await fetch("/data/diseases-data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    diseasesData = await response.json();
    isLoading = false;
  } catch (e) {
    console.error("Gagal memuat data penyakit:", e);
    error = e;
    isLoading = false;
  }

  const renderContent = () => {
    if (isLoading) {
      return `<p class="text-center text-gray-500">Loading...</p>`;
    }

    if (error) {
      return `<p class="text-center text-red-500">Gagal memuat konten. Silakan coba lagi nanti.</p>`;
    }

    if (diseasesData.length === 0) {
      return `<p class="text-center text-gray-600">Konten edukasi tidak tersedia saat ini.</p>`;
    }

    const diseaseArticlesHTML = diseasesData
      .map((disease) => {
        return `
        <article class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl">
          <div class="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
            <img src="${disease.image}" alt="${disease.title}" class="w-full h-full object-cover">
          </div>
          <div class="p-5 flex flex-col flex-grow">
            <h2 class="text-lg font-semibold text-gray-900 mb-2">
              ${disease.title}
            </h2>
            <p class="text-gray-700 text-sm mb-4 flex-grow">
              ${disease.description}
            </p>
            <a href="#/education/${disease.id}" class="text-sm text-blue-600 hover:text-blue-800 font-medium self-start">
              Read More
            </a>
          </div>
        </article>
      `;
      })
      .join("");

    return `
      <div class="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="flex flex-wrap justify-center md:justify-end gap-2 mb-8">
        <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">All</button>
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Infection</button>
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Allergy</button>
        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">Autoimmune</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${diseaseArticlesHTML}
      </div>
    `;
  };

  return `
    ${Header()}
    <main class="p-4 md:p-6 lg:p-8 bg-white min-h-screen">
      <div class="max-w-7xl mx-auto">
        ${renderContent()}
      </div>
    </main>
    ${Footer()}
  `;
};

export default Education;
