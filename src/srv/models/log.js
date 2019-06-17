'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    day: DataTypes.STRING
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Log;
};