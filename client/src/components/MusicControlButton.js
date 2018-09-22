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
    return <div />;
  }
}
export default MusicControlButton;
