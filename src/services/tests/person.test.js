import { person } from '../index';

describe('person service', () => {
  it('person::get works', async () => {
    const expected = 'hello';

    await expect(person.get(expected)).resolves.toEqual(expected);
  });

  it('person::save works', async () => {
    const expected = 'hello';

    await expect(person.save(expected)).resolves.toEqual(expected);
  });
});
