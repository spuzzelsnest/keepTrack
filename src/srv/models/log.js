'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    day: DataTypes.STRING
  },{
    userId: DataTypes.NUMERIC
  }
);
  Log.associate = function(models) {
   
    Log.hasOne(models.Logitem, {
       foreignKey: 'logId',
      
   })
    models.Logitem.belongsTo (Log, {
        foreignKey: 'logId',
         onDelete: 'CASCADE',
    })
  };
  return Log;
};