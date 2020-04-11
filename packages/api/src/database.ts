import { Sequelize } from 'sequelize-typescript';

const dbOptions = process.env.DATABASE_URL || {
  database: 'chat',
  dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
  username: 'root',
  password: '',
  storage: 'chat.db',
  models: [__dirname + '/models'],
  logging: false
};


// production
// development
// ci / testing

// Communicate to our database
// @ts-ignore
export const sequelize = new Sequelize(dbOptions);
