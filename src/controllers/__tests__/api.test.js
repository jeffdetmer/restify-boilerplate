import errors from 'restify-errors'
import api from '../api'
import User from '../../models/user'

jest.mock('../../models/user')

const req = {}
const res = {}
let next

describe.skip('api', () => {
  beforeEach(() => {
    req.query = {}
    next = jest.fn()
    res.send = jest.fn()
    User.read = jest.fn()
    User.insert = jest.fn()
  })

  describe('api::get', () => {
    it('executes successfully', async () => {
      expect.assertions(4)

      req.query.locnNbr = 9
      req.query.itemBrcd = '1234'
      User.read.mockReturnValue({})
      await api.get(req, res, next)
      expect(User.read.mock.calls.length).toBe(1)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith({
        data: {},
        message: '',
        status: 200,
      })
      expect(next.mock.calls.length).toBe(1)
    })

    it('returns an error without the correct input', async () => {
      expect.assertions(4)

      await api.get(req, res, next)

      expect(User.read.mock.calls.length).toBe(0)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(500, {
        data: {},
        error: new errors.InternalServerError(),
        status: 500,
      })
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('api::post', () => {
    it('accepts a valid space restervation', async () => {
      expect.assertions(5)
      req.body = {
        locnNbr: 9,
        itemBrcd: '29',
      }

      res.setHeader = jest.fn()
      req.contentType = jest.fn().mockReturnValue('application/json')
      User.insert.mockReturnValue({
        locnNbr: 9,
        itemBrcd: '29',
      })

      await api.post(req, res, next)

      expect(User.insert.mock.calls.length).toBe(1)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.setHeader).toBeCalledWith('Content-Type', 'application/json')
      expect(res.send).toBeCalledWith(201, {
        data: {
          locnNbr: 9,
          itemBrcd: '29',
        },
        message: '',
        status: 201,
      })
      expect(next.mock.calls.length).toBe(1)
    })

    it('errors on an invalid input', () => {
      expect.assertions(5)
      req.body = {
        fullName: 'Jeff Detmer',
        age: 29,
      }

      res.setHeader = jest.fn()
      req.contentType = jest.fn().mockReturnValue('application/json')

      api.post(req, res, next)
      expect(User.insert.mock.calls.length).toBe(0)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.setHeader).toBeCalledWith('Content-Type', 'application/json')
      expect(res.send).toBeCalledWith(400, {
        data: {},
        error: new errors.InvalidContentError(),
        status: 400,
      })
      expect(next.mock.calls.length).toBe(1)
    })
  })
  describe('api::error', () => {
    it('throws an error', () => {
      expect.assertions(2)

      api.error(req, res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(400, {
        data: {},
        error: new errors.RestError('This is expected'),
        status: 400,
      })
    })
  })
})
