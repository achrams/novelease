const router = require('express').Router()
const user = require('./user')
const follow = require('./follow')
const tag = require('./tag')


router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Connected to Server Side.'
  })
})

router.use('/users', user)
router.use('/follow', follow)
router.use('/tags', tag)
module.exports = router