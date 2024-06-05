import './RandomAnime.scss';
import React, { useState, useRef } from 'react';

import { useToggle } from '../../hooks/useToggle';
import FullDescItem from '../fullDescItem/FullDescItem';

import Particles from '../../containers/particles/Particles';

const RandomAnime = () => {
  // const [toggleRandom, setToggleRandom] = useState(true);
  const wrapperRef = useRef(null);
  return (
    <main ref={wrapperRef} className="main anime-random">
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles wrapperRef={wrapperRef} />
      {/* import Particles from '../../containers/particles/Particles';
const wrapperRef = useRef(null); */}

      <div className="anime-random__wrap">
        {/* <div className="anime__title"></div>
        <div className="anime__sort"></div> */}
        <div className="anime-random__list-items">
          <FullDescItem flagRandomAnime={true} />
        </div>
      </div>
    </main>
  );
};
export default RandomAnime;
