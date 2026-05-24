import dotenv from 'dotenv';

dotenv.config();

export default {
  accessTokenSecret: process.env.JWT_SECRET || 'supersecretkey',
  accessTokenExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
