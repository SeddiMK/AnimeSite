import './RandomAnime.scss';
import React, { useState } from 'react';

import { useToggle } from '../../hooks/useToggle';
import FullDescItem from '../fullDescItem/FullDescItem';

const RandomAnime = () => {
  // const [toggleRandom, setToggleRandom] = useState(true);

  return (
    <main className="main anime-random">
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
