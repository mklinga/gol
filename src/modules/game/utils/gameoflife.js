export const getClearTable = tiles => Array.from({ length: tiles }).map(() => false);

export const generateRandomTable = tiles => {
  return Array
    .from({ length: tiles })
    .map(tile => Math.random() < 0.33); // There's a 33% change that the tile will be 'live'
};

const makeIndexLooker = columns => (x, y) => y * columns + x;

export const addPatternToData = (state, { pattern, x, y }) => {
  const { data, columns, rows } = state;
  const getIndexFor = makeIndexLooker(columns);
  const patternHeight = pattern.length;
  const patternWidth = pattern[0].length;
  const newData = [].concat(data);

  // Our pattern might be larger than what fits at the current position, so we cut it off at the border
  const drawWidth = (x + patternWidth > columns) ? (columns - x) : patternWidth;
  const drawHeight = (y + patternHeight > rows) ? (rows - y) : patternHeight;

  for (let i = 0; i < drawWidth; i++) {
    for (let j = 0; j < drawHeight; j++) {
      // set the column based on the pattern
      newData[getIndexFor(x + i, y + j)] = pattern[j][i];
    }
  }

  return newData;
};

const createDataGetter = (data, columns, rows) => {
  const getIndex = makeIndexLooker(columns);
  return (column, row) => {
    // Check the grid limits here, return undefined if we are trying to reach over the grid
    if (column < 0 || column > (columns - 1) || row < 0 || row > (rows - 1)) {
      return undefined;
    }

    return data[getIndex(column, row)];
  };
};

export const calculateNeighbours = (data, rows, columns) => (_, index) => {
  // Calculate the column and row values of the current index
  const column = index % columns;
  const row = Math.floor(index / columns);

  // getCellStatus returns undefined if the data index cannot be found
  const getCellStatus = createDataGetter(data, columns, rows);

  const neighbours = [
    // Upper row
    getCellStatus(column - 1, row - 1),
    getCellStatus(column, row - 1),
    getCellStatus(column + 1, row - 1),

    // Left & Right
    getCellStatus(column - 1, row),
    getCellStatus(column + 1, row),

    // Row below
    getCellStatus(column - 1, row + 1),
    getCellStatus(column, row + 1),
    getCellStatus(column + 1, row + 1)
  ];

  return neighbours.filter(neighbour => neighbour).length;
};

export const calculateNextStateForCell = neighbours => (cell, index) => {
  if (cell) {
    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    return (neighbours[index] === 2 || neighbours[index] === 3);
  } else {
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    return (neighbours[index] === 3);
  }
};
