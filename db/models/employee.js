// This is the model view for the employee model
// It is based off of the shcmea for the employees table in the database
bcrypt = require('bcrypt')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({quote}) {
      // define association here
      this.hasMany(quote, {foreignKey:'user_name'})
    }

    //Hides the user ID from being returned
    toJSON() {
      return {...this.get(), id: undefined}
    }
  };
  employee.init({
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'employee',
    hooks: {
      beforeCreate: async (employee) => {
        if(employee.password) {
          employee.password = await bcrypt.hashSync(employee.password, 10);
        }
      },
      beforeUpdate: async (employee) => {
        if(employee.password) {
          employee.password = await bcrypt.hashSync(employee.password, 10);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  employee.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  }
  return employee;
};