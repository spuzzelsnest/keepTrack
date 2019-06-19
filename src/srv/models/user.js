'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING
  },{
    email: DataTypes.STRING
  },{
    key: DataTypes.NUMERIC
  },{
    points: DataTypes.NUMERIC
  },{
    active: DataTypes.BOOLEAN
  });
  User.associate = function(models) {
      User.hasMany(models.Log);
      models.Log.belongsTo(User);
  };
User.findeByPK = async login =>{
    let user = await User.findOne({
        where: {key:login},
    })
    return User;
 }
return User;
};