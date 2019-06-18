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
  } {});
  User.associate = function(models) {
      User.hasMany(Log);
    // associations can be defined here
  };
User.findeByPK = async login =>{
    let user = await User.findOne({
        where: {key:login},
    })
    return User;
 }
return User;
};