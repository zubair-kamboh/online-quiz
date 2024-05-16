// gradesRoutes.js
const express = require('express')
const router = express.Router()
const gradesController = require('../controllers/gradesController')

router.post('/individual', gradesController.getIndividualGrades)
router.post('/all', gradesController.getAllClassGrades)

module.exports = router
