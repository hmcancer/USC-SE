class HTTPError extends Error {
  constructor(message, statusCode, details = []) {
    super(message);

    this.statusCode = statusCode || 500;
    this.details = details;
  }

  static notFound(message) {
    return new HTTPError(message, 404);
  }

  static resourceExists(message) {
    return new HTTPError(message, 422);
  }

  static validationFail(details) {
    return new HTTPError('Validation error', 422, details);
  }
}

module.exports = HTTPError;
