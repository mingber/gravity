import React, { Component } from 'react';
import './Gravity.css';

import Universe from './Universe';
import ModeSwitch from './ModeSwitch';

class Gravity extends Component {
  render() {
    return (
      <div className="gravity">
        <Universe />
        <div className="switch">
          <ModeSwitch />
        </div>
      </div>
    );
  }
}

export default Gravity;
