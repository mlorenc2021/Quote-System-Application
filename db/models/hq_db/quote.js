//this data base will be used to generate the table for quotes

'use strict';
const {
  Model
} = require('sequelize');
const secret_note = require('./secret_note');
module.exports = (sequelize, DataTypes) => {
  class quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({employee, line_item, secret_note}) {
      // define association here
      this.belongsTo(employee, {foreignKey:'user_name'});
      this.hasMany(line_item, {foreignKey:'id'});
      this.hasMany(secret_note, {foreignKey:'id'});
    }
  };
  const quote_def = {
    user_name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model:'employees',
        key:'user_name'
      }
    },
    total: {
      type:DataTypes.DECIMAL,
      defaultValue: 0 
    },
    status: {
      type:DataTypes.STRING,
      defaultValue: "draft",
    },
    cust_email: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    customer: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  };
  return quote.init(quote_def, {
    sequelize,
    modelName: 'quote',
  });
};