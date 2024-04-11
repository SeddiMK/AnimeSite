import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';

import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';

const App = () => {
  useScript('./particles.js');

  return (
    <>
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Header />
      <div className="container">
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default App;
