import ping from '../ping'

describe('PING route', () => {
  describe('::GET', () => {
    it('returns 204', () => {
      const req = {}
      const res = {}
      const next = jest.fn()
      res.send = jest.fn()

      ping.get(req, res, next)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith(204)
      expect(next.mock.calls.length).toBe(1)
    })
  })
})
