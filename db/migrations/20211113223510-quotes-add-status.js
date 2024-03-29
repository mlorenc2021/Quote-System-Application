'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quotes', 'status', {
      type: Sequelize.STRING,
      defaultValue: "draft",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('quotes', 'status',);
  }
};
