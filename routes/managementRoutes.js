const {
  manageTutorRequest,
  acceptTutorRequest,
  declineTutorRequest,
  courseTutors,
  tutorsEachDay,
  studentsAttendants,
  subjectsData,
} = require('../controllers/managementController')

const router = require('express').Router()

router.get('/get-tutor-requests', manageTutorRequest)
router.post('/accept-request', acceptTutorRequest)
router.post('/decline-request', declineTutorRequest)
router.get('/courses', courseTutors)
router.get('/stats/subjects-data', subjectsData)
router.get('/stats/tutors-each-day', tutorsEachDay)
router.get('/stats/students-attendants', studentsAttendants)

module.exports = router
