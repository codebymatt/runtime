import React, { Component } from 'react';

import './Metrics.sass';

class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="metrics-container">
        <h2>Metrics</h2>
        <div className="metrics-wrapper">
          <div className="chart-wrapper" />
          <div className="chart-controls" />
        </div>
      </div>
    );
  }
}

export default Metrics;
