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
        type: Sequelize.TIME,
        get: function() {
            return moment.utc(this.getDataValue('startAt')).format('hh:mm')
        }
      },
      breakOut: {
        type: Sequelize.TIME,
        get: function() {
            return moment.utc(this.getDataValue('breakOut')).format('hh:mm')
        }
      },
      breakIn: {
        type: Sequelize.TIME,
        get: function() {
            return moment.utc(this.getDataValue('breakIn')).format('hh:mm')
        }
      },
      endAt: {
        type: Sequelize.TIME,
        get: function() {
            return moment.utc(this.getDataValue('endAt')).format('hh:mm')
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