const bcrypt = require('bcrypt')

const salt = 10

const generatePassword = (password) => {
  return bcrypt.hashSync(password, salt)
}

const verifyPassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword)
}

module.exports = { generatePassword, verifyPassword }