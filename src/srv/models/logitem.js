'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logitem = sequelize.define('Logitem', {
    startAt: DataTypes.STRING
  }, {});
  Logitem.associate = function(models) {
    // associations can be defined here
  };
  return Logitem;
};