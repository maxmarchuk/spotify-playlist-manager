import React, { Component } from 'react';
import './MusicControlButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicControlButton extends Component {
  handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.action(() => {
      console.log(this.props.refresh);
    });
  };
  render() {
    const { icon } = this.props;
    return (
      <div>
        <FontAwesomeIcon icon={icon} onClick={this.handleClick} />
      </div>
    );
  }
}
export default MusicControlButton;
