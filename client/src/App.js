import React, { Component } from "react";
import PlaylistList from "./PlaylistList.js";
import UserHeader from "./UserHeader.js";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      playlists: null
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      this.setState({
        playlists: response.items
      });
    });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }
  render() {
    if (!this.state.playlists) {
      this.getPlaylists();
    }
    return (
      <div className="App">
        <UserHeader loggedIn={this.state.loggedIn} />
        {this.state.playlists && (
          <PlaylistList playlists={this.state.playlists} />
        )}
      </div>
    );
  }
}

export default App;
