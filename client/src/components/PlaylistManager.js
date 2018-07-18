import React from 'react';
import '../styles/PlaylistList.css';
import Playlist from './Playlist';

export default ({ playlists, spotifyApi }) => {
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
        return;
      }
      return <Playlist key={`Playlist #${index}`} data={pl} index={index} />;
    }
  });
  const hiddenPlaylistText = hiddenPlaylistNames.join(', ');
  const hiddenText = `${numHiddenPlaylists} ${
    numHiddenPlaylists === 1 ? 'playlist has' : 'playlists have'
  } been hidden for having more than 100 tracks: ${hiddenPlaylistText}`;
  return (
    <div>
      <div className="playlists-container">{renderedPlaylists}</div>
      <div className="hidden-playlist-text">
        {numHiddenPlaylists ? hiddenText : null}
      </div>
    </div>
  );
};
