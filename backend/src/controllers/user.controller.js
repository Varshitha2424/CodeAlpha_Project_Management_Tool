import UserModel from '../models/user.model.js';
import ApiError from '../utils/api-error.js';

export async function getProfile(req, res, next) {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }

    delete user.password_hash;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const updates = { ...req.body };
    delete updates.email;
    delete updates.role;
    delete updates.status;

    await UserModel.updateById(req.user.id, updates);
    const updatedUser = await UserModel.findById(req.user.id);
    delete updatedUser.password_hash;

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await UserModel.getAll();
    users.forEach((user) => delete user.password_hash);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}
