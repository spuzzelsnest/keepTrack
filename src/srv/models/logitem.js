module.exports = (sequelize, DataTypes) => {
  const logitem = sequelize.define('Logitem', {
    startAt: DataTypes.STRING
  },{
    breakOut: DataTypes.STRING
  },{
    breakIn: DataTypes.STRING
  },{
    endAt: DataTypes.STRING
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