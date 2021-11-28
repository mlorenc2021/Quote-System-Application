'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('line_items', {
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
      label: {
        type: Sequelize.STRING,
        default: ""
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0
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
    await queryInterface.dropTable('line_items');
  }
};