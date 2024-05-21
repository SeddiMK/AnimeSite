import './Main.scss';
import React from 'react';

import VideoListItem from '../../components/videoListItem/VideoListItem';

const Main = () => {
  return (
    <main className="main anime">
      <div className="anime__wrap">
        <div className="anime__title"></div>
        <div className="anime__sort"></div>
        <div className="anime__list-items">
          <VideoListItem />
        </div>
      </div>
    </main>
  );
};
export default Main;
