import React, { Component } from 'react';
import '../styles/TrackList.css';
import moment from 'moment';

const Track = ({ track }) => {
  const t = track.track;
  const name = t.name;
  const artist = t.artists[0].name;
  const dateAdded = track.added_at;
  const relativeTimeAdded = moment(dateAdded).fromNow();

  return (
    <div className="track">
      <div className="track-field name">
        <p className="track-name">{name}</p>
      </div>
      <div className="track-field artist">
        <p className="track-artist">{artist}</p>
      </div>
      <div className="track-field date-added">
        <p className="track-date-added">{relativeTimeAdded}</p>
      </div>
    </div>
  );
};

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: undefined,
      rows: []
    };
    const { playlistId } = props.match.params;
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    this.getPlaylistTracks(user.id, playlistId);
  }

  getPlaylistTracks(userId, playlistId) {
    window.spotifyApi.getPlaylistTracks(userId, playlistId).then(response => {
      this.setState({ playlist: response });
    });
  }

  renderTracks(tracks) {
    return tracks.map((track, index) => {
      return <Track track={track} key={`Track # ${index}`} />;
    });
  }

  render() {
    const { playlist } = this.state;
    if (!playlist) {
      return <div />;
    }
    const numberOfTracks = playlist.items ? playlist.items.length : 0;
    return (
      <div>
        <div className="track-page">
          <div className="song-count">Songs: {numberOfTracks}</div>
          <div className="field-header">
            <div className="header-field name-header">Name</div>
            <div className="header-field artist-header">Artist</div>
            <div className="header-field date-header">Date added</div>
          </div>
          {this.renderTracks(playlist.items)}
        </div>
      </div>
    );
  }
}

export default TrackList;
