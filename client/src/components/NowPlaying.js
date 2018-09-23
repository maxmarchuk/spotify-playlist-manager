import React, { Component } from 'react';
import './NowPlaying.css';
import MusicControlButton from './MusicControlButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          isPlaying: r.is_playing,
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
    const { url, artist, name, isPlaying } = track;
    const centerIcon = isPlaying ? 'pause' : 'play';
    const centerAction = isPlaying
      ? window.spotifyApi.pause
      : window.spotifyApi.play;

    return (
      <div className="now-playing">
        <div onClick={this.toggleControls} className="song-details">
          <div style={{ backgroundImage: `url(${url})` }} className="artwork" />
          <div className="song-text-details">
            <div className="name">{name}</div>
            <div className="artist">{artist}</div>
          </div>
          {showControls ? (
            <FontAwesomeIcon icon="angle-up" />
          ) : (
            <FontAwesomeIcon icon="angle-down" />
          )}
          {showControls && (
            <div className="music-controls">
              <MusicControlButton
                icon="fast-backward"
                action={window.spotifyApi.skipToPrevious}
                refresh={this.refreshNowPlayingInfo}
              />
              <MusicControlButton
                icon={centerIcon}
                action={centerAction}
                refresh={this.refreshNowPlayingInfo}
              />
              <MusicControlButton
                icon="fast-forward"
                action={window.spotifyApi.skipToNext}
                refresh={this.refreshNowPlayingInfo}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NowPlaying;
