import React, { Component } from 'react';
import './PlaybackFooter.css';
class PlaybackFooter extends Component {
  render() {
    const artworkUrl =
      'https://i.scdn.co/image/b7ef1ea9804268d0844f4b7485d67664e6ab00bb';
    const currentSongName = 'Current song';
    const currentSongArtist = 'Current Artist';
    return (
      <footer className="playback-footer">
        <div
          style={{
            backgroundImage: `url(${artworkUrl})`,
            height: '50px',
            width: '50px'
          }}
          className="artwork"
        />
        <div className="song-details">
          <div className="name">{currentSongName}</div>
          <div className="artist">{currentSongArtist}</div>
        </div>
      </footer>
    );
  }
}
export default PlaybackFooter;
