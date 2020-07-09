const { Follower, User } = require('../models')

class FollowerController {

  static findAll (req, res, next) {
    const { followedId } = req.params
    Follower.findAll({ where: { followedId }, include: [{ model: User, as: 'follower' }] })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static followUser (req, res, next) {
    const { followedId, followerId } = req.body
    Follower.findOne({ where: { followedId, followerId } })
    .then(data => {
      if(data) return next([{ name: "You're already followed this User."  }])
      else {
        return Follower.add({followedId, followerId})
      }
    })
    .then(data => {
      return res.status(201).json({ message: 'Followed!' })
    })
    .catch(err => next(err))
  }

  static unfollowUser (req, res, next) {
    const { id } = req.body
    Follower.delete({ where: { id } })
    .then(data => { return res.status(201).json({ message: 'Unfollowed!' }) })
    .catch(err => next(err))
  }

}

module.exports = FollowerController