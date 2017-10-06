export default {
  internalError(message) {
    return {
      status: 500,
      code: 'InternalError',
      message: message || 'Internal Server Error',
    }
  },
  validationFailed(message) {
    return {
      status: 400,
      code: 'ValidationFailed',
      message: message || 'Validation Failure',
    }
  },
  generic(code, message) {
    return {status: 400, code: code || 'UnknownError', message}
  },
}
