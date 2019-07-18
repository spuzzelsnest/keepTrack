module.exports = (sequelize, DataTypes) => {
  const logitem = sequelize.define('Logitem', {
id:{ type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true 
  }},{
    startAt: DataTypes.STRING
  },{
    breakOut: DataTypes.STRING
  },{
    breakIn: DataTypes.STRING
  },{
    endAt: DataTypes.STRING
  },{
    logId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
}},{});

logitem.associate = models => {

    logitem.belongsTo(models.Log,{
        foreignKey: 'logId'
    })
    
  };
  return logitem;
};