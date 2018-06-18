import React, { Component } from 'react';
import '../styles/PlaylistPage.css';

class PlaylistPage extends Component {
  constructor(props) {
    const { id } = props.match.params;
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    super(props);
    this.state = {
      playlist: undefined
    };
    this.getPlaylistTracks(user.id, id);
  }

  getPlaylistTracks(userId, playlistId) {
    window.spotifyApi.getPlaylistTracks(userId, playlistId).then(response => {
      this.setState({ playlist: response });
    });
  }

  renderTracks(songs) {
    return songs.map((song, index) => {
      return (
        <li key={`Track # ${index}`}>
          {song.track.name} | {song.track.artists[0].name}
        </li>
      );
    });
  }

  render() {
    const { playlist } = this.state;
    if (!playlist) {
      return <div />;
    }

    return <ul>{this.renderTracks(playlist.items)}</ul>;
  }
}

export default PlaylistPage;
