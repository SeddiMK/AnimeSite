import './NewList.scss';
import React from 'react';

import VideoListItem from '../../components/videoListItem/VideoListItem';

const NewList = () => {
  return (
    <main className="main new-list">
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
