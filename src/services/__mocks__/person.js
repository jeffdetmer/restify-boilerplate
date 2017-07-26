const get = jest.fn((data) => Promise.resolve(data));
const save = jest.fn((data) => Promise.resolve(data));

export default { get, save };
