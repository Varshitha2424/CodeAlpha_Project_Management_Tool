import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';

export function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    jwtConfig.accessTokenSecret,
    { expiresIn: jwtConfig.accessTokenExpiresIn }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      tokenType: 'refresh',
    },
    jwtConfig.accessTokenSecret,
    { expiresIn: jwtConfig.refreshTokenExpiresIn }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, jwtConfig.accessTokenSecret);
}

export const generateToken = generateAccessToken;
