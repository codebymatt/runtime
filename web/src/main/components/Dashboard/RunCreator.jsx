import React from 'react';

import './RunCreator.sass';

const RunCreator = () => (
  <div className="create-wrapper">
    <div className="create-inputs">
      <div className="input-row-1">
        <div className="input-wrapper">
          <label>Date</label>
          <input className="date-wrapper" placeholder="Today" />
        </div>
        <div className="input-wrapper">
          <label>Distance (km)</label>
          <input className="distance-wrapper" placeholder="5.5" />
        </div>
        <div className="time-inputs">
          <div className="input-wrapper">
            <label>Minutes</label>
            <input placeholder="19" />
          </div>
          <div className="input-wrapper">
            <label>Seconds</label>
            <input placeholder="30" />
          </div>
        </div>
        <div className="input-wrapper submit-wrapper">
          <label />
          <div className="submit-button">Add Run</div>
        </div>
      </div>
      {/* <div className="input-row-2">
        <div className="submit-wrapper">
          <div className="submit-button">Add Run</div>
        </div>
      </div> */}
      {/* <div className="input-row-2">
      </div> */}
    </div>
  </div>
);

export default RunCreator;
