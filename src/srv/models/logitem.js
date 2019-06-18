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
  });
  Logitem.associate = function(models) {
    Logitem.belongsTo(models.Log,{
        foreignKey: 'logId',
    })
    Logitem.hasMany(models.Log)
  };
  return Logitem;
};