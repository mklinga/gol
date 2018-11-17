import React from 'react';
import './DraggableShip.css';

export default props => {
  const serializeShipData = ({ name, data }) => {
    return JSON.stringify({ name: name, items: data });
  };

  const onDragStart = ev => {
    const { data } = props;
    ev.dataTransfer.setData('text/plain', serializeShipData(data));
  };

  const { data: { data: pattern, name } } = props;
  return (
    <div className='draggable-ship-container' draggable onDragStart={onDragStart}>
      <span>{name}</span>
      <div className='draggable-ship-tiles'>
        {
          pattern.map((row, rowIndex) => (
            <div className='draggable-ship-tiles-row'>
              {
                row.map((column, columnIndex) =>
                  <span
                    key={`${rowIndex}${columnIndex}${column}`}
                    className={`draggable-ship-tile ${column ? 'on' : 'off'}`}
                  >&nbsp;</span>)
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};
