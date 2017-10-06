import apierror from '../apierror'

describe('ApiError', () => {
  it('should get all api endpoints', () => {
    expect(typeof apierror).toBe('object')
    expect(Object.keys(apierror).length).toBe(3)
  })

  it('should return a generic error response', () => {
    expect(typeof apierror.generic('hello')).toBe('object')
    expect(typeof apierror.generic()).toBe('object')
  })
  it('should return a internalError error response', () => {
    expect(typeof apierror.internalError('hello')).toBe('object')
    expect(typeof apierror.internalError()).toBe('object')
  })
  it('should return a validationFailed error response', () => {
    expect(typeof apierror.validationFailed('hello')).toBe('object')
    expect(typeof apierror.validationFailed()).toBe('object')
  })
})
