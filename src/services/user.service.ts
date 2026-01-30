import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';

export const findAllUsers = async () => {
  return User.find().select('-passwordHash').lean();
};

export const findUserById = async (id: string) => {
  return User.findById(id).select('-passwordHash').lean();
};

export const createUser = async (payload: Partial<IUser>) => {
  if (payload.passwordHash) {
    const salt = await bcrypt.genSalt(10);
    payload.passwordHash = await bcrypt.hash(payload.passwordHash, salt);
  }
  const user = new User(payload);
  return user.save();
};

export const updateUser = async (id: string, payload: Partial<IUser>) => {
  if (payload.passwordHash) {
    const salt = await bcrypt.genSalt(10);
    payload.passwordHash = await bcrypt.hash(payload.passwordHash, salt);
  }
  return User.findByIdAndUpdate(id, payload, { new: true }).select('-passwordHash');
};

export const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(id);
};
