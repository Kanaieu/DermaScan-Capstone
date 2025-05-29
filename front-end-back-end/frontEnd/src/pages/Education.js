import Header from "../components/header.js";
import Footer from "../components/footer.js";

const diseasesDataInternal = [
  {
    id: 1,
    title: "Understanding Psoriasis",
    image: "../images/placeholder.jpg", 
    description:
      "Psoriasis is a chronic skin disease characterized by patches of abnormal skin. Learn more about its causes and management strategies.",
  },
  {
    id: 2,
    title: "Recognizing Contact Dermatitis",
    image: "../images/placeholder.jpg", 
    description:
      "Contact dermatitis is a red, itchy rash caused by direct contact with a substance or an allergic reaction to it.",
  },
  {
    id: 3,
    title: "Bacterial Skin Infections",
    image: "../images/placeholder.jpg", // Ganti dengan path gambar yang sesuai
    description:
      "Discover common bacterial skin infections, their symptoms, and effective treatment options.",
  },
  {
    id: 4,
    title: "Fungal Infections Explained",
    image: "../images/placeholder.jpg", 
    description:
      "Fungal infections can affect different areas of the body. Find out how to recognize and treat them.",
  },
  {
    id: 5,
    title: "Managing Hives (Urticaria)",
    image: "../images/placeholder.jpg", // Ganti dengan path gambar yang sesuai
    description:
      "Learn about hives, a common allergic reaction, and the best ways to reduce symptoms and prevent flare-ups.",
  },
  {
    id: 6,
    title: "Vitiligo: Causes & Treatment",
    image: "../images/placeholder.jpg", // Ganti dengan path gambar yang sesuai
    description:
      "Vitiligo is a long-term skin condition causing patches of skin to lose color. Explore causes and treatment.",
  },
];

const Education = () => {
  if (!diseasesDataInternal || diseasesDataInternal.length === 0) {
    return `
      ${Header()}
      <main class="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Education Articles</h1>
          <p class="text-center text-gray-600">Konten edukasi tidak tersedia saat ini.</p>
        </div>
      </main>
      ${Footer()}
    `;
  }

  const diseaseArticlesHTML = diseasesDataInternal
    .map((disease) => {
      return `
      <article class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl">
        <div class="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          Article Image </div>
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
    ${Header()}
    <main class="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto">
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
      </div>
    </main>
    ${Footer()}
  `;
};

export default Education;

export const diseasesData = diseasesDataInternal;
