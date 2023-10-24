const asyncHandler = require('express-async-handler')
const TutorEnrollmentModel = require('../models/TutorEnrollmentModel')
const StudentEnrollmentModel = require('../models/StudentEnrollmentModel')
const StudentAuthModel = require('../models/StudentAuthModel')
const { default: mongoose } = require('mongoose')

// Get Studet Enrollment
// Route: /student/enrollment/get
// Method: POST
const studentEnrollment = asyncHandler(async (req, res) => {
  const { grades, subjects } = req.body

  if (!grades || !subjects) {
    res.status(400)
    throw new Error('Please include your grade & subjects')
  }

  const data = await TutorEnrollmentModel.find({
    grades: grades,
    subjects: subjects,
  })
    .populate({ path: 'teacherId', select: 'fullname email -_id' })
    .select('-timer -_id -qualifications')

  if (!data || !data.length > 0) {
    res.status(404)
    throw new Error('No Tutor Found')
  }

  res.json(data)
})

// Student Enrollment - Get Tutor Data
// Route: /student/enrollment/get-tutor-data
// Method: POST
const studentEnrollmentTutorData = asyncHandler(async (req, res) => {
  const { grades, subjects, date } = req.body

  if (!grades || !subjects || !date) {
    res.status(400)
    throw new Error('Please include grades, subjects && date')
  }

  const data = await TutorEnrollmentModel.find({
    grades: grades,
    subjects: subjects,
    date,
  })
    .populate({ path: 'teacherId', select: '-_id email' })
    .select('method time -_id')

  if (!data) {
    res.status(404)
    throw new Error('No Tutor Found')
  }

  res.json(data)
})

// Student Enrollment - Fetch Tutor Method & Time
// Route: /student/enrollment/get-tutor-method-time
// Method: POST
const fetchMethodTime = asyncHandler(async (req, res) => {
  const { grades, subjects, date, tutor } = req.body
  console.log(grades, subjects, date, tutor)

  if (!grades || !subjects || !date || !tutor) {
    res.status(400)
    throw new Error('Please include grades, subjects, date & tutor email!')
  }

  const rawData = await TutorEnrollmentModel.find({
    grades: grades,
    subjects: subjects,
    date,
  }).populate({ path: 'teacherId' })

  const data = rawData.filter((enrollment) => {
    return enrollment.teacherId.email === tutor
  })

  if (!data) {
    res.status(404)
    throw new Error('No Tutor Found')
  }

  res.json(data)
})

// Save Studet Enrollment
// Route: /student/enrollment/save
// Method: POST
const studentEnrollmentSave = asyncHandler(async (req, res) => {
  const { grades, subjects, date, tutor, method, time, studentId } = req.body
  console.log(grades, subjects, date, tutor, method, time, studentId)
  const weekDay = generateDay(date)

  if (
    !grades ||
    !subjects ||
    !date ||
    !tutor ||
    !time ||
    !method ||
    !studentId
  ) {
    res.status(400)
    throw new Error('Please include all details')
  }

  const student = await StudentAuthModel.findById(studentId)

  if (!student) {
    res.status(404)
    throw new Error('Student not found')
  }

  const docsve = new StudentEnrollmentModel({
    grades: grades,
    subjects: subjects,
    date: date,
    days: weekDay,
    tutor: tutor,
    method: method,
    time: time,
    method: method,
    studentId,
  })
  await docsve.save()

  if (!docsve) {
    res.status(400)
    throw new Error('Something went wrong!')
  }

  if (docsve) {
    // save enrollment in teacher's table
    const doc = await StudentAuthModel.findOne({ _id: studentId })
    doc.enrollment.push(docsve._id)
    doc.save()
    res.json({ successMsg: 'Student enrollment confirmed!' })
  }
})

// Student Course Portan - Current Courses
// Route: /student/student-course-portal/current-courses
// Method: GET
const currentCourses = asyncHandler(async (req, res) => {
  const { studentId } = req.body
  console.log(studentId)

  if (!studentId) {
    res.status(404)
    throw new Error('Please include an id')
  }

  const sEnrollments = await StudentEnrollmentModel.find({ studentId })
  if (!sEnrollments.length > 0) {
    res.status(404)
    throw new Error('Wrong Id/ No enrollments')
  }

  res.json(sEnrollments)
})

// Student Payment Status
// Route: /student/payment-status
// Method: GET
const paymentStatus = asyncHandler(async (req, res) => {
  const { studentId } = req.body
  // convert string to object
  var id = mongoose.Types.ObjectId(studentId)

  if (!studentId) {
    res.status(400)
    throw new Error('Please include a student ID!')
  }

  const student = await StudentAuthModel.findOne({
    _id: id,
  }).select('paymentstatus')

  if (!student) {
    res.status(400)
    throw new Error('No student found!')
  } else {
    return res.status(200).json(student)
  }
})

function generateDay(date) {
  let weekdayNumber = new Date().getDay(date)
  let weekDay = ''
  if (weekdayNumber === 1) {
    weekDay = 'Monday'
  } else if (weekdayNumber === 2) {
    weekDay = 'Tuesday'
  } else if (weekdayNumber === 3) {
    weekDay = 'Wednesday'
  } else if (weekdayNumber === 4) {
    weekDay = 'Thursday'
  } else if (weekdayNumber === 5) {
    weekDay = 'Friday'
  } else if (weekdayNumber === 6) {
    weekDay = 'Saturday'
  } else {
    weekDay = 'Sunday'
  }

  return weekDay
}

module.exports = {
  studentEnrollment,
  studentEnrollmentSave,
  currentCourses,
  paymentStatus,
  studentEnrollmentTutorData,
  fetchMethodTime,
}
