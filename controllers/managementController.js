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
  const { subjects } = req.body

  if (!subjects) {
    res.status(404)
    throw new Error('No Subject Attached!')
  }

  const enrollments = await TutorEnrollmentModel.find({ subjects })
    .populate({
      path: 'teacherId',
      select: 'fullname email -_id',
    })
    .select('date method time -_id')

  if (!enrollments.length > 0) {
    res.status(404)
    throw new Error('No enrollments found')
  }

  res.json(enrollments)
})

// Statistics - Send Avaiable Dates
// Route: /management/stats/tutors-available-dates
// GET
const sendTutorsAvailabilityDates = asynHandler(async (req, res) => {
  const enrollment = await TutorEnrollmentModel.find().select('date -_id')

  if (!enrollment.length > 0) {
    res.status(404)
    throw new Error('No Tutor Found For Any Date!')
  }

  res.json(enrollment)
})
// Statistics - No of Tutors Each Day
// Route: /management/stats/tutors-each-day
// POST
const tutorsEachDay = asynHandler(async (req, res) => {
  const { date } = req.body

  if (!date) {
    res.status(404)
    throw new Error('Please select a date!')
  }

  const enrollment = await TutorEnrollmentModel.find({ date })
    .populate({
      path: 'teacherId',
      select: 'fullname email -_id',
    })
    .select('date method time -_id')

  if (!enrollment.length > 0) {
    res.status(404)
    throw new Error('No Tutor Found For This Date!')
  }

  res.json(enrollment)
})

// Statistics - No of Students Attending Each Session
// Route: /management/stats/students-attendants
// GET
const studentsAttendants = asynHandler(async (req, res) => {
  const students = await StudentEnrollmentModel.find().populate('studentId')

  const result = students.reduce((acc, item) => {
    const { tutor, subjects, date, time } = item
    const key = tutor + subjects + date + time
    const existingItem = acc.find((entry) => entry.key === key)

    if (existingItem) {
      existingItem.totalStudents++
    } else {
      acc.push({
        tutor,
        subjects,
        date,
        time,
        totalStudents: 1,
        key,
      })
    }

    return acc
  }, [])

  const formattedResult = result.map((item) => ({
    tutor: item.tutor,
    subjects: item.subjects,
    date: item.date,
    time: item.time,
    totalStudents: item.totalStudents,
  }))

  res.json(formattedResult)
})

// Statistics - No of Questions Answered by Each Tutor
// Route: /management/stats/questions-answered
// GET
const questionsAnswered = asynHandler(async (req, res) => {
  const students = await StudentEnrollmentModel.find({
    $or: [{ timer: { $gt: 0 } }],
  })

  const tutorCounts = {}
  students.forEach((item) => {
    const { tutor } = item
    if (tutorCounts[tutor]) {
      tutorCounts[tutor].timerCount++
    } else {
      tutorCounts[tutor] = { tutor, timerCount: 1 }
    }
  })

  const resultArray = Object.values(tutorCounts)

  res.json(resultArray)
})

// Get All Students
// Route: /management/students
// GET
const getStudents = asynHandler(async (req, res) => {
  const students = await StudentAuthModel.find()

  if (!students) {
    res.status(404)
    throw new Error('No students found')
  }

  res.json(students)
})

// Get All Teachers
// Route: /management/teachers
// GET
const getTeachers = asynHandler(async (req, res) => {
  const teachers = await TeacherAuthModel.find()

  if (!teachers) {
    res.status(404)
    throw new Error('No teadhers found')
  }

  res.json(teachers)
})

// Edit Student
// Route: /management/student/edit
// PUT
const editStudent = asynHandler(async (req, res) => {
  const { studentId, fullname, address, school } = req.body

  if (!studentId || !fullname || !address || !school) {
    res.status(404)
    throw new Error('Please input all fields!')
  }

  const student = await StudentAuthModel.findOneAndUpdate(
    { _id: studentId },
    {
      fullname,
      address,
      school,
    }
  )

  if (!student) {
    res.status(404)
    throw new Error('No student found')
  }

  res.json({ successMsg: 'Student updated successfully!' })
})

// Edit Teacher
// Route: /management/teacher/edit
// PUT
const editTeacher = asynHandler(async (req, res) => {
  const { teacherId, fullname, address, school } = req.body

  if (!teacherId || !fullname || !address || !school) {
    res.status(404)
    throw new Error('Please input all fields!')
  }

  const teacher = await TeacherAuthModel.findOneAndUpdate(
    { _id: teacherId },
    {
      fullname,
      address,
      school,
    }
  )

  if (!teacher) {
    res.status(404)
    throw new Error('No teacher found')
  }

  res.json({ successMsg: 'Teacher updated successfully!' })
})

// Delete Student
// Route: /management/student/delete
// DELETE
const deleteStudent = asynHandler(async (req, res) => {
  const { studentId } = req.body

  if (!studentId) {
    res.status(404)
    throw new Error('Please input all fields!')
  }

  const student = await StudentAuthModel.findOneAndDelete({ _id: studentId })
  const deletedStudents = await StudentEnrollmentModel.deleteMany({
    studentId,
  })

  if (!student) {
    res.status(404)
    throw new Error('No student found')
  }

  res.json({ successMsg: 'Student deleted successfully!' })
})

// Delete Teacher
// Route: /management/teacher/delete
// DELETE
const deleteTeacher = asynHandler(async (req, res) => {
  const { teacherId } = req.body

  if (!teacherId) {
    res.status(404)
    throw new Error('Please input all fields!')
  }

  const teacher = await TeacherAuthModel.findOneAndDelete({ _id: teacherId })
  const deletedTeachers = await TutorEnrollmentModel.deleteMany({
    teacherId,
  })

  if (!teacher) {
    res.status(404)
    throw new Error('No teacher found')
  }

  res.json({ successMsg: 'Teacher deleted successfully!' })
})

module.exports = {
  manageTutorRequest,
  acceptTutorRequest,
  declineTutorRequest,
  courseTutors,
  tutorsEachDay,
  studentsAttendants,
  subjectsData,
  sendTutorsAvailabilityDates,
  questionsAnswered,
  getStudents,
  getTeachers,
  editStudent,
  editTeacher,
  deleteStudent,
  deleteTeacher,
}
