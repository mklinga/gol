export const NEXT_GENERATION = 'NEXT_GENERATION';
export const TOGGLE_RUNNING = 'TOGGLE_RUNNING';
export const RANDOMIZE_DATA = 'RANDOMIZE_DATA';
export const TOGGLE_TILE = 'TOGGLE_TILE';
export const CHANGE_TURN_SPEED = 'CHANGE_TURN_SPEED';
export const ADD_PATTERN = 'ADD_PATTERN';
export const CLEAR_TABLE = 'CLEAR_TABLE';

export const nextGeneration = () => ({ type: NEXT_GENERATION });
export const toggleRunning = () => ({ type: TOGGLE_RUNNING });
export const randomizeData = () => ({ type: RANDOMIZE_DATA });
export const toggleTile = id => ({ type: TOGGLE_TILE, tile: id });
export const changeTurnSpeed = newSpeed => ({ type: CHANGE_TURN_SPEED, speed: newSpeed });
export const addPattern = options => ({ type: ADD_PATTERN, ...options });
export const clearTable = () => ({ type: CLEAR_TABLE });
