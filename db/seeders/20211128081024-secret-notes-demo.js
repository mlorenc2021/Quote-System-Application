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
        quote_id: 2,
        note: 'As a manager I can approve this discount!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 3,
        note: 'Customer wishes for a start time before our operating hours',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 4,
        note: 'We are a union shop, they will have to wait',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 5,
        note: 'Customers card was decline last time, watch out!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 6,
        note: 'Door code is 555',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 7,
        note: 'Key is under floor matt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 8,
        note: 'Do not give this customer a discount, they have been repeatedly told they will not get one',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 9,
        note: 'Customer wants to know if you have extra paint',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 10,
        note: 'Customer wishes for an 11pm start time',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 11,
        note: 'Customer was irate that the last time we were out there we didn\'t fix the problem',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 12,
        note: 'Customer is a bakery said lunch is on them',
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
