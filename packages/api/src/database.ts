import { Sequelize } from 'sequelize-typescript';

// Communicate to our database
export const sequelize = new Sequelize({
  database: 'chat',
  dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
  username: 'root',
  password: '',
  storage: 'chat.db',
  models: [__dirname + '/models'],
  logging: false
});
