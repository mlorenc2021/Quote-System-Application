require('dotenv').config();
const Sequelize = require('sequelize');
const writeFileSync = require('fs');

const db = new Sequelize(
    process.env.LEGACY_DB_NAME, 
    process.env.LEGACY_DB_USER, 
    process.env.LEGACY_DB_PASS, {
        host: process.env.LEGACY_DB_HOST,
        dialect: process.env.LEGACY_DB_DIALECT
});

db.authenticate().then(() =>{
    console.log("COnnection successful!");
}).catch((err) => {
    console.log("Error connecting to database!");
});

const customer = db.define('customer', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    city: {
        type: Sequelize.DataTypes.STRING
    },
    street: {
        type: Sequelize.DataTypes.STRING
    },
    contact: {
        type: Sequelize.DataTypes.STRING
    }

}, {
    timestamps: false
});

customer.findAll({raw:true}).then( res => {
    console.log(res);
}).catch((err) => {
    console.log("We got an error");
});


console.log("Another task!");