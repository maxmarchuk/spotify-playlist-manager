import React from 'react';
import '../styles/Playlist.css';
import { Link } from 'react-router-dom';

const Playlist = ({ data, index }) => {
  const location = {
    pathname: `/playlists/${data.id}`,
    state: { playlistName: data.name }
  };

  return (
    <Link to={location}>
      <div className="playlist" key={index}>
        <div
          className="playlist-image"
          style={{ backgroundImage: `url(${data.images[0].url})` }}
        />
        <div className="playlist-info">
          <p className="playlist-name">{data.name}</p>
          <p className="playlist-author">{data.owner.display_name}</p>
          <p className="playlist-author">{data.followers}</p>
        </div>
      </div>
    </Link>
  );
};

export default Playlist;
