// Configuration for the sequelize-cli database automation

require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "databases": {
      "hq_db": {
        "username": process.env.LEGACY_DB_USER,
        "password": process.env.LEGACY_DB_PASS,
        "database": process.env.LEGACY_DB_NAME,
        "storage": "./dev_db.sqlite",
        "dialect": "sqlite"
      },

      "legacy_db": {
        "username": process.env.LEGACY_DB_USER,
        "password": process.env.LEGACY_DB_PASS,
        "database": process.env.LEGACY_DB_NAME,
        "host": process.env.LEGACY_DB_HOST,
        "dialect": process.env.LEGACY_DB_DIALECT
      }
    }
  },
    "hq_db": {
      "storage": "./dev_db.sqlite",
      "dialect": "sqlite"
    }
}