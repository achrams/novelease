const router = require('express').Router()
const FollowerController = require('../controllers/FollowerController')
const Authentication = require('../middlewares/Auth').Authentication

router.get('/:id', FollowerController.findAll)

router.post('/up', Authentication, FollowerController.followUser)
router.delete('/down', Authentication, FollowerController.unfollowUser)

module.exports =router