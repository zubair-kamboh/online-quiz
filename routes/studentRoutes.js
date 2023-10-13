const {
  studentEnrollment,
  studentEnrollmentSave,
  currentCourses,
  paymentStatus,
} = require('../controllers/studentController')

const router = require('express').Router()

// /student/enrollment
router.get('/enrollment/get', studentEnrollment)
router.post('/enrollment/save', studentEnrollmentSave)
router.get('/student-course-portal/current-courses', currentCourses)
router.get('/payment-status', paymentStatus)

module.exports = router
