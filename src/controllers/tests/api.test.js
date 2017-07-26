import api from '../api';
import person from '../../services/person';

jest.mock('../../services/person');

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
    it('executes successfully', async () => {
      expect.assertions(4);

      req.params.name = 'Jeff';
      await api.get(req, res, next);
      expect(person.get.mock.calls.length).toBe(1);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.send).toBeCalledWith({
        data: req.params.name,
        message: '',
        status: 200,
      });
      expect(next.mock.calls.length).toBe(1);
    });

    it('returns an error', async () => {
      expect.assertions(4);

      await api.get(req, res, next);

      expect(person.get.mock.calls.length).toBe(1);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.send).toBeCalledWith(500, {
        data: {},
        message: 'Internal Server Error',
        status: 500,
      });
      expect(next.mock.calls.length).toBe(1);
    });
  });

  describe('api::post', () => {
    it('accepts a valid person', async () => {
      expect.assertions(5);
      req.body = {
        name: 'Jeff Detmer',
        age: 29,
      };

      res.setHeader = jest.fn();
      req.contentType = jest.fn().mockReturnValue('application/json');

      await api.post(req, res, next);

      expect(person.save.mock.calls.length).toBe(1);
      expect(res.send.mock.calls.length).toBe(1);
      expect(res.setHeader).toBeCalledWith('Content-Type', 'application/json');
      expect(res.send).toBeCalledWith(201, {
        data: { age: 29, name: 'Jeff Detmer' },
        message: '',
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
      expect(res.send).toBeCalledWith(400, {
        data: {},
        message: 'Invalid Person',
        status: 400,
      });
      expect(next.mock.calls.length).toBe(1);
    });
  });
});
