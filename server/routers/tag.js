const router = require('express').Router()

const TagController = require('../controllers/TagController')
const Authentication = require('../middlewares/Auth').Authentication
const TagAuth = require('../middlewares/Auth').EditTagsAuthorization

router.use(Authentication)
router.post('/add', TagController.add)
router.delete('/delete/:id', TagController.delete)

module.exports = router