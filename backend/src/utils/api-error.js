export default class ApiError extends Error {
  constructor(status = 500, message = 'Internal server error', details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
