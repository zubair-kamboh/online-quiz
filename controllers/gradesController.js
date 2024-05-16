// gradesController.js
const Course = require('../models/course')
const Grade = require('../models/grade')

exports.getIndividualGrades = async (req, res) => {
  try {
    const { courseName, userId } = req.body

    if (!courseName || !userId) {
      return res
        .status(404)
        .json({ error: 'Please include courseName and userId' })
    }

    const course = await Course.findOne({ name: courseName })
    const grades = await Grade.find({ courseId: course._id }).populate('userId')
    res.status(200).json({ grades })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllClassGrades = async (req, res) => {
  try {
    const { courseName } = req.body
    console.log(courseName)
    if (!courseName) {
      return res.status(404).json({ error: 'Please include courseName!' })
    }

    const course = await Course.findOne({ name: courseName })
    const allGradesAndUsers = await Grade.find({
      courseId: course._id,
    }).populate('userId')

    res.status(200).json({ allGradesAndUsers })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
