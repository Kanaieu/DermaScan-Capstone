/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Pastikan path ini sesuai dengan struktur proyek Anda
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Di sini tempat Anda menambahkan kustomisasi tema, misalnya warna atau font
      // colors: {
      //   'brand-blue': '#1992d4',
      // },
    },
  },
  plugins: [
    // Untuk Tailwind v4, @tailwindcss/typography tidak perlu didaftarkan di sini.
    // Plugin ini diimpor langsung di file CSS Anda.
  ],
};
