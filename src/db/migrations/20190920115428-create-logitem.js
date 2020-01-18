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
        type: Sequelize.STRING,
        get: function() {
            return moment.utc(this.getDataValue('startAt')).format('HH:MM')
        }
      },
      breakOut: {
        type: Sequelize.STRING,
        get: function() {
            return moment.utc(this.getDataValue('breakOut')).format('HH:MM')
        }
      },
      breakIn: {
        type: Sequelize.STRING,
        get: function() {
            return moment.utc(this.getDataValue('breakIn')).format('HH:MM')
        }
      },
      endAt: {
        type: Sequelize.STRING,
        get: function() {
            return moment.utc(this.getDataValue('endAt')).format('HH:MM')
        }
      },
      logId:{
           type: Sequelize.INTEGER,
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