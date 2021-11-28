'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('quotes',[
      {
        user_name: 'sales',
        total: 120,
        status: 'draft',
        cust_email: 'customer1@customerdomain.com',
        customer: 'Test customer 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 190,
        status: 'draft',
        cust_email: 'customer2@customerdomain.com',
        customer: 'Test customer 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 1120,
        status: 'draft',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Test customer 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 10000,
        status: 'draft',
        cust_email: 'customer4@customerdomain.com',
        customer: 'Test customer 4',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {
      
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quotes', null, {});
  }
};
