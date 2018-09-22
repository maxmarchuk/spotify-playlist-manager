import React, { Component } from 'react';
import './MusicControlButton.css';

class MusicControlButton extends Component {
  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.action();
  };
  render() {
    const { type } = this.props;
    return (
      <i
        tabIndex={0}
        className={`fa fa-${type} music-control-button`}
        onClick={this.handleClick}
      />
    );
  }
}
export default MusicControlButton;
