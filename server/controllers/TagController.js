const { Tag } = require('../models')

class TagController {

  static add (req, res, next) {
    let { name } = req.body
    Tag.create({ name: name, UserId: req.currentUserId })
    .then(data => {
      return res.status(201).json({ message: 'Success add new Tag.' })
    })
    .catch(err => {
      console.log(err)
    })
  }

  static delete (req, res, next) {
    let {id} = req.params
    console.log(id)
    Tag.findByPk(id)
    .then((data) => {
      if (data.UserId === req.currentUserId) {
        return Tag.destroy({ where: { id } })
      } else {
        throw new Error({ message: 'Unauthorized' })
      }
    })
    .then(data => {
      return res.status(201).json({ message: 'Tag has been Deleted.' })
    })
    .catch(err => {
      next(err)
      console.log(err)
    })
  }

}

module.exports = TagController