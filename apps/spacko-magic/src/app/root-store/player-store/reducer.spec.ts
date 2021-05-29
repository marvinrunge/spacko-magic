import { playerReducer } from './reducer';
import { PlayerState, initialPlayerState } from './state';

describe('PlayerReducer', () => {
  it('should return the default state', () => {
    const action: any = {};
    const result: PlayerState = playerReducer(undefined, action);
    expect(result).toEqual(initialPlayerState);
  });
});
