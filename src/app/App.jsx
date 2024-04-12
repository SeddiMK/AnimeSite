import { Route, Routes } from 'react-router-dom';

import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
// pages
import Main from '../components/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Error from '../pages/error/Error';

const App = () => {
  useScript('./particles.js');

  return (
    <>
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contacts" element={<Contacts />} />
          {/* <Route path="/fullOptions/:articul" element={<FullOptions />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
