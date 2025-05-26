import Header from '../components/header.js';

const Home = () => {
  return `
    ${Header()}
    <main class="p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to DermaScan</h1>
    </main>
  `;
};

export default Home;
