import React, { Component } from 'react';
import './RunList.sass';
import RunCreator from './RunCreator';

class RunList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="runlist-container">
        <RunCreator />
        <div className="run-list" />
      </div>
    );
  }
}

export default RunList;
