import React from 'react';
import '../styles/Playlist.css';
import { Link } from 'react-router-dom';

const Playlist = ({ data, index }) => {
  return (
    <div className="playlist" key={index}>
      <Link to={`/playlist/${data.id}`}>
        <div
          className="playlist-image"
          style={{ backgroundImage: `url(${data.images[0].url})` }}
        />
        <div className="playlist-info">
          <p className="playlist-name">{data.name}</p>
          <p className="playlist-author">{data.owner.display_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Playlist;
