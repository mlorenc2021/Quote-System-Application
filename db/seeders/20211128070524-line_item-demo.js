'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('line_items', [
      {
        quote_id: 1,
        label: 'Plant Repair',
        price: 10.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 1,
        label: 'Wall Repair',
        price: 12.19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 1,
        label: 'Hearter Repair',
        price: 204.83,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 2,
        label: 'Plant Repair',
        price: 11.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 2,
        label: 'Wall Repair',
        price: 19.19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 3,
        label: 'Hearter Repair',
        price: 204.83,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quote_id: 4,
        label: 'Widget Inspection',
        price: 204349578.83,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('line_items', null, {});
  }
};
