import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export const login = async (credentials: Pick<IUser, 'email' | 'passwordHash'>) => {
  const { email, passwordHash } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (user.status !== 'active') {
    throw new Error('User account is inactive');
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET || 'your_default_secret';
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });

  return { token, user: { id: user._id, email: user.email, role: user.role } };
};
