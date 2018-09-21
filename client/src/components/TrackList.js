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
      <div className="track-number">{index}</div>
      <div className="track-name">{name}</div>
      <div className="track-artist">{artist}</div>
      <div className="track-date">{relativeTimeAdded}</div>
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
    const orderedTracks = _.orderBy(tracks, 'added_at', 'desc');
    let inOrder = true;
    _.forEach(tracks, (t, index) => {
      if (t.track.id !== orderedTracks[index].track.id) {
        inOrder = false;
      }
    });

    console.log('in order: ', inOrder);

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
          <div className="column-header-container">
            <div className="track-number">#</div>
            <div className="track-name">Name</div>
            <div className="track-artist">Artist</div>
            <div className="track-date">Date added</div>
          </div>
          <div className="track-list">{this.renderTracks(playlist.items)}</div>
        </div>
      </div>
    );
  }
}

export default TrackList;
