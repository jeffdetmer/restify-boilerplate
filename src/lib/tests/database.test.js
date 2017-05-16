import database from '../database';

describe('Database', () => {
  it('should provide an api', () => {
    expect.assertions(3);
    expect(typeof database).toBe('object');
    expect(database.connect).toBeDefined();
    expect(database.createConnection).toBeDefined();
  });
});
