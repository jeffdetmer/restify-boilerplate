import logger from '../logger'

describe('Logger', () => {
  it('should return bunyan logger object', () => {
    expect(typeof logger).toBe('object')
  })
  it('should provide default logging methods', () => {
    expect(logger.warn).toBeDefined()
    expect(logger.info).toBeDefined()
    expect(logger.debug).toBeDefined()
    expect(logger.error).toBeDefined()
  })
})
