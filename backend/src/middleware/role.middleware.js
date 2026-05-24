import ApiError from '../utils/api-error.js';

export default function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to access this resource.'));
    }
    next();
  };
}
