import * as services from '../index'

describe('Services', () => {
  it('returns a list of apis', () => {
    expect(typeof services).toBe('object')
  })
})
