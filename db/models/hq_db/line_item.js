'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class line_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({quote}) {
      // define association here
      this.belongsTo(quote, {foreignKey:'id'});
    }
  };
  line_item.init({
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'quotes',
        key:'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      default: ""
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'line_item',
  });
  return line_item;
};