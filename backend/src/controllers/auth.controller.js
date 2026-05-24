import { validationResult } from 'express-validator';
import { verifyToken } from '../services/token.service.js';
import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, first_name, last_name } = req.body;
  try {
    const result = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user: result });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const refreshToken = (req, res) => {
  const { token } = req.body;
  try {
    const newToken = verifyToken(token);
    res.status(200).json({ message: 'Token refreshed', token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
