// eslint-disable-next-line max-classes-per-file
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

export {
  UnauthorizedError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
};
