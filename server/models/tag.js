'use strict';
module.exports = (sequelize, DataTypes) => {
  class Tag extends sequelize.Sequelize.Model {}

  Tag.init({
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Tag.associate = function(models) {
    Tag.belongsTo(models.User)
  };
  return Tag;
};