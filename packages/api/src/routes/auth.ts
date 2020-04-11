import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authRouter = Router();

/**
 * 1. Check if user with email exists (throw error if not)
 * 2. Compare passwords (throw error if incorrect)
 * 3. Generate a new token, and encrypt the user data in the token
 * 4. Send back the token
 */
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find a user by the email
  const user = await User.findOne({
    where: { email }
  });

  const throwError = () => {
    res.status(400);
    res.json({
      error: 'Invalid login credentials'
    });
  };

  if (!user) return throwError();
  if (!bcrypt.compareSync(password, user.password)) return throwError();

  const { password: p, ...userData } = user.toJSON() as User;
  const token = jwt.sign(userData, JWT_SECRET);

  res.json({
    token
  });
});


// Create a user
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { password: plain, ...userData } = req.body;

    // Salt and hash the passwords in the database so they're not stored in plain text
    // 10 is the number of times to encrypt
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(plain, salt);

    const user = new User({
      ...userData, // NOTE: THIS IS DANGEROUS
      password
    });
    await user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
});
