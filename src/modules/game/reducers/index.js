import {
  addPatternToData,
  getClearTable,
  generateRandomTable,
  calculateNeighbours,
  calculateNextStateForCell
} from '../utils/gameoflife';
import {
  ADD_PATTERN,
  TOGGLE_RUNNING,
  NEXT_GENERATION,
  RANDOMIZE_DATA,
  TOGGLE_TILE,
  CHANGE_TURN_SPEED,
  CLEAR_TABLE
} from '../actions';

const defaultState = {
  running: false,
  turnSpeed: 500,
  rows: 20,
  columns: 40,
  data: getClearTable(20 * 40)
};

const changeTileStatus = (data, indexToToggle) => {
  return data.map((item, index) => {
    return (indexToToggle === index) ? !item : item;
  });
};

const calculateNextGeneration = state => {
  const { data, rows, columns } = state;
  const neighbours = data.map(calculateNeighbours(data, rows, columns));
  const nextData = data.map(calculateNextStateForCell(neighbours));
  return { ...state, data: nextData };
};

// Selectors
export const getRunningStatus = state => state.game.running;
export const getTurnSpeed = state => state.game.turnSpeed;

// Reducer
export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NEXT_GENERATION:
      return calculateNextGeneration(state);
    case TOGGLE_TILE:
      return { ...state, data: changeTileStatus(state.data, action.tile) };
    case CHANGE_TURN_SPEED:
      return { ...state, turnSpeed: action.speed };
    case RANDOMIZE_DATA:
      return { ...state, data: generateRandomTable(state.columns * state.rows) };
    case TOGGLE_RUNNING:
      return { ...state, running: !state.running };
    case ADD_PATTERN:
      return { ...state, data: addPatternToData(state, action) };
    case CLEAR_TABLE:
      return { ...state, data: getClearTable(state.columns * state.rows) };
    default:
      return state;
  }
};
