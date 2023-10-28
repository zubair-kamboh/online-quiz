const { payment } = require('../controllers/payrmentController')

const router = require('express').Router()

router.post('/', payment)

module.exports = router
