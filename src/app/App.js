import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';

import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  useScript('./particles.js');

  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/fullOptions/:articul" element={<FullOptions />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Header />
      <div className="container">
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default App;
