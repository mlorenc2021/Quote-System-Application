// This is the model for the customer model
// It is based off of the shcmea given by Dr. Ege
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Model) {
        // define association here
    }

    //Hides the user ID from being returned
    toJSON() {
      return {...this.get(), id: undefined}
    }
  };
  customer.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    contact: {
        type: DataTypes.STRING
    }
  }, {
      sequelize,
      timestamps: false
  });
  return customer;
};