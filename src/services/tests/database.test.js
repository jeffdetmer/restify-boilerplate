import { database } from '../index';

describe('database service', () => {
  it('works', () => {
    const expected = 'hello';

    const result = database.get(expected);
    expect(result).toBe(expected);
  });
});
