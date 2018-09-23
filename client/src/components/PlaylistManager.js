import React from 'react';
import '../styles/PlaylistManager.css';
import Playlist from './Playlist';

export default ({ playlists }) => {
  if (!playlists) {
    return null;
  }
  let numHiddenPlaylists = 0;
  const hiddenPlaylistNames = [];

  const renderedPlaylists = playlists.map((pl, index) => {
    const playlistOwner = pl.owner.display_name;
    if (playlistOwner && playlistOwner !== 'Spotify') {
      if (pl.tracks.total > 100) {
        numHiddenPlaylists += 1;
        hiddenPlaylistNames.push(pl.name);
      } else {
        return <Playlist key={`Playlist #${index}`} data={pl} index={index} />;
      }
    }
    return null;
  });
  const hiddenPlaylistText = hiddenPlaylistNames.join(', ');
  const hiddenText = `Playlists with 100+ tracks are not supported at this time.Unsupported playlists: ${hiddenPlaylistText}`;
  return (
    <div>
      <div className="playlists-container">{renderedPlaylists}</div>
      <div className="hidden-playlist-text">
        {numHiddenPlaylists ? hiddenText : null}
      </div>
    </div>
  );
};
