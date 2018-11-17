import React from 'react';

import './Tile.css';

export default props => {
  const { state, onClick, onDrop, onDragOver, id } = props;
  const classNames = `tile ${state ? 'on' : 'off'}`;

  return <span onDrop={onDrop} onDragOver={onDragOver} onClick={() => onClick(id)} className={classNames} />;
};
