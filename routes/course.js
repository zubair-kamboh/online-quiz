const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')

router.get('/', courseController.getAllCourses)
router.post('/', courseController.createCourse)
router.post('/cpp-announcement', courseController.createCPPAnnouncement)
router.post('/announcements', courseController.getAnnouncements)
router.post('/create-syllabus', courseController.createSyllabus)
router.post('/get-syllabus', courseController.getSyllabus)
router.post('/create-module', courseController.createModule)
router.post('/get-modules', courseController.getModules)

module.exports = router
