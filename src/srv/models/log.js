module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('Log',{
    id: {   type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true },
    day: DataTypes.STRING,
    userId: DataTypes.NUMERIC
  },{});
  
log.associate = function(models) {
   
    log.belongsTo(models.User,{
        foreignKey: 'userId'
    }),
    log.hasOne(models.Logitem,{
        foreignKey: 'logId'
    })
  };
  return log;
};