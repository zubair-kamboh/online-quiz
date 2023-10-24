const asynHandler = require('express-async-handler')
const { TeacherAuthModel } = require('../models/TeacherAuthModel')
const StudentAuthModel = require('../models/StudentAuthModel')
const StudentEnrollmentModel = require('../models/StudentEnrollmentModel')
const TutorEnrollmentModel = require('../models/TutorEnrollmentModel')
const { default: mongoose } = require('mongoose')

// Tutor Enrollment
// Route: /management/get-tutor-requests
const manageTutorRequest = asynHandler(async (req, res) => {
  const enrollments = await TeacherAuthModel.find({
    teacherstatus: false,
  })
    .populate({ path: 'enrollment' })
    .select('-address')
    .select('-school')
    .select('-password')
    .select('-teacherstatus')

  res.status(200).json(enrollments)
})

// Accept Enrollment Request
// Route: /management/accept-request
const acceptTutorRequest = asynHandler(async (req, res) => {
  const { email } = req.body

  const statusChanged = await TeacherAuthModel.findOneAndUpdate(
    { email },
    {
      teacherstatus: true,
    }
  )

  if (!statusChanged) {
    res.status(404)
    throw new Error('Tutor not found with that email!')
  }

  if (statusChanged) {
    res.status(200).json({ successMsg: 'Tutor status has been updated' })
  }
})

// Decline Enrollment Request
// Route: /management/decline-request
const declineTutorRequest = asynHandler(async (req, res) => {
  const { email, id } = req.body
  const newId = mongoose.Types.ObjectId(id)

  const deletedTutor = await TeacherAuthModel.findOneAndDelete({ email })
  const deletedEnrollments = await TutorEnrollmentModel.deleteMany({
    teacherId: newId,
  })

  if (!deletedTutor) {
    res.status(404)
    throw new Error('Tutor not found with that email!')
  }

  if (!deletedEnrollments) {
    res.status(404)
    throw new Error('Tutor enrollments have not been deleted!')
  }

  res
    .status(200)
    .json({ successMsg: 'Tutor & their Enrollments has been deleted!' })
})

// Management Courses
// Route: /management/courses
const courseTutors = asynHandler(async (req, res) => {
  const tutors = await TeacherAuthModel.find({ teacherstatus: true }).populate({
    path: 'enrollment',
    select: 'subjects grades -_id',
  })

  res.json(tutors)
})

// Statistics - Subjects Data
// Route: /management/stats/subjects-data
// GET
const subjectsData = asynHandler(async (req, res) => {
  const enrollments = await TutorEnrollmentModel.find()
    .populate({
      path: 'teacherId',
      select: 'fullname -_id',
    })
    .select('grades subjects -_id')

  if (!enrollments) {
    res.status(404)
    throw new Error('No enrollments found')
  }

  res.json(enrollments)
})

// Statistics - No of Tutors Each Day
// Route: /management/stats/tutors-each-day
// GET
const tutorsEachDay = asynHandler(async (req, res) => {
  const { days } = req.body

  if (!days) {
    res.status(404)
    throw new Error('Please select a day!')
  }

  const enrollment = await TutorEnrollmentModel.find({ days })

  res.json({ tutors: enrollment.length })
})

// Statistics - No of Students Attending Each Session
// Route: /management/stats/students-attendants
// GET
const studentsAttendants = asynHandler(async (req, res) => {
  const { session } = req.body

  if (!session) {
    res.status(404)
    throw new Error('Please select a time/session!')
  }

  const students = await StudentEnrollmentModel.find({ time: session })

  res.json({ students: students.length })
})

module.exports = {
  manageTutorRequest,
  acceptTutorRequest,
  declineTutorRequest,
  courseTutors,
  tutorsEachDay,
  studentsAttendants,
  subjectsData,
}
