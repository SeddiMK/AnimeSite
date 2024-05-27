import './RandomAnime.scss';
import React from 'react';

import FullDescItem from '../fullDescItem/FullDescItem';

const RandomAnime = () => {
  return (
    <main className="main anime">
      <div className="anime__wrap">
        {/* <div className="anime__title"></div>
        <div className="anime__sort"></div> */}
        <div className="anime__list-items">
          <FullDescItem flagRandomAnime={true} />
        </div>
      </div>
    </main>
  );
};
export default RandomAnime;
