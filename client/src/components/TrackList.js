import React, { Component } from 'react';
import '../styles/TrackList.css';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';

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
    this.state = {
      playlist: undefined,
      rows: []
    };
    const { playlistId } = props.match.params;
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    this.getPlaylistTracks(user.id, playlistId);
    this._columns = [
      {
        key: 'name',
        name: 'Name'
      },
      {
        key: 'artist',
        name: 'Artist'
      },
      {
        key: 'date_added',
        name: 'Date added'
      }
    ];
  }

  getPlaylistTracks(userId, playlistId) {
    window.spotifyApi.getPlaylistTracks(userId, playlistId).then(response => {
      this.setState({ playlist: response });
      this.createRows(response.items);
    });
  }

  renderTracks(tracks) {
    return tracks.map((track, index) => {
      return <Track track={track} key={`Track # ${index}`} />;
    });
  }

  createRows(tracks) {
    let rows = [];

    for (let i = 0; i < tracks.length; i++) {
      const dateAdded = tracks[i].added_at;
      const relativeTimeAdded = moment(dateAdded).fromNow();

      rows.push({
        name: tracks[i].track.name,
        artist: tracks[i].track.artists[0].name,
        date_added: relativeTimeAdded
      });
    }

    this.setState({ rows });
  }

  rowGetter = i => {
    return this.state.rows ? this.state.rows[i] : {};
  };

  render() {
    const { playlist } = this.state;
    if (!playlist) {
      return <div />;
    }
    const rowCount = (this.state.rows && this.state.rows.length) || 0;
    return (
      <div className="track-page">
        <ReactDataGrid
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={rowCount}
        />
      </div>
    );
  }
}

export default TrackList;
