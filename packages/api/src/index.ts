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
import { meRouter } from './routes/me';

import { createServer } from 'http';

import io from 'socket.io';
import sockets from './lib/sockets';


const run = async () => {
  // Created an INSTANCE of an API
  const app = express();
  const http = createServer(app);

  /**
   * Each middleware takes 3 parameters
   * 1. Request
   * 2. Response
   * 3. Next
   */
  // Returns a promise
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Sync changes to the database
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
  app.use('/me', middlewareAuth, meRouter);
  app.use('/conversations', middlewareAuth, conversationsRouter);
  app.use('/messages', middlewareAuth, messagesRouter);


  // Initialize socket.io
  const socket = io.listen(http);
  sockets(socket);

  // Running the web server on port 9999
  // app.listen(9999);

  const port = process.env.PORT || 9999;

  http.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
};

run();
