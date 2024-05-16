const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Endpoint to get the quiz for a selected course
router.post('/quiz/', userController.getQuiz)

// Endpoint to calculate and return user's score for a selected course
router.post('/score', userController.calculateScore)
router.get('/all', userController.allUsers)

module.exports = router
