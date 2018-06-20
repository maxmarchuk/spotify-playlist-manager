import React, { Component } from 'react';
import '../styles/TrackList.css';
import moment from 'moment';
import { ReactDataGrid } from 'react-data-grid';

const Track = ({ track }) => {
  const t = track.track;
  const name = t.name;
  const artist = t.artists[0].name;
  const dateAdded = track.added_at;
  const relativeTimeAdded = moment(dateAdded).fromNow();

  return (
    <tr className="track">
      <td className="track-name">{name}</td>
      <td className="track-artist">{artist}</td>
      <td className="track-date-added">{relativeTimeAdded}</td>
    </tr>
  );
};

class TrackList extends Component {
  constructor(props) {
    super(props);
    const { playlistId } = props.match.params;
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    this.state = {
      playlist: undefined
    };
    this.getPlaylistTracks(user.id, playlistId);
    this._columns = [
      {
        key: 'name',
        name: 'Name',
        sortable: true
      },
      {
        key: 'artist',
        name: 'Artist',
        sortable: true
      },
      {
        key: 'date_added',
        name: 'Date added',
        sortable: true
      }
    ];
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

    return (
      <div className="track-page">
        <table className="track-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Date added</th>
            </tr>
          </thead>
          {this.renderTracks(playlist.items)}
        </table>
      </div>
    );
  }
}

export default TrackList;
