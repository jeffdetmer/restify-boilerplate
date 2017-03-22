import Config from '../config';

describe('Config', () => {
  it('gets config data', () => {
    expect(typeof Config.get('/')).toBe('object');
  });

  it('gets config meta data', () => {
    expect(Config.meta('/')).toMatch(/API configuration file/i);
  });
});
