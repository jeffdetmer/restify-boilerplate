import api from '../api';

const req = {};
const res = {};
let next;

describe('api', () => {
  beforeEach(() => {
    req.params = {};
    next = jest.fn();
    res.send = jest.fn();
  });

  describe('api::get', () => {
    it('executes successfully', () => {
      expect.assertions(2);

      api.get(req, res, next);

      expect(res.send.mock.calls.length).toBe(1);
      expect(next.mock.calls.length).toBe(1);
    });
  });

  describe('api::post', () => {
    it('accepts a valid person', () => {
      expect.assertions(4);
      req.body = {
        name: 'Jeff Detmer',
        age: 29,
      };

      res.setHeader = jest.fn();
      req.contentType = jest.fn().mockReturnValue('application/json');

      api.post(req, res, next);

      expect(res.send.mock.calls.length).toBe(1);
      expect(res.setHeader).toBeCalledWith('Content-Type', 'application/json');
      expect(res.send).toBeCalledWith(201, {
        data: { age: 29, batchNbr: undefined, name: 'Jeff Detmer' },
        message: null,
        status: 201,
      });
      expect(next.mock.calls.length).toBe(1);
    });

    it('errors on an invalid person', () => {
      expect.assertions(4);
      req.body = {
        fullName: 'Jeff Detmer',
        age: 29,
      };

      res.setHeader = jest.fn();
      req.contentType = jest.fn().mockReturnValue('application/json');

      api.post(req, res, next);

      expect(res.send.mock.calls.length).toBe(1);
      expect(res.setHeader).toBeCalledWith('Content-Type', 'application/json');
      expect(res.send).toBeCalledWith(201, {
        data: { age: 29, name: 'Jeff Detmer' },
        message: null,
        status: 201,
      });
      expect(next.mock.calls.length).toBe(1);
    });
  });
});
