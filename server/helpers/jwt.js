const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const generateToken = (payload) => {
  return jwt.sign(payload, secret)
}

const verifyToken = (payload) => {
  return jwt.verify(payload, secret)
}

module.exports = { generateToken, verifyToken }