const router = require('express').Router()
const Authentication = require('../middlewares/Auth').Authentication
const ProfileAuthorization = require('../middlewares/Auth').ProfileAuthorization
const UserController = require('../controllers/UserController')

router.get('/logged', Authentication, UserController.getUserLoggedData)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/:username', UserController.findOne)
router.put('/edit/:id', Authentication, ProfileAuthorization, UserController.editProfile)
router.put('/topup', Authentication,UserController.topUpBallance)
router.put('/tip', Authentication,UserController.giveTips)

module.exports = router