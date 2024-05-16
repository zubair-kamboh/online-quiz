const router = require('express').Router()

const {
  studentSignUp,
  studentSignIn,
  teacherSignUp,
  teacherSignIn,
  adminSignUp,
  adminSignIn,
} = require('../controllers/authController')

router.post('/student/signup', studentSignUp)
router.post('/student/signin', studentSignIn)
router.post('/teacher/signup', teacherSignUp)
router.post('/teacher/signin', teacherSignIn)
router.post('/admin/signup', adminSignUp)
router.post('/admin/signin', adminSignIn)
module.exports = router
