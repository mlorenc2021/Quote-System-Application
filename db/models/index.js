// This file makes our models avalible for use in the rest of our program
// If you need to use any of the models in your code you need to include 
// This whole directory with 
// const { model_name } = require('path/to/db/models');

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};
const databases = Object.keys(config.databases);

for(let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.databases[database];
  // Store the database connection in our db object
  db[database] = new Sequelize( 
    dbPath.database, dbPath.username, dbPath.password, dbPath 
  );
}

/** Add the Database Models  **/
/** Add models from the database 1 directory */
fs
  .readdirSync(__dirname + '/hq_db')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/hq_db', file))(db.hq_db, Sequelize.DataTypes);
    // const model = db.hq_db.import(path.join(__dirname + 'hq_db', file));
    db[model.name] = model;
  });

/** Add models from legacy customer database **/
fs
  .readdirSync(__dirname + '/legacy_db')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/legacy_db', file))(db.legacy_db, Sequelize.DataTypes);
    // const model = db.legacy_db.import(path.join(__dirname + 'legacy_db', file));
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
