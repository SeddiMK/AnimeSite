import './NewList.scss';
import React, { useRef } from 'react';

import VideoListItem from '../../components/videoListItem/VideoListItem';

import Particles from '../../containers/particles/Particles';

const NewList = () => {
  const wrapperRef = useRef(null);
  return (
    <main ref={wrapperRef} className="main new-list">
      <canvas className="particles-canv" data-color="#B99970"></canvas>
      <Particles wrapperRef={wrapperRef} />

      <div className="new-list__wrap">
        <div className="new-list__title">
          Аниме {new Date().getFullYear()} года
        </div>
        {/* <div className="new-list__sort"></div> */}
        <div className="new-list__list-items">
          <VideoListItem flagNewList={true} />
        </div>
      </div>
    </main>
  );
};
export default NewList;
