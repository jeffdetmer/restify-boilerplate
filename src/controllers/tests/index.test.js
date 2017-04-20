import controllers from '../index';

describe('Controllers', () => {
  it('returns a list of apis', () => {
    expect(typeof controllers).toBe('object');
  });
});
