'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      line_items: {
        type: Sequelize.STRING,
        allowNull: false
        
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model:'employees',
          key:'user_name'
        },
        onDelete: 'cascade'
      },
      total: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('quotes');
  }
};