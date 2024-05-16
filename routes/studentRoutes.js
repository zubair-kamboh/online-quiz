const {
  studentEnrollment,
  studentEnrollmentSave,
  currentCourses,
  paymentStatus,
  studentEnrollmentTutorData,
  fetchMethodTime,
} = require('../controllers/studentController')

const router = require('express').Router()

// /student/enrollment
router.post('/enrollment/get', studentEnrollment)
router.post('/enrollment/get-tutor-data', studentEnrollmentTutorData)
router.post('/enrollment/get-tutor-method-time', fetchMethodTime)
router.post('/enrollment/save', studentEnrollmentSave)
router.post('/student-course-portal/current-courses', currentCourses)
router.get('/payment-status', paymentStatus)

module.exports = router
