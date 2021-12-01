'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('quotes',[
      {
        user_name: 'sales',
        total: 120,
        status: 'draft',
        cust_email: 'customer1@customerdomain.com',
        customer: 'Saveley & Henriot, Co.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'billy',
        total: 190,
        status: 'draft',
        cust_email: 'customer2@customerdomain.com',
        customer: 'UK Collectables, Ltd.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'billy',
        total: 1120,
        status: 'draft',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Reams Paper and Sausage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 10000,
        status: 'draft',
        cust_email: 'customer4@customerdomain.com',
        customer: 'Asus Tech',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'bob',
        total: 120,
        status: 'draft',
        cust_email: 'customer1@customerdomain.com',
        customer: 'Saveley & Henriot, Co.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'bob',
        total: 190,
        status: 'draft',
        cust_email: 'customer2@customerdomain.com',
        customer: 'UK Collectables, Ltd.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'billy',
        total: 1120,
        status: 'draft',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Reams Paper and Sausage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 10000,
        status: 'draft',
        cust_email: 'customer4@customerdomain.com',
        customer: 'Toys4GrownUps.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'bob',
        total: 190,
        status: 'sanctioned',
        cust_email: 'customer2@customerdomain.com',
        customer: 'UK Collectables, Ltd.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'billy',
        total: 1120,
        status: 'sanctioned',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Reams Paper and Sausage',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'billy',
        total: 190,
        status: 'sanctioned',
        cust_email: 'customer2@customerdomain.com',
        customer: 'UK Collectables, Ltd.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'sales',
        total: 1120,
        status: 'finalized',
        cust_email: 'customer3@customerdomain.com',
        customer: 'Reams Paper and Sausage',
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
