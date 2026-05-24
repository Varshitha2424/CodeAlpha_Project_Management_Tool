import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import TokenModel from '../models/token.model.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from './token.service.js';
import ApiError from '../utils/api-error.js';

const SALT_ROUNDS = 12;

export async function registerUser({ email, password, first_name, last_name, role = 'member' }) {
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'Email address is already registered.');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const userToCreate = { email, password_hash: passwordHash, first_name, last_name, role: role || 'member' };
  const result = await UserModel.create(userToCreate);
  return { id: result.insertId, email, first_name, last_name, role };
}

export async function loginUser(email, password) {
  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await TokenModel.storeRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

export async function refreshAuthToken(refreshToken) {
  const tokenRecord = await TokenModel.findRefreshToken(refreshToken);
  if (!tokenRecord || tokenRecord.revoked_at) {
    throw new ApiError(401, 'Invalid refresh token.');
  }

  const payload = verifyToken(refreshToken);
  const user = await UserModel.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, 'User not found for refresh token.');
  }

  const accessToken = generateAccessToken(user);
  return { accessToken, refreshToken };
}

export async function revokeRefreshToken(refreshToken) {
  await TokenModel.revokeToken(refreshToken);
}
