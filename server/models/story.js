'use strict';
module.exports = (sequelize, DataTypes) => {
  
  class Story extends sequelize.Sequelize.Model {}

  Story.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title Required.'
        },
        len: {
          args: [1,50],
          msg: 'Maximum 50 Characters Allowed.'
        }
      }
    },
    cover_image: DataTypes.STRING,
    synopsis: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Synopsis Required.'
        },
        len: {
          args: [1,100],
          msg: 'Maximum 100 Characters Allowed.'
        } 
    }
  },
    published: DataTypes.BOOLEAN,
    likes: DataTypes.INTEGER
  } , { 
    hooks: { 
      beforeCreate: (Story, options) => {
        Story.published = false
      } 
    }, sequelize } );
  Story.associate = function(models) {
    Story.belongsTo(models.User)
  };
  return Story;
};