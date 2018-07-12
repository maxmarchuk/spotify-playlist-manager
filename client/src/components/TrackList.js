import React, { Component } from 'react';
import '../styles/TrackList.css';
import moment from 'moment';
import _ from 'lodash';

const Track = ({ track, index = '?' }) => {
  const t = track.track;
  const name = t.name;
  const artist = t.artists[0].name;
  const dateAdded = track.added_at;
  const relativeTimeAdded = moment(dateAdded).fromNow();

  return (
    <div className="row">
      <div className="track-field number right-separator">{index}</div>
      <div className="track-field name right-separator">{name}</div>
      <div className="track-field artist right-separator">{artist}</div>
      <div className="track-field date">{relativeTimeAdded}</div>
    </div>
  );
};

class TrackList extends Component {
  constructor(props) {
    super(props);

    const { playlistId } = props.match.params;
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    this.state = {
      playlist: undefined,
      rows: [],
      userId: user.id,
      playlistId
    };

    this.getPlaylistTracks(user.id, playlistId);
  }

  getPlaylistTracks = () => {
    window.spotifyApi
      .getPlaylistTracks(this.state.userId, this.state.playlistId)
      .then(response => {
        this.setState({ playlist: response });
      });
  };
  reorderOneAndTwo = playlist => {
    const tracks = playlist.items;
    const originalTrackMap = {};

    tracks.forEach((t, index) => {
      originalTrackMap[t.track.id] = index;
    });
    const dateMap = {};
    tracks.forEach((t, index) => {
      dateMap[index] = new Date(t.added_at);
    });

    const orderedTracks = _.orderBy(tracks, 'added_at', 'desc');

    const newTrackMap = {};
    orderedTracks.forEach((t, index) => {
      newTrackMap[originalTrackMap[t.track.id]] = index;
    });

    console.log('dates', dateMap);
    console.log('new', newTrackMap);

    // window.spotifyApi.reorderTracksInPlaylist(
    //   this.state.userId,
    //   this.state.playlistId,
    //   0,
    //   2
    // );
    this.getPlaylistTracks();
  };

  renderTracks(tracks) {
    return tracks.map((track, index) => {
      return <Track track={track} key={`Track # ${index}`} index={index} />;
    });
  }

  render() {
    const { playlist } = this.state;
    if (!playlist) {
      return <div />;
    }

    return (
      <div>
        <div className="track-page">
          <button onClick={() => this.reorderOneAndTwo(playlist)}>
            Reorder track 1 & 2
          </button>
          <div className="column-header-container">
            <div className="column-header number">#</div>
            <div className="column-header name">Name</div>
            <div className="column-header artist">Artist</div>
            <div className="column-header date">Date added</div>
          </div>
          <div className="track-list">{this.renderTracks(playlist.items)}</div>
        </div>
      </div>
    );
  }
}

export default TrackList;
