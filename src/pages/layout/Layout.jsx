import React from 'react';
import { Outlet } from 'react-router-dom';

import useScript from '../../hooks/useScript';

// components
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
// script
import Particles from '../../containers/particles/Particles';
import RootWidthHeigth from '../../containers/rootWidthHeigth/RootWidthHeigth';

const Layout = () => {
  // useScript('./particles.js');
  return (
    <>
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles />
      <div className="container">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
