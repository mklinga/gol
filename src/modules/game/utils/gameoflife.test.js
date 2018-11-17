/* eslint-env jest */
import { addPatternToData } from './gameoflife';

describe('reducer/index', () => {
  describe('addPatternToData', () => {
    it('Should set correct columns to data based on pattern', () => {
      const getInitialState = () => ({
        data: [ 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
        columns: 3,
        rows: 3
      });

      const testPatterns = [
        {
          x: 0,
          y: 0,
          pattern: [ [ 1, 0 ], [ 1, 0 ] ],
          expected: [ 1, 0, 0, 1, 0, 1, 0, 1, 0 ]
        },
        {
          x: 1,
          y: 1,
          pattern: [ [ 1, 0 ], [ 1, 0 ] ],
          expected: [ 0, 1, 0, 1, 1, 0, 0, 1, 0 ]
        },
        {
          x: 2,
          y: 2,
          pattern: [ [ 1 ] ],
          expected: [ 0, 1, 0, 1, 0, 1, 0, 1, 1 ]
        }
      ];

      testPatterns.forEach(({ x, y, pattern, expected }) => {
        const result = addPatternToData(getInitialState(), { x, y, pattern });
        expect(result).toEqual(expected);
      });
    });

    it('Should not draw over the data boundaries', () => {
      const getInitialState = () => ({
        data: [ 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
        columns: 3,
        rows: 3
      });

      const testPatterns = [
        {
          x: 0,
          y: 0,
          pattern: [ [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ], [ 1 ] ],
          expected: [ 1, 1, 0, 1, 0, 1, 1, 1, 0 ]
        },
        {
          x: 0,
          y: 0,
          pattern: [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ],
          expected: [ 1, 1, 1, 1, 0, 1, 0, 1, 0 ]
        },
        {
          x: 2,
          y: 2,
          pattern: [ [ 1, 0 ], [ 1, 0 ] ],
          expected: [ 0, 1, 0, 1, 0, 1, 0, 1, 1 ]
        }
      ];

      testPatterns.forEach(({ x, y, pattern, expected }) => {
        const result = addPatternToData(getInitialState(), { x, y, pattern });
        expect(result).toEqual(expected);
      });
    });
  });
});
