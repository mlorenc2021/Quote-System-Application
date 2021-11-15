bcrypt = require('bcrypt');

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('employees',[
      {
        employee_name: 'sales',
        user_name: 'sales',
        password: await bcrypt.hashSync('sales', 10),
        address: '1234, sales st. sales, IL',
        role: 'sales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'manager',
        user_name: 'manager',
        password: await bcrypt.hashSync('manager', 10),
        address: '1234, manager st. manager, IL',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'accountant',
        user_name: 'accountant',
        password: await bcrypt.hashSync('accountant', 10),
        address: '1234, accountant st. accountant, IL',
        role: 'accountant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'admin',
        user_name: 'admin',
        password: await bcrypt.hashSync('admin', 10),
        address: '1234, admin st. admin, IL',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {
      
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
