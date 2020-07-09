const { User, Follower, Tag } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/bcrypt')
const { Op } = require('sequelize')

class UserController {

  static getUserLoggedData (req, res, next) {
    console.log('kesini loggeduser')
    User.findOne({
      where: { id: req.currentUserId },
      attributes:['id', 'name', 'username', 'email',
      'user_image', 'cover_image', 'biodata', 'phone_number', 
      'status', 'createdAt', 'updatedAt'], include: [Tag] })
    .then(data => {
      return res.status(200).json({
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        user_image: data.user_image,
        cover_image: data.cover_image,
        biodata: data.biodata,
        phone_number: data.phone_number,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        Tags: data.Tags
      })
    })
    .catch(err)
  }

  static register (req, res, next) {    

    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    User
    .create(payload)
    .then(data => {
      console.log('success')
      const access_token = generateToken({ id: data.id, username: data.username, email: data.email })
      return res.status(201).json({
        id: data.id,
        username: data.username,
        access_token
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login (req, res, next) {
    const { username, password } = req.body
    User.findOne({ where: { username } })
    .then(data => {
      if (data) {
        if (data.status == false) {
          return next({
              name: 'BadRequest',
              errors: [{ message: 'Your Account has been Banned.' }]
            })
        } else {
          if (verifyPassword(password,data.password)) {
            const payload = {
              id: data.id,
              username: data.username,
              email: data.email
            }
            const access_token = generateToken(payload)
            return res.status(200).json({
              id: data.id,
              username: data.username,
              access_token
            })
          } else {
            next({
              name: 'BadRequest',
              errors: [{ message: 'Invalid Email/Password.' }]
            })
          }
        }
      } else {
          next({
            name: 'BadRequest',
            errors: [{ message: 'Invalid Email/Password.' }]
          })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static findOne (req, res, next)  {
    let user = {}
    let followers = []
    let following = []
    const { username } = req.params
    User.findOne({ 
      where: { username },
      attributes:
      ['id', 'name', 'username', 'email',
      'user_image', 'cover_image', 'biodata', 'phone_number', 
      'status', 'createdAt', 'updatedAt'], include: [Tag] })
    .then(data => {
      if (data) {
        user = data
        return Follower.findAll({ where: { followedId: data.id },
        include: [{model: User, as: 'follower'}] })
      } else{
        next({
          name: 'NotFound',
          errors: [{ message: 'User not Found.' }]
        })
      }
    })
    .then(data => {
      if(data) {
        followers = data
        return Follower.findAll({ where: { followerId: user.id } })
      } else {
        return Follower.findAll({ where: { followerId: user.id } })
      }
    })
    .then(data => {
      if(data) {
        following = data
        return res.status(200).json({ result: { user, followers, following } })
      } else {
        return res.status(200).json({ result: { user, followers, following } })
      }
    })
    .catch(err => {
      console.log(err)
      // next(err)
    })

  }

  static findUser (req, res, next)  {
    const { username } = req.query
    User.findAll({ 
      where: { username: { [Op.like]: '%'+username+'%' } },
      attributes: ['id', 'name', 'username', 'email',
      'user_image', 'cover_image', 'biodata', 'phone_number', 
      'status', 'createdAt', 'updatedAt'] })
    .then(data => {
      console.log(data)
      if (data) {
        return res.status(200).json(data)
      } else{
        next({
          name: 'NotFound',
          errors: [{ message: 'User not Found.' }]
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static editProfile (req, res, next) {
    const { email, user_image, cover_image, name } = req.body
    User.update({ email,user_image,cover_image,name }, { where: { id: req.currentUserId } })
    .then(data => {
      return res.status(201).json({ message: 'Profile Edited.' })
    })
    .catch(err => {
      next(err)
    })
  }

  static banStatus (req, res, next) {
    const { status, userId } = req.body
    User.update({ status }, { where: { id: userId } })
    .then(data => {
      return res.status(201).json({ message: 'Profile Edited.' })
    })
    .catch(err => {
      next(err)
    })
  }

  static topUpBallance (req, res, next) {
    const { ballance } = req.body
    User.findOne({ where: { id: req.currentUserId } })
    .then(data => {
      return User.update({ ballance: data.ballance + ballance }, { where: { id: req.currentUserId } })
    })
    .then(data => {
      res.status(201).json({ message: 'Top Up Success.' })
    })
    .catch(err => next(err))
  }

  static giveTips () {
    const { ballance, targetId } = req.body
    User.findOne({ where: { id: req.currentUserId } })
    .then(data => {
      return User.update({ ballance: data.ballance - ballance }, { where: { id: req.currentUserId } } )
    })
    .then(data => {
      return User.findOne({ where: { id: targetId } })
    })
    .then(data => {
      return User.update({ ballance: data.ballance + ballance },{ where: { id: data.id } })
    })
    .then(data => {
      return res.status(201).json({ message: 'Tips Sent.' })
    })
  }
}

module.exports = UserController