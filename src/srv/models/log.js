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
    })
    
    Log.hasMany(models.User,{
        foreignKey: 'userId',
    })
   
    Log.hasOne(models.Logitem, {
       foreignKey: 'logId',
       onDelete: 'CASCADE',
   })
    models.Logitem.belongsTo (Log, {
        foreignKey: 'logId',
    })
  };
  return Log;
};