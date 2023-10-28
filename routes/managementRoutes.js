const {
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
  editStudent,
  getTeachers,
  editTeacher,
  deleteStudent,
  deleteTeacher,
} = require('../controllers/managementController')

const router = require('express').Router()

router.get('/get-tutor-requests', manageTutorRequest)
router.post('/accept-request', acceptTutorRequest)
router.post('/decline-request', declineTutorRequest)
router.get('/courses', courseTutors)
router.post('/stats/subjects-data', subjectsData)
router.get('/stats/tutors-available-dates', sendTutorsAvailabilityDates)
router.post('/stats/tutors-each-day', tutorsEachDay)
router.post('/stats/students-attendants', studentsAttendants)
router.get('/stats/questions-answered', questionsAnswered)
router.get('/students', getStudents)
router.put('/student/edit', editStudent)
router.delete('/student/delete', deleteStudent)
router.get('/teachers', getTeachers)
router.put('/teacher/edit', editTeacher)
router.delete('/teacher/delete', deleteTeacher)

module.exports = router
