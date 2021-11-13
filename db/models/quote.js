//this data base will be used to generate the table for quotes

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({employee}) {
      // define association here
      this.belongsTo(employee, {foreignKey:'user_name'})
    }
  };
  quote.init({
    line_items: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model:'employees',
        key:'user_name'
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type:DataTypes.STRING,
      defaultValue: "",
    },
    secret: {
      type:DataTypes.STRING,
      defaultValue: "",
    },
    cust_email: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    customer: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'quote',
  });
  return quote;
};