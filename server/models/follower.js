'use strict';
module.exports = (sequelize, DataTypes) => {
  
  class Follower extends sequelize.Sequelize.Model{}

  Follower.init({
    notification: DataTypes.BOOLEAN ,
    followedId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (Follower, options) => {
        Follower.published = false
      }
    }, sequelize });
  Follower.associate = function(models) {
    Follower.belongsTo(models.User, { as: 'followed' })
    Follower.belongsTo(models.User, { as: 'follower' })
    // associations can be defined here
  };
  return Follower;
};