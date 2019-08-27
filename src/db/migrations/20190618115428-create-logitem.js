'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logitems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startAt: {
        type: Sequelize.STRING
      },
      breakOut: {
        type: Sequelize.STRING
      },
      breakIn: {
        type: Sequelize.STRING
      },
      endAt: {
        type: Sequelize.STRING
      },
      logId:{
           type: Sequelize.STRING,
           allowNull: false,
           unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logitems');
  }
};