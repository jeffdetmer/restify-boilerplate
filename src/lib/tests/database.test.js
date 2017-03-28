import database from '../database';

describe('Oracle', () => {
  it('should return sworm db object', () => {
    expect(database.connect).toBeDefined();
  });
});
