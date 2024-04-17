import React, { useRef } from 'react';
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
  const wrapperRef = useRef(null);
  // console.log(
  //   wrapperRef.current.offsetHeight,
  //   'wrapperRef.current.offsetHeight'
  // );

  return (
    <>
      <div className="wrapper" ref={wrapperRef}>
        <canvas className="particles-canv" data-color="#B99970"></canvas>
        <Particles wrapperRef={wrapperRef} />
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
