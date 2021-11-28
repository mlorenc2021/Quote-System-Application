'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('secret_notes', [
      {
        quote_id: 1,
        note: 'Customer wishes a discount rate I cannot approve',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 1,
        note: 'As a manager I can approve this discount!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 2,
        note: 'Customer wishes for a start time before our operating hours',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 2,
        note: 'We are a union shop, they will have to wait',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 3,
        note: 'Customers card was decline last time, watch out!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 4,
        note: 'Door code is 555',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 4,
        note: 'Key is under floor matt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 4,
        note: 'Do not give this customer a discount, they have been repeatedly told they will not get one',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('secret_notes', null, {});
  }
};
