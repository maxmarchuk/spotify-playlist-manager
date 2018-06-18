import React, { Component } from 'react';

class PlaylistPage extends Component {
  constructor(props) {
    const { id } = props.match.params;
    super(props);
    this.state = {
      playlist: {}
    };
    this.getPlaylistTracks(window.currentUser.id, id);
  }

  getPlaylistTracks(userId, playlistId) {
    window.spotifyApi.getPlaylistTracks(userId, playlistId).then(response => {
      this.setState({ playlist: response });
    });
  }

  render() {
    if (!this.state.playlist) {
      return <p>Playlist not found :(</p>;
    }
    console.log(this.state.playlist);
    return <div>playlist found</div>;
  }
}

export default PlaylistPage;
