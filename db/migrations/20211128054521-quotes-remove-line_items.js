'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('quotes', 'line_items');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quotes', 'line_items', {
        type: Sequelize.STRING,
        allowNull: false
        
    });
  }
};