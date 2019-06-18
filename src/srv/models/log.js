'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    day: DataTypes.STRING
  },
    {});
  Log.associate = function(models) {
    log.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    }) };
  return Log;
};