// userController.js

const Quiz = require('../models/quiz')
const Course = require('../models/course')
const Grade = require('../models/grade')
const User = require('../models/user')

exports.getQuiz = async (req, res) => {
  try {
    const { courseName } = req.body
    const course = await Course.findOne({ name: courseName })
    const quiz = await Quiz.find({ courseId: course._id })
    if (!quiz) {
      return res
        .status(404)
        .json({ message: 'Quiz not found for the selected course' })
    }
    res.status(200).json(quiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.calculateScore = async (req, res) => {
  try {
    const { courseId, userId, quizId } = req.body
    console.log(courseId, userId, quizId, req.body.answers)
    const submittedAnswers = req.body.answers
    const quiz = await Quiz.findOne({ _id: quizId, courseId })

    if (!quiz) {
      return res
        .status(404)
        .json({ message: 'Quiz not found for the selected course' })
    }

    // Check if the user has already attempted the quiz
    const existingGrade = await Grade.findOne({ userId, quizId })
    if (existingGrade) {
      return res
        .status(400)
        .json({ message: 'User has already attempted this quiz' })
    }

    let correctAnswers = 0
    quiz.questions.forEach((question, index) => {
      if (submittedAnswers[index] == question.correctAnswerIndex) {
        correctAnswers++
      }
    })

    const totalQuestions = quiz.questions.length
    const score = (correctAnswers / totalQuestions) * 100

    const finalGradesObj = new Grade({
      courseId,
      userId,
      score,
      totalQuestions,
      correctAnswers,
      submitDate: new Date(),
      quizId,
    })

    await finalGradesObj.save()

    res.status(200).json({ message: 'Quiz Submitted!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (users) {
      return res.status(200).json(users)
    }
    if (!users) {
      return res.status(404).json({ message: 'no users found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
