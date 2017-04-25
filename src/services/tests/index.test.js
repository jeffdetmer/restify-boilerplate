import * as services from '../index';

describe('Controllers', () => {
  it('returns a list of apis', () => {
    expect(typeof services).toBe('object');
  });
});
