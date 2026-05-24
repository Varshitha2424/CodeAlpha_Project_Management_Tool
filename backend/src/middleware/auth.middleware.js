import { verifyToken } from '../services/token.service.js';
import UserModel from '../models/user.model.js';
import ApiError from '../utils/api-error.js';

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authorization token missing.');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    const user = await UserModel.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, 'User not found.');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(new ApiError(401, 'Authentication failed.'));
  }
}
