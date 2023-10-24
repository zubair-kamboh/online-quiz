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
  getTutorProfile,
} = require('../controllers/tutorController')

const router = require('express').Router()

router.post('/enrollment', tutorEnrollment)
router.get('/enrollment', listTutorEnrollments)
router.get('/course-portal/courses-tutoring', coursesTutoring)
router.post('/tutorial-portal/get-students', getStudents)
router.post('/tutorial-portal/save-time-question', saveTimeAndQuestion)
router.delete('/tutorial-portal/delete-absent-student', deleteAbsentStudent)
router.get('/course-portal/total-students-enrolled', totalStudentsEnrolled)
router.post('/course-portal/average-students-enrolled', averageStudentsEnrolled)
router.get('/course-portal/average-time', averageTime)
router.post('/get-profile', getTutorProfile)

module.exports = router
