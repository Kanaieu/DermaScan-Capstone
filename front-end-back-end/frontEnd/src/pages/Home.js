import Header from '../components/header.js';
import Footer from '../components/footer.js';

const Home = () => {
  return `
    ${Header()}
    <main class="p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to DermaScan</h1>
    </main>
    ${Footer()}
  `;
};

export default Home;
