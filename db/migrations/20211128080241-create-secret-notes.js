'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('secret_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quote_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'quotes',
          key:'id'
        }
      },
      note: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('secret_notes');
  }
};