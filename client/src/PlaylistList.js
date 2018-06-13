import React from "react";
import "./PlaylistList.css";

export default ({ playlists }) => {
  const renderedPlaylists = playlists.map((pl, index) => (
    <div className="playlist" key={index}>
      <div
        className="playlist-image"
        style={{ backgroundImage: `url(${pl.images[0].url})` }}
      />
      <div className="playlist-info">
        <p className="playlist-name">{pl.name}</p>
        <p className="playlist-author">{pl.owner.display_name}</p>
      </div>
    </div>
  ));

  return <div className="playlists-container">{renderedPlaylists}</div>;
};
