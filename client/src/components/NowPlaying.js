import React, { Component } from 'react';
import './NowPlaying.css';
import MusicControlButton from './MusicControlButton';

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      showControls: false
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

  toggleControls = () => {
    const { showControls } = this.state;
    this.setState({ showControls: !showControls });
  };

  render() {
    const { track = {}, showControls } = this.state;

    const artworkUrl = track.url || '';
    const currentSongArtist = track.artist || '';
    const currentSongName = track.name || '';
    //<i className="fa fa-fast-backward" />
    //<i className="fa fa-play" />
    //<i className="fa fa-fast-forward" />
    return (
      <div className="now-playing">
        <div onClick={this.toggleControls} className="song-details">
          <div
            style={{ backgroundImage: `url(${artworkUrl})` }}
            className="artwork"
          />
          <div className="song-text-details">
            <div className="name">{currentSongName}</div>
            <div className="artist">{currentSongArtist}</div>
          </div>
          <i className="fa fa-angle-down" />
          {showControls && (
            <div className="music-controls">
              <MusicControlButton
                type="fast-backward"
                action={window.spotifyApi.skipToPrevious}
              />
              <MusicControlButton
                type="play"
                action={window.spotifyApi.pause}
              />
              <MusicControlButton
                type="fast-forward"
                action={window.spotifyApi.skipToNext}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NowPlaying;
