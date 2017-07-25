import { person } from '../index';

describe('person service', () => {
  it('works', () => {
    const expected = 'hello';

    const result = person.get(expected);
    expect(result).toBe(expected);
  });
});
