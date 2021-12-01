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
        employee_name: 'billy',
        user_name: 'billy',
        password: await bcrypt.hashSync('billy', 10),
        address: '1234, billy st. billy, IL',
        role: 'sales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'bob',
        user_name: 'bob',
        password: await bcrypt.hashSync('bob', 10),
        address: '1234, bob st. bob, IL',
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
        employee_name: 'joe',
        user_name: 'joe',
        password: await bcrypt.hashSync('joe', 10),
        address: '1234, joe st. joe, IL',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'dave',
        user_name: 'dave',
        password: await bcrypt.hashSync('dave', 10),
        address: '1234, dave st. dave, IL',
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
        employee_name: 'susan',
        user_name: 'susan',
        password: await bcrypt.hashSync('susan', 10),
        address: '1234, susan st. susan, IL',
        role: 'accountant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'emily',
        user_name: 'emily',
        password: await bcrypt.hashSync('emily', 10),
        address: '1234, emily st. emily, IL',
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
      },
      {
        employee_name: 'ryan',
        user_name: 'ryan',
        password: await bcrypt.hashSync('ryan', 10),
        address: '1234, ryan st. ryan, IL',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'matt',
        user_name: 'matt',
        password: await bcrypt.hashSync('matt', 10),
        address: '1234, matt st. matt, IL',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'beto',
        user_name: 'beto',
        password: await bcrypt.hashSync('beto', 10),
        address: '1234, beto st. beto, IL',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_name: 'fareed',
        user_name: 'fareed',
        password: await bcrypt.hashSync('fareed', 10),
        address: '1234, fareed st. fareed, IL',
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
