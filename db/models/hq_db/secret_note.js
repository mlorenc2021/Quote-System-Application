'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class secret_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({quote}) {
      // define association here
      this.belongsTo(quote, {
        foreignKey:'id',
        onDelete: 'CASCADE'
      });
    }
  };
  secret_note.init({
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'quotes',
        key:'id'
      }
    },
    note: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'secret_note',
  });
  return secret_note;
};