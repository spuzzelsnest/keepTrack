'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logitem = sequelize.define('Logitem', 
  {
    startAt: DataTypes.TIME
  },{
    breakOut: DataTypes.TIME
  },{
    breakIn: DataTypes.TIME
  },{
    endAt: DataTypes.TIME
  },{
    logId: DataTypes.NUMMERIC
    });
  Logitem.associate = function(models) {

    Logitem.belongsTo(models.Log,{
        foreignKey: 'logId',
    }),
    models.Log.hasOne(Logitem)
  };
  return Logitem;
};