import React, { Component } from 'react';
import PlaylistManager from './PlaylistManager';
import UserHeader from './UserHeader';
import SpotifyWebApi from 'spotify-web-api-js';
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom';
import PlaylistPage from './PlaylistPage';
const spotifyApi = new SpotifyWebApi();

const LogIn = props => (
  <a className="login-link" href="http://localhost:8888">
    Login
  </a>
);

const Main = props => {
  const { playlists } = props;
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PlaylistManager playlists={playlists} spotifyApi={spotifyApi} />
          )}
        />
        <Route path="/playlist/:id" component={PlaylistPage} />
      </Switch>
    </main>
  );
};

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.getUserInfo();

    this.state = {
      loggedIn: token ? true : false,
      playlists: null,
      user: null
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

  getPlaylists(userId) {
    spotifyApi.getUserPlaylists(userId).then(response => {
      this.setState({
        playlists: response.items
      });
    });
  }
  getUserInfo() {
    spotifyApi.getMe().then(user => {
      this.getPlaylists(user.id);
      this.setState({
        user
      });
    });
  }

  logUserOut() {
    spotifyApi.setAccessToken(null);
    window.location = '';
  }

  render() {
    const { playlists, user, loggedIn } = this.state;
    window.spotifyApi = spotifyApi;
    window.currentUser = user;

    return (
      <div className="App">
        {!loggedIn ? <LogIn /> : ''}
        <UserHeader logUserOut={this.logUserOut} />
        <Main playlists={playlists} />
      </div>
    );
  }
}

export default App;
