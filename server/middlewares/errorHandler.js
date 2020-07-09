function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeValidationError') {
    const errors = err.errors.map(el => {
      return el.message
    })
    console.log(errors)
    res.status(400).json({
      errors: errors
    })
  } else if (err.name == 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(el => {
      return el.message
    })
    res.status(400).json({
      errors: errors
    })
  } else if (err.name == 'BadRequest') {
    console.log(errors)
    const errors = err.errors.map(el => {
      return el.message
    })
    res.status(400).json({
      errors: errors
    })
  } else if (err.name == 'InternalServerError') {
    const errors = err.errors.map(el => {
      return el.message
    })
    res.status(500).json({
      errors: errors
    })
  } else if (err.name == 'JsonWebTokenError') {
    res.status(500).json({
      errors: [{ message: err.msg }]
    })
  } else if (err.name == 'NotFound') {
    const errors = err.errors.map(el => {
      return el.message
    })
    res.status(404).json({
      errors: errors
    })
  } else if (err.name == 'Unauthenticated') {
    res.status(401).json({
      errors: 'User Unauthenticated.'
    })
  } else if (err.name == 'Unauthorized') {
    res.status(401).json({
      errors: 'User Unauthorized.'
    })
  }
}

module.exports = errorHandler