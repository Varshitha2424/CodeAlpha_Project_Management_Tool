export default function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    status: 'error',
    message: err.message || 'Internal server error',
  };

  if (err.details) {
    payload.details = err.details;
  }

  res.status(status).json(payload);
}
