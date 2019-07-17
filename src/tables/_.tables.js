import Sequelize from 'sequelize';

import RestaurantDefinition from './Restaurant.table';
import SightingDefinition from './Sighting.table';

const database = (process.env.NODE_ENV === 'prod') ? process.env.PROD_SQL_DATABASE : process.env.DEV_SQL_DATABASE;
const host = (process.env.NODE_ENV === 'prod') ? process.env.PROD_SQL_HOST : process.env.DEV_SQL_HOST;
const password = (process.env.NODE_ENV === 'prod') ? process.env.PROD_SQL_PWD : process.env.DEV_SQL_PWD;
const user = (process.env.NODE_ENV === 'prod') ? process.env.PROD_SQL_USER : process.env.DEV_SQL_USER;

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    host,
    dialect: process.env.DIALECT,
  },
);

const db = {
  Restaurant: RestaurantDefinition(sequelize, Sequelize),
  Sighting: SightingDefinition(sequelize, Sequelize),
};

Object.keys(db).forEach((tableName) => {
  if ('associate' in db[tableName]) {
    db[tableName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
