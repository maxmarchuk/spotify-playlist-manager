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
          className="image"
          style={{ backgroundImage: `url(${data.images[0].url})` }}
        />
        <div className="info">
          <p className="name">{data.name}</p>
          <p className="author">{data.owner.display_name}</p>
          <p className="author">{data.followers}</p>
        </div>
      </div>
    </Link>
  );
};

export default Playlist;
