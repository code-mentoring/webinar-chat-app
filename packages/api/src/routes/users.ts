import { Router } from 'express';
import { Op } from 'sequelize';

import { User } from '../models/User';

export const usersRouter = Router();

// CRUD of the User in REST API

// Get list of users
usersRouter.get('/', async (_req, res) => {
  // Fetch ALL the users
  const users = await User.findAll();
  // Send them in the pipe
  res.json(users);
});


// Search for a user
usersRouter.get('/search', async (req, res, next) => {
  const query = req.query.q;
  try {
    const users = await User.findAll({
      where: {
        firstName: { [Op.like]: `%${query}%` }
      }
    });

    res.json(users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName
    })));

  } catch (e) {
    next(e);
  }
});


// Get ONE user
usersRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const user = await User.findByPk(userID);
  res.json(user);
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
