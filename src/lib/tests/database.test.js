import database from '../database';

describe('Database', () => {
  it('should provide an api', () => {
    expect.assertions(2);
    expect(typeof database).toBe('object');
    expect(database.getConnection).toBeDefined();
  });
});
