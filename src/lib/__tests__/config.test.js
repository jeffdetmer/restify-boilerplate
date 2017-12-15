import config from '../config'

describe('Config', () => {
  it('gets config data', () => {
    expect(typeof config).toBe('object')
  })

  it('gets config property', () => {
    expect(config.NODE_ENV).toMatch(/test/i)
  })
})
