import errors from 'restify-errors'
import {
  send200,
  send201,
  send204,
  send400,
  send404,
  send500,
} from '../rest-helper'

const req = {}
const res = {}
let next

describe('rest-helper', () => {
  beforeEach(() => {
    req.params = {}
    next = jest.fn()
    res.send = jest.fn()
  })

  describe('send200', () => {
    it('should call res.send with a valid body when called with an object', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: {
          firstName: 'John',
        },
      }
      send200(res, next, {firstName: 'John'})

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an array of length 1', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: [
          {
            firstName: 'John',
          },
        ],
      }
      send200(res, next, [{firstName: 'John'}])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an array of length greater than 1', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: [
          {
            firstName: 'John',
          },
          {
            firstName: 'Jane',
          },
        ],
      }
      send200(res, next, [{firstName: 'John'}, {firstName: 'Jane'}])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an empty array', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: [],
      }
      send200(res, next, [])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an empty object', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: {},
      }
      send200(res, next, {})

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with a string', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: 'John',
      }
      send200(res, next, 'John')

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with no data', () => {
      expect.assertions(3)

      const expected = {
        status: 200,
        message: '',
        data: {},
      }
      send200(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(expected)
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('send201', () => {
    it('should call res.send with a valid body when called with an object', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: {
          firstName: 'Jeff',
        },
      }
      send201(res, next, {firstName: 'Jeff'})

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an array of length 1', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: [
          {
            firstName: 'John',
          },
        ],
      }
      send201(res, next, [{firstName: 'John'}])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an array of length greater than 1', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: [
          {
            firstName: 'John',
          },
          {
            firstName: 'Jane',
          },
        ],
      }
      send201(res, next, [{firstName: 'John'}, {firstName: 'Jane'}])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an empty array', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: [],
      }
      send201(res, next, [])

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with an empty object', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: {},
      }
      send201(res, next, {})

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a valid body when called with no data', () => {
      expect.assertions(3)

      const expected = {
        status: 201,
        message: '',
        data: {},
      }
      send201(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(201, expected)
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('send204', () => {
    it('should call res.send with a 204 status', () => {
      expect.assertions(3)

      send204(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(204)
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('send400', () => {
    it('should call res.send with a 400 status with a custom error', () => {
      expect.assertions(3)

      const expected = {
        status: 400,
        error: {message: 'Hello'},
        data: {},
      }

      send400(res, next, {message: 'Hello'})

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(400, expected)
      expect(next.mock.calls.length).toBe(1)
    })

    it('should call res.send with a 400 status with default error', () => {
      expect.assertions(3)
      const expected = {
        status: 400,
        error: new errors.BadRequestError(),
        data: {},
      }

      send400(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(400, expected)
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('send404', () => {
    it('should call res.send with a 404 status', () => {
      expect.assertions(3)

      const expected = {
        status: 404,
        error: new errors.NotFoundError(),
        data: {},
      }

      send404(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(404, expected)
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('send500', () => {
    it('should call res.send with a 500 status and valid body when passed an error', () => {
      expect.assertions(4)

      const err = new errors.InternalServerError('This is an error')
      const expected = {
        status: 500,
        error: err,
        data: {},
      }

      send500(res, next, err)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(500, expected)
      expect(next.mock.calls.length).toBe(1)
      expect(next).toBeCalledWith()
    })

    it('should call res.send with a 500 status and valid body when not passed an error', () => {
      expect.assertions(4)
      const expected = {
        status: 500,
        error: new errors.InternalServerError(),
        data: {},
      }

      send500(res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(500, expected)
      expect(next.mock.calls.length).toBe(1)
      expect(next).toBeCalledWith()
    })
  })
})
