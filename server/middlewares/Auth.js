const { verifyToken } = require('../helpers/jwt')
const { User, Tag } = require('../models')

class Auth {

  static Authentication (req, res, next) {
    console.log('Authentication....')
    if (req.headers.access_token) {
      const payload = verifyToken(req.headers.access_token)
      req.currentUserId = payload.id
      console.log('Authenticated')
      return next()
    } else {
      next({ message: 'Unauthenticated' })
    }
  }

  static Admin (req, res, next) {
    
  }
  
   static ProfileAuthorization (req, res, next) {
    User
    .findOne({ where: { id: req.params.id } })
    .then(data => {
      if (data.id === req.currentUserId) next()
      else next({ message: 'Unauthorized.' })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Auth