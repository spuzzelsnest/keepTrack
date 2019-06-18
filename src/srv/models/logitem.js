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
  }
      {});
  Logitem.associate = function(models) {
    Logitem.belongsTo(models.log,{
        foreignKey: 'logId',
    })
    Logitem.hasMany(models.log)
  };
  return Logitem;
};