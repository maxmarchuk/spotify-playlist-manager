import React from 'react';
import '../styles/Playlist.css';

const Playlist = ({ data, index }) => (
  <div className="playlist" key={index}>
    <div
      className="playlist-image"
      style={{ backgroundImage: `url(${data.images[0].url})` }}
    />
    <div className="playlist-info">
      <p className="playlist-name">{data.name}</p>
      <p className="playlist-author">{data.owner.display_name}</p>
    </div>
  </div>
);

export default Playlist;
