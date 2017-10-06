import echo from '../echo'

const req = {}
const res = {}
let next

describe('ECHO route', () => {
  beforeEach(() => {
    req.params = {}
    next = jest.fn()
    res.send = jest.fn()
  })

  describe('GET', () => {
    it('returns what was sent', () => {
      req.params.name = 'this is a test'

      echo.get(req, res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith('this is a test')
      expect(next.mock.calls.length).toBe(1)
    })
  })

  describe('POST', () => {
    it('returns what was sent in body', () => {
      req.body = 'this is a test'
      res.setHeader = jest.fn()
      req.contentType = jest.fn().mockReturnValue('this is a test')

      echo.post(req, res, next)

      expect(res.send.mock.calls.length).toBe(1)
      expect(res.setHeader).toBeCalledWith('Content-Type', 'this is a test')
      expect(res.send).toBeCalledWith(req.body)
      expect(next.mock.calls.length).toBe(1)
    })
  })
})
