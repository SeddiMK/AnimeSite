import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';

// import useScript from '../../hooks/useScript';

// components
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
// script
import Particles from '../particles/Particles';
// import ParticlesBg from 'particles-bg';

const Layout = () => {
  // useScript('./particles.js');
  const wrapperRef = useRef(null);
  // let config = {
  //   num: [4, 7],
  //   rps: 0.1,
  //   radius: [5, 40],
  //   life: [1.5, 7],
  //   v: [2, 3],
  //   tha: [-40, 40],
  //   // body: "./img/icon.png", // Whether to render pictures
  //   rotate: [0, 20],
  //   alpha: [0.6, 0],
  //   scale: [1, 0.1],
  //   position: { x: 1, y: 1, width: 200, height: 200 }, // all or center or {x:1,y:1,width:100,height:100}
  //   color: ['random', '#ff0000'],
  //   cross: 'dead', // cross or bround
  //   random: 15, // or null,
  //   g: 9, // gravity
  //   // f: [2, -1], // force
  //   onParticleUpdate: (ctx, particle) => {
  //     ctx.beginPath();
  //     ctx.rect(
  //       particle.p.x,
  //       particle.p.y,
  //       particle.radius * 2,
  //       particle.radius * 2
  //     );
  //     ctx.fillStyle = particle.color;
  //     ctx.fill();
  //     ctx.closePath();
  //   },
  // }; //config={config}color="#d1aee3" num={200}type="cobweb"
  return (
    <>
      <div className="wrapper" ref={wrapperRef}>
        <canvas className="particles-canv" data-color="#B99970"></canvas>
        <Particles wrapperRef={wrapperRef} />
        {/* <ParticlesBg color="#d1aee3" num={50} type="cobweb" bg={true} /> */}
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
