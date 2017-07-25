import Config from '../config';

describe('Config', () => {
  it('gets config data', () => {
    expect(typeof Config).toBe('object');
  });

  it('gets config property', () => {
    expect(Config.env).toMatch(/test/i);
  });
});
