'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('employees', 'employee_name', {
      allowNull: false,
    });

    await queryInterface.changeColumn('employees', 'user_name', {
      allowNull: false,
    });

    await queryInterface.changeColumn('employees', 'password', {
      allowNull: false,
    });

    await queryInterface.changeColumn('employees', 'address', {
      allowNull: false,
    });

    await queryInterface.changeColumn('employees', 'role', {
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('employees', 'employee_name', {
      allowNull: true,
    });

    await queryInterface.changeColumn('employees', 'user_name', {
      allowNull: true,
    });

    await queryInterface.changeColumn('employees', 'password', {
      allowNull: true,
    });

    await queryInterface.changeColumn('employees', 'address', {
      allowNull: true,
    });

    await queryInterface.changeColumn('employees', 'role', {
      allowNull: true,
    });
  }
};