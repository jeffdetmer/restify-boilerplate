import version from '../version'

describe('VERSION route', () => {
  describe('GET', () => {
    it('returns 204', () => {
      const req = {}
      const res = {}
      const next = jest.fn()
      res.send = jest.fn()

      version.get(req, res, next)
      expect(res.send.mock.calls.length).toBe(1)
      expect(res.send).toBeCalledWith({appVersion: '1.0.0'})
      expect(next.mock.calls.length).toBe(1)
    })
  })
})
