'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('quotes',[
      {
        line_items: 'Plant Repair',
        user_name: 'sales',
        price: 120,
        discount: 10,
        status: 'draft',
        secret: 'Customer door key 5555',
        cust_email: 'customer1@customerdomain.com',
        customer: 'Test customer 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        line_items: 'Plant Cleaning',
        user_name: 'sales',
        price: 190,
        discount: 90,
        status: 'draft',
        secret: 'Customer requests 8am start time',
        cust_email: 'customer2@customerdomain.com',
        customer: 'Test customer 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        line_items: 'Heater Repair',
        user_name: 'sales',
        price: 1120,
        discount: 25,
        status: 'draft',
        secret: 'Customer is an asshole',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Test customer 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        line_items: 'Lay foundation for new plant',
        user_name: 'sales',
        price: 10000,
        discount: 25,
        status: 'draft',
        secret: 'customer will try to hit on you',
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
