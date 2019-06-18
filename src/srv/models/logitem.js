'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logitem = sequelize.define('Logitem', 
  {
    startAt: DataTypes.STRING
  },{
    breakOut: DataTypes.STRING
  },{
    breakIn: DataTypes.STRING
  },{
    endAt: DataTypes.STRING
  },{
    logId: DataTypes.NUMMERIC
    });
  Logitem.associate = function(models) {
    Logitem.belongsTo(models.Log,{
        foreignKey: 'logId',
    })
  };
  return Logitem;
};