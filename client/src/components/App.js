import React, { Component } from 'react';
import PlaylistManager from './PlaylistManager';
import UserHeader from './UserHeader';
import SpotifyWebApi from 'spotify-web-api-js';
import '../styles/App.css';
import { Redirect, Switch, Route } from 'react-router-dom';
import PlaylistPage from './PlaylistPage';
const spotifyApi = new SpotifyWebApi();

const LogIn = props => (
  <a className="login-link" href="http://localhost:8888">
    Login
  </a>
);

const Main = props => {
  const { playlists } = props;
  return <main />;
};

class App extends Component {
  constructor() {
    super();
    const sessionToken = window.sessionStorage.getItem('spotifyToken');
    let token = sessionToken;
    if (!token || token === 'undefined') {
      const params = this.getHashParams();
      const accessToken = params.access_token;
      window.sessionStorage.setItem('spotifyToken', accessToken);
      token = accessToken;
    }

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
      window.sessionStorage.setItem('user', JSON.stringify(user));
    });
  }

  logUserOut() {
    spotifyApi.setAccessToken(null);
    window.location = '';
  }

  render() {
    const { playlists, user, loggedIn } = this.state;

    if (!loggedIn) {
      window.location.replace('http://localhost:8888');
      return null;
    }
    window.spotifyApi = spotifyApi;

    return (
      <div className="App">
        <UserHeader logUserOut={this.logUserOut} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Redirect to="/playlists" />}
          />
          <Route
            exact
            path="/playlists"
            render={() => <PlaylistManager playlists={playlists} />}
          />
          <Route path="/playlists/:id" component={PlaylistPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
