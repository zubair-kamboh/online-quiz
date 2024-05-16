const User = require('../models/user')
const Course = require('../models/course')
const CPPAnnouncement = require('../models/cppannouncement')
const Syllabus = require('../models/syllabus')
const Module = require('../models/module')

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createCourse = async (req, res) => {
  try {
    const { name } = req.body
    const course = new Course({ name })
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createCPPAnnouncement = async (req, res) => {
  try {
    const { courseName, announcement } = req.body
    if (!courseName || !announcement) {
      return res.status(400).json({ message: 'Please include all fields' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    let existingAnnouncement = await CPPAnnouncement.findOne({ courseName })
    if (!existingAnnouncement) {
      existingAnnouncement = new CPPAnnouncement({
        courseName,
        announcement: announcement,
      })
    } else {
      existingAnnouncement.announcement.push(announcement[0])
    }

    const savedAnnouncement = await existingAnnouncement.save()

    if (!savedAnnouncement) {
      return res.status(404).json({ message: 'Announcement cannot be saved!' })
    }

    res.status(201).json({ message: 'Announcement saved!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAnnouncements = async (req, res) => {
  try {
    const { courseName } = req.body
    if (!courseName) {
      return res.status(400).json({ message: 'Please include course name' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    const findCourseAnnouncements = await CPPAnnouncement.findOne({
      courseName,
    })
    if (findCourseAnnouncements) {
      return res.status(200).json(findCourseAnnouncements)
    } else {
      return res.status(200).json({ message: 'No announcements found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createSyllabus = async (req, res) => {
  try {
    const { courseName, syllabus } = req.body
    if (!courseName || !syllabus) {
      return res.status(400).json({ message: 'Please include all fields' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    let existingSyllabus = await Syllabus.findOne({ courseName })
    if (!existingSyllabus) {
      existingSyllabus = new Syllabus({
        courseName,
        syllabus: syllabus,
      })
    } else {
      existingSyllabus.syllabus.push(syllabus[0])
    }

    const savedSyllabus = await existingSyllabus.save()

    if (!savedSyllabus) {
      return res.status(404).json({ message: 'Syllabus cannot be saved!' })
    }

    res.status(201).json({ message: 'Syllabus saved!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getSyllabus = async (req, res) => {
  try {
    const { courseName } = req.body
    if (!courseName) {
      return res.status(400).json({ message: 'Please include course name' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    const findCourseSyllabus = await Syllabus.findOne({
      courseName,
    })
    if (findCourseSyllabus) {
      return res.status(200).json(findCourseSyllabus)
    } else {
      return res.status(200).json({ message: 'No syllabus found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createModule = async (req, res) => {
  try {
    const { courseName, module } = req.body
    if (!courseName || !module) {
      return res.status(400).json({ message: 'Please include all fields' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    let existingModule = await Module.findOne({ courseName })
    if (!existingModule) {
      existingModule = new Module({
        courseName,
        module: module,
      })
    } else {
      existingModule.module.push(module[0])
    }

    const savedModule = await existingModule.save()

    if (!savedModule) {
      return res.status(404).json({ message: 'Module cannot be saved!' })
    }

    res.status(201).json({ message: 'Module saved!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getModules = async (req, res) => {
  try {
    const { courseName } = req.body
    if (!courseName) {
      return res.status(400).json({ message: 'Please include course name' })
    }

    const findCourse = await Course.findOne({ name: courseName })
    if (!findCourse) {
      return res.status(400).json({ message: 'Course not found!' })
    }

    const findCourseModule = await Module.findOne({
      courseName,
    })
    if (findCourseModule) {
      return res.status(200).json(findCourseModule)
    } else {
      return res.status(200).json({ message: 'No module found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
