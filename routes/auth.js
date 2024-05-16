const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

// Admin signup endpoint
router.post('/admin/signup', authController.adminSignup)
// Admin signin endpoint
router.post('/admin/signin', authController.adminSignin)

module.exports = router
