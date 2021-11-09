// Configuration for the sequelize-cli database automation

require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "./dev_db.sqlite"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./prod_db.sqlite"
  }
}