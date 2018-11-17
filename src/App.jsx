import React from 'react';

import GameBoard from './containers/GameBoard';
import Controls from './containers/Controls';
import Ships from './containers/Ships';

import './App.css';

function App (props) {
  return (
    <div id='app'>
      <Controls />
      <GameBoard />
      <Ships />
    </div>
  );
}

export default App;
