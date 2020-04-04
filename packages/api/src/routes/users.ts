import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const usersRouter = Router();

// CRUD of the User in REST API

// Get list of users
usersRouter.get('/', async (_req, res) => {
  // Fetch ALL the users
  const users = await User.findAll();
  // Send them in the pipe
  res.json(users);
});

// Get ONE user
usersRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const user = await User.findByPk(userID);
  res.json(user);
});

// Create a user
usersRouter.post('/', async (req, res, next) => {
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

// Update a user
usersRouter.patch('/:userID', async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.userID },
      returning: true // TODO: Fix this
    });
    const user = await User.findByPk(req.params.userID);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

// Update a user
usersRouter.delete('/:userID', async (req, res, next) => {
  try {
    User.destroy({
      where: { id: req.params.userID }
    });
    res.json({
      message: 'Successfully deleted user'
    });
  } catch (e) {
    next(e);
  }
});
