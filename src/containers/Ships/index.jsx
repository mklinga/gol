import React from 'react';

import PATTERNS from '../../modules/game/utils/patterns';
import DraggableShip from '../../components/DraggableShip';

import './Ships.css';

export default props => (
  <div className='ships-wrapper'>
    {
      PATTERNS.map(pattern => (
        <DraggableShip key={pattern.name} data={pattern} />
      ))
    }
    <p className='help-explainer'>&lt;----- You can drag n' drop these directly to the game board.</p>
  </div>
);
