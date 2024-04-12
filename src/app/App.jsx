import './Null.scss';
import './App.scss';
import useScript from '../hooks/useScript';
import { Route, Routes } from 'react-router-dom';
// pages
import Layout from '../pages/layout/Layout';
import Main from '../components/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Error from '../pages/error/Error';
// components
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import { BrowserRouter } from 'react-router-dom'; //<BrowserRouter></BrowserRouter>

const App = () => {
  // useScript('./particles.js');

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
