module.exports = (sequelize, DataTypes) => {
  const logitem = sequelize.define('Logitem', {
    startAt: DataTypes.TIME
  },{
    breakOut: DataTypes.TIME
  },{
    breakIn: DataTypes.TIME
  },{
    endAt: DataTypes.TIME
  },{
    logId: DataTypes.NUMMERIC
  },{});

logitem.associate = models => {

    logitem.belongsTo(models.Log,{
        foreignKey: 'logId'
    })
    
  };
  return logitem;
};