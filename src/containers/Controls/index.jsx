import React from 'react';
import { connect } from 'react-redux';

import { toggleRunning, randomizeData, changeTurnSpeed, clearTable } from '../../modules/game/actions';
import { getRunningStatus } from '../../modules/game/reducers';

import './Controls.css';

export class Controls extends React.Component {
  constructor (props) {
    super(props);
    this.changeSpeed = this.changeSpeed.bind(this);
  }

  changeSpeed (e) {
    const shouldGoFast = e.target.checked;
    this.props.changeTurnSpeed(shouldGoFast ? 250 : 500);
  }

  render () {
    const { running, toggleRunning, randomizeData, clearTable } = this.props;

    return (
      <div id='game-controls'>
        <div className='launch-controls'>
          <button className={running ? 'btn btn-pause' : 'btn btn-launch'} onClick={toggleRunning}>
            { running ? 'Pause' : 'Play' }
          </button>
          <span className='speed-control'>
            <input id='speed-checkbox' type='checkbox' defaultChecked={false} onChange={this.changeSpeed} />
            <label htmlFor='speed-checkbox' >
              Go faster
            </label>
          </span>
        </div>
        <div className='board-actions'>
          <button className='btn btn-text' onClick={randomizeData}>
            Randomize
          </button>
          <button className='btn btn-text' onClick={clearTable}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  running: getRunningStatus(state)
});

const mapDispatchToProps = dispatch => ({
  clearTable: () => dispatch(clearTable()),
  toggleRunning: () => dispatch(toggleRunning()),
  randomizeData: () => dispatch(randomizeData()),
  changeTurnSpeed: (newSpeed) => dispatch(changeTurnSpeed(newSpeed))
});

const ConnectedControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);

export default ConnectedControls;
