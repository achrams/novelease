'use strict';
const { generatePassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  
  User.init({
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already Exist.'
      },
      validate: {
        notEmpty: {
          args: true,
          message: 'Username Required.'
        },
        notNull: {
          args: true,
          msg: 'Username Required.'
        },
        checkLength (value) {
          if (value.length < 1 || value.length > 12) {
            throw new Error('Username length must between 5 or 12 Characters.')
          }
        }
      }
    },
    name: { 
      type: DataTypes.STRING, 
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already Exist.'
      },
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email Required.'
        },
        isEmail: {
          args: true,
          msg: "Invalid Email Input."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Required.'
        },
        len: {
          args: [4, 18],
          msg: 'Password length must between 4 or 18 Characters.'
        }
      }
    },
    biodata: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    ballance: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    user_image: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, { 
    hooks: {
      beforeCreate: (user,options) => {
        user.name = user.username
        user.phone_number = '-'
        user.biodata = '-'
        user.user_image = 'http://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg'
        user.cover_image = 'https://wallpapercave.com/wp/vlZRB2n.jpg'
        user.password = generatePassword(user.password)
        user.ballance = 0
        user.status = true
      }
    }, sequelize });
  User.associate = function(models) {
    User.hasMany(models.Story)
    User.hasMany(models.Tag)
    User.belongsToMany(models.User,{ through: models.Follower, as: 'followed', foreignKey: 'followedId' })
    User.belongsToMany(models.User,{ through: models.Follower, as: 'follower', foreignKey: 'followerId' })
  };
  return User;
};