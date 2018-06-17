import React from 'react';
import '../styles/PlaylistList.css';
import Playlist from './Playlist';

export default ({ playlists }) => {
  if (!playlists) {
    return null;
  }
  const renderedPlaylists = playlists.map((pl, index) => (
    <Playlist key={`Playlist #${index}`} data={pl} index={index} />
  ));

  return <div className="playlists-container">{renderedPlaylists}</div>;
};
