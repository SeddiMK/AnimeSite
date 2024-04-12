import React from 'react';
import { Outlet } from 'react-router-dom';

import useScript from '../../hooks/useScript';
// components
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Layout = () => {
  useScript('./particles.js');
  return (
    <>
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
