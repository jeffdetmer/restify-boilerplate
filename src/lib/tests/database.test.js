import database from '../database';

describe('Oracle', () => {
  it('should return sworm db object', () => {
    expect(typeof database).toBe('object');
    expect(database.connect).toBeDefined();
    expect(database.query).toBeDefined();
  });
});
