module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    key: DataTypes.STRING,
    points: DataTypes.NUMERIC,
    active: DataTypes.BOOLEAN
  },{});

user.associate = models => {
    user.belongsToMany (models.Logitem, {
        through: 'Logs'
    }),
    user.hasMany (models.Log, {
        foreignKey: 'userId'
    })
};  

return user;
};