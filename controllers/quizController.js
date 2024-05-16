const Quiz = require('../models/quiz')
const Course = require('../models/course')

exports.getQuizByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId

    const quiz = await Quiz.findOne({ courseId })
    res.status(200).json(quiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createQuiz = async (req, res) => {
  try {
    const {
      courseName,
      quizName,
      questions,
      publishedBy,
      dueDate,
      openingDate,
    } = req.body

    if (!courseName || !quizName || !questions || !dueDate || !openingDate) {
      return res.status(400).json({ message: 'Please include all fields.' })
    }
    // Check if the courseId exists in the database
    const existingCourse = await Course.findOne({ name: courseName })
    if (!existingCourse) {
      return res
        .status(400)
        .json({ message: 'Invalid Course Name. Course does not exist.' })
    }

    // Create a new quiz
    const quiz = new Quiz({
      courseId: existingCourse._id,
      questions,
      publishedBy: 'admin@onlinequiz.com',
      dueDate,
      openingDate,
      quizName,
    })
    await quiz.save()

    res.status(201).json(quiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
