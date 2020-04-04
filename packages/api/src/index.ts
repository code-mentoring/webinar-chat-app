import express from 'express';
import cors from 'cors';

import { middlewareLogger } from './middleware/logger';
import { usersRouter } from './routes/users';
import { conversationsRouter } from './routes/conversations';
import { sequelize } from './database';
import bodyParser from 'body-parser';
import { messagesRouter } from './routes/messages';
import { authRouter } from './routes/auth';
import { middlewareAuth } from './middleware/auth';

const run = async () => {
  // Created an INSTANCE of an API
  const app = express();

  /**
   * Each middleware takes 3 parameters
   * 1. Request
   * 2. Response
   * 3. Next
   */
  // Returns a promise
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sync changes to the database
    console.log('Successfully connected to database');
  } catch (e) {
    console.log('Could not connect to database');
    console.log(e);
  }

  // const users = await User.findAll();
  // console.log(users);


  // Use the middleware for ALL requests (Includes get, post, put, any url)
  app.use(cors());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(middlewareLogger);

  // Defining a NEW PIPE
  app.use('/auth', authRouter);
  app.use('/users', middlewareAuth, usersRouter);
  app.use('/conversations', middlewareAuth, conversationsRouter);
  app.use('/messages', middlewareAuth, messagesRouter);

  // Running the web server on port 9999
  app.listen(9999);
  console.log('API running on http://localhost:9999');
};

run();
