'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    day: DataTypes.STRING
  },{
    userId: DataTypes.NUMERIC
  }
);
  Log.associate = function(models) {
    Log.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    }) };
  return Log;
};