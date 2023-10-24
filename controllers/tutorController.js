const asynHandler = require('express-async-handler')
const { TeacherAuthModel } = require('../models/TeacherAuthModel')
const StudentAuthModel = require('../models/StudentAuthModel')
const TutorEnrollmentModel = require('../models/TutorEnrollmentModel')
const StudentEnrollmentModel = require('../models/StudentEnrollmentModel')

// Tutor Enrollment
// Route: /tutor/enrollment
// Method: POST
const tutorEnrollment = asynHandler(async (req, res) => {
  const { grades, subjects, date, method, time, qualifications, teacherId } =
    req.body

  if (
    (!grades || !subjects || !date || !method || !time,
    !qualifications || !teacherId)
  ) {
    res.status(500)
    throw new Error('all fields are required!')
  }

  if (!teacherId) {
    res.status(500)
    throw new Error('no teacher id attached!')
  }

  const teacher = await TeacherAuthModel.findOne({ teacherId })

  if (!teacher) {
    res.status(404)
    throw new Error('Teacher does not exist')
  }

  // Create a new Enrollment document
  const enrollment = new TutorEnrollmentModel({
    grades,
    subjects,
    date,
    method,
    time,
    qualifications,
    teacherId,
  })

  const enrollmentSaved = await enrollment.save()

  if (enrollmentSaved) {
    const doc = await TeacherAuthModel.findOne({ _id: teacherId })
    doc.enrollment.push(enrollmentSaved._id)
    doc.save()
    res.json({ successMsg: 'Tutor enrollment saved!', tutor: doc })
  }
})

// Tutor Enrollment
// Route: /tutor/enrollment
// Method: GET
const listTutorEnrollments = asynHandler(async (req, res) => {
  const data = await TutorEnrollmentModel.find({}).populate({
    path: 'teacherId',
  })

  res.json(data)
})

// Courses Portal - Courses Tutoring
// Route: /tutor/course-portal/courses-tutoring
// Method: GET
const coursesTutoring = asynHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error('No email attached')
  }

  const courses = await TeacherAuthModel.find({ email })
    .populate({
      path: 'enrollment',
      select: 'grades subjects -_id',
    })
    .select('-_id fullname email')

  if (courses.length > 0) {
    res.status(200).json(courses)
  } else {
    res.status(404)
    throw new Error('wrong email or no course enrollment')
  }
})

// Courses Portal - Total Students Enrolled
// Route: /tutor/course-portal/total-students-enrolled
// Method: GET
const totalStudentsEnrolled = asynHandler(async (req, res) => {
  const { tutorEmail } = req.body

  if (!tutorEmail) {
    res.status(400)
    throw new Error('No tutor email attached')
  }

  const students = await StudentEnrollmentModel.find({ tutor: tutorEmail })

  if (students.length > 0) {
    res.status(200).json({ students: students.length })
  } else {
    res.status(404)
    throw new Error('wrong email or no course enrollment')
  }
})

// Courses Portal - Average Students Enrolled
// Route: /tutor/course-portal/average-students-enrolled
// Method: GET
const averageStudentsEnrolled = asynHandler(async (req, res) => {
  const { tutorEmail, tutorId } = req.body

  if (!tutorEmail || !tutorId) {
    res.status(400)
    throw new Error('No tutor email or id attached')
  }

  const students = await StudentEnrollmentModel.find({ tutor: tutorEmail })

  if (!students) {
    res.status(404)
    throw new Error('No students found!')
  }

  if (students.length > 0) {
    const totalStudents = students.length
    const totalCourses = 0

    const courses = await TutorEnrollmentModel.find({
      teacherId: tutorId,
    }).distinct('subjects')

    res.status(200).json({ averageStudents: totalStudents / courses.length })
  } else {
    res.status(404)
    throw new Error('wrong email or no course enrollment')
  }
})

// Courses Portal - Average Time to Answer Students
// Route: /tutor/course-portal/average-time
// Method: GET
const averageTime = asynHandler(async (req, res) => {
  const { tutorEmail, tutorId } = req.body

  if (!tutorEmail || !tutorId) {
    res.status(400)
    throw new Error('No tutor email or id attached')
  }

  const students = await StudentEnrollmentModel.find({ tutor: tutorEmail })

  if (students.length > 0) {
    const totalStudents = students.length
    const totalTime = 0
    // totaltime / totalstudnets

    const time = await TutorEnrollmentModel.aggregate([
      { $group: { _id: null, total: { $sum: '$timer' } } },
    ])

    res.json({ averageTime: time[0].total / totalStudents })
  }
})

// Tutorial Portal - Get Students
// Route: /tutor/tutorial-portal/get-students
// Method: POST
const getStudents = asynHandler(async (req, res) => {
  const { teacherEmail, subjects, grades } = req.body
  console.log(teacherEmail, subjects, grades)
  if (!teacherEmail || !subjects || !grades) {
    res.status(400)
    throw new Error('No teacher email, grades or subjects attached')
  }

  const student = await StudentEnrollmentModel.find({
    tutor: teacherEmail,
    subjects,
    grades,
  })
    .populate({ path: 'studentId', select: 'fullname' })
    .select('subjects grades')

  if (!student || student.length == 0) {
    res.status(400)
    throw new Error('No student found')
  }

  res.json(student)
})

// Tutorial Portal - Save Time & Question - When End Button Clicks
// Route: /tutor/tutorial-portal/save-time-question
// Method: POST
const saveTimeAndQuestion = asynHandler(async (req, res) => {
  const { timer, tutorEmail, studentEnrollmentID, question } = req.body
  if (!timer || !tutorEmail || !studentEnrollmentID || !question) {
    res.status(400)
    throw new Error('Time, Tutor Id, Question and Enrollment Id is requered!')
  }

  const doc = await StudentEnrollmentModel.findOneAndUpdate(
    {
      _id: studentEnrollmentID,
      tutorEmail: tutorEmail,
    },
    {
      timer,
      question,
    }
  )

  if (!doc) {
    res.status(400)
    throw new Error('No Student Found!')
  }

  res.json({ successMsg: 'Timer and question saved in db' })
})

// Tutorial Portal - Delete Student If Absent
// Route: /tutor/tutorial-portal/delete-absent-student
// Method: DELETE
const deleteAbsentStudent = asynHandler(async (req, res) => {
  const { studentId, grades, subjects } = req.body
  if (!studentId || !grades || !subjects) {
    res.status(400)
    throw new Error('No studentID, grades and subjects attached!')
  }

  const doc = await StudentEnrollmentModel.findOneAndDelete({
    studentId,
    grades,
    subjects,
  })

  if (!doc) {
    res.status(400)
    throw new Error('No student found')
  }

  const newDoc = await StudentAuthModel.updateOne(
    { _id: studentId },
    {
      $pullAll: {
        enrollment: [{ _id: doc._id }],
      },
    }
  )

  res.json({ successMsg: 'Student successfully deleted!' })
})

// Get Tutor Profile
// Route: /tutor/get-profile
// Method: POST
const getTutorProfile = asynHandler(async (req, res) => {
  const { tutorId } = req.body
  if (!tutorId) {
    res.status(400)
    throw new Error('No id attached!')
  }

  const doc = await TeacherAuthModel.findOne({
    _id: tutorId,
  }).select('fullname _id address school email teacherstatus')

  if (!doc) {
    res.status(400)
    throw new Error('No tutor found')
  }

  res.json(doc)
})

module.exports = {
  tutorEnrollment,
  listTutorEnrollments,
  coursesTutoring,
  getStudents,
  saveTimeAndQuestion,
  deleteAbsentStudent,
  totalStudentsEnrolled,
  averageStudentsEnrolled,
  averageTime,
  getTutorProfile,
}
