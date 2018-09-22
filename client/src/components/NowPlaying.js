import React, { Component } from 'react';
import './NowPlaying.css';

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {}
    };

    this.refreshNowPlayingInfo();
    setInterval(() => this.refreshNowPlayingInfo(), 1000);
  }

  refreshNowPlayingInfo() {
    window.spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.assignNowPlayingInfo(response);
    });
  }

  assignNowPlayingInfo(r) {
    if (!r.item) {
      this.setState({
        track: {}
      });
    } else {
      this.setState({
        track: {
          id: r.item.id,
          url: r.item.album.images[2].url,
          artist: r.item.artists[0].name,
          name: r.item.name
        }
      });
    }
  }

  showControls() {}

  render() {
    const { track = {} } = this.state;

    const artworkUrl = track.url || '';
    const currentSongArtist = track.artist || '';
    const currentSongName = track.name || '';

    return (
      <div className="now-playing">
        <button onClick={this.showControls} className="song-details">
          <div
            style={{ backgroundImage: `url(${artworkUrl})` }}
            className="artwork"
          />
          <div className="song-text-details">
            <div className="name">{currentSongName}</div>
            <div className="artist">{currentSongArtist}</div>
          </div>
          <i className="fa fa-angle-down" />
          <div className="music-controls">THIS IS A SECTION</div>
        </button>
      </div>
    );
  }
}

export default NowPlaying;
