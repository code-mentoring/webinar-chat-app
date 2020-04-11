import { Sequelize } from 'sequelize-typescript';

const dbOptions = {
  models: [__dirname + '/models'],
  logging: false
};

// Communicate to our database
// @ts-ignore
export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, dbOptions)
  : new Sequelize({
    ...dbOptions,
    database: 'chat',
    dialect: 'sqlite', // Change to mysql, postgres, mariadb, etc
    username: 'root',
    password: '',
    storage: 'chat.db'
  });
