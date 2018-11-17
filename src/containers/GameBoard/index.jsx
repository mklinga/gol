import React from 'react';
import { connect } from 'react-redux';

import { nextGeneration, toggleTile, addPattern } from '../../modules/game/actions';
import { getRunningStatus, getTurnSpeed } from '../../modules/game/reducers';

import Tile from '../../components/Tile';

import './GameBoard.css';

export class GameBoard extends React.Component {
  constructor (props) {
    super(props);
    this.loopId = null;

    this.onDrop = this.onDrop.bind(this);
  }

  componentWillReceiveProps (newProps) {
    // The main game loop is initialized here
    //
    // If we receive truthy 'running' with props and we are not currently running the loop
    // (based on this.loopId), we'll launch it up.
    //
    // We also handle the opposite case here, where we recieve falsy 'running' prop and the loop
    // is already running. In that case, we shut it down and reset the this.loopId

    const turnSpeedHasChanged = this.props.turnSpeed !== newProps.turnSpeed;

    if (newProps.running && this.loopId === null) {
      this.props.nextGeneration();
      this.loopId = window.setInterval(this.props.nextGeneration, newProps.turnSpeed);
    } else if (newProps.running && turnSpeedHasChanged) {
      window.clearInterval(this.loopId);
      this.loopId = window.setInterval(this.props.nextGeneration, newProps.turnSpeed);
    } else if (!newProps.running && this.loopId !== null) {
      window.clearInterval(this.loopId);
      this.loopId = null;
    }
  }

  onDragOver (ev) {
    ev.preventDefault();
  }

  onDrop (x, y) {
    const { addPattern } = this.props;
    return function (ev) {
      ev.preventDefault();

      try {
        const serializedData = ev.dataTransfer.getData('text/plain');
        const { items: pattern } = JSON.parse(serializedData);

        addPattern({ pattern, x, y });
      } catch (e) {
        console.error(e);
      }
    };
  }

  render () {
    const { rows, columns, data } = this.props.game;
    const { toggleTile } = this.props;

    return (
      <div id='game-board'>
        {
          Array.from({ length: rows }).map((_, rowIndex) => (
            <div className='row' key={rowIndex}>
              {
                Array.from({ length: columns }).map((_, columnIndex) => (
                  <Tile
                    onClick={toggleTile}
                    onDrop={this.onDrop(columnIndex, rowIndex)}
                    onDragOver={this.onDragOver}
                    id={rowIndex * columns + columnIndex}
                    key={rowIndex + columnIndex}
                    state={data[rowIndex * columns + columnIndex]}
                  />))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  running: getRunningStatus(state),
  turnSpeed: getTurnSpeed(state)
});

const mapDispatchToProps = dispatch => ({
  addPattern: options => dispatch(addPattern(options)),
  nextGeneration: () => dispatch(nextGeneration()),
  toggleTile: (id) => dispatch(toggleTile(id))
});

const ConnectedGameBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default ConnectedGameBoard;
