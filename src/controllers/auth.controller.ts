import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const { token, user } = await authService.login({ email, passwordHash: password });
    res.status(200).json({ token, user });
  } catch (error) {
    // Ensure error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(401).json({ message: errorMessage });
  }
};
