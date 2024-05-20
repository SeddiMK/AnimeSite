import React from 'react';
import './VideoListPage.scss';

const VideoListPage = () => {
  return (
    <div>
      <h1>Top Anime</h1>
      <div>
        {animeData ? (
          <ul>
            {/* {animeData.map((episode, index) => (
        <li key={index}>
          <strong>Episode {index}:</strong> {episode.title}
          {episode.video_url && (
            <div>
              <iframe
                width="560"
                height="315"
                src={episode.link}
                title={`Episode ${episode.title}`}
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          )}
        </li>
      ))} */}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default VideoListPage;
