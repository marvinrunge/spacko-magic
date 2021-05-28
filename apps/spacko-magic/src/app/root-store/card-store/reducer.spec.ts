import { cardReducer } from './reducer';
import { CardState, initialCardState } from './state';

describe('CardReducer', () => {
  it('should return the default state', () => {
    const action: any = {};
    const result: CardState = cardReducer(undefined, action);
    expect(result).toEqual(initialCardState);
  });
});
