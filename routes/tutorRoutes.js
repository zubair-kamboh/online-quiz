const {
  tutorEnrollment,
  listTutorEnrollments,
  coursesTutoring,
  getCourses,
  getStudents,
  saveTimeAndQuestion,
  deleteAbsentStudent,
  totalStudentsEnrolled,
  averageStudentsEnrolled,
  averageTime,
} = require('../controllers/tutorController')

const router = require('express').Router()

router.post('/enrollment', tutorEnrollment)
router.get('/enrollment', listTutorEnrollments)
router.get('/course-portal/courses-tutoring', coursesTutoring)
router.get('/tutorial-portal/get-students', getStudents)
router.post('/tutorial-portal/save-time-question', saveTimeAndQuestion)
router.delete('/tutorial-portal/delete-absent-student', deleteAbsentStudent)
router.get('/tutorial-portal/total-students-enrolled', totalStudentsEnrolled)
router.get(
  '/tutorial-portal/average-students-enrolled',
  averageStudentsEnrolled
)
router.get('/tutorial-portal/average-time', averageTime)

module.exports = router
