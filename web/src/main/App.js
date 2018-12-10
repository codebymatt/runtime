import React, { Component } from 'react';
import Landing from './components/Landing'
import './App.sass';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Landing />
      </div>
    );
  }
}

export default App;
