const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.get('/:courseId', quizController.getQuizByCourse)
router.post('/', quizController.createQuiz)

module.exports = router
