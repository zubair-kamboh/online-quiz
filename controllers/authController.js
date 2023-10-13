const asynHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')
const StudentAuthModel = require('../models/StudentAuthModel')
const { TeacherAuthModel } = require('../models/TeacherAuthModel')

const AdminSchema = require('../models/AdminAuthModel')

// Student SIGNUP
const studentSignUp = asynHandler(async (req, res) => {
  const { fullname, address, school, email, password } = req.body

  if (!fullname || !address || !school || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const emailExist = await StudentAuthModel.findOne({ email })

  // check if email already exists
  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const doc = new StudentAuthModel({
    fullname,
    address,
    school,
    email,
    password,
  })

  await doc.save()
  res.status(200).json({ successMsg: 'Student saved in db!' })
})

// StudentSignIn
const studentSignIn = asynHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const student = await StudentAuthModel.findOne({ email })

  // check if email do not exists
  if (!student) {
    res.status(400)
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // if passwords do not match
  if (student.password !== password) {
    res.status(400)
    throw new Error('Incorrect password!')
  }

  // sign in student
  res.json({
    successMsg: 'Sign in successfully!',
    student: {
      _id: student._id,
      fullname: student.fullname,
      address: student.address,
      school: student.school,
      email: student.email,
      paymentstatus: student.paymentstatus,
    },
  })
})

// Teacher SIGNUP
const teacherSignUp = asynHandler(async (req, res) => {
  const { fullname, address, school, email, password } = req.body

  if (!fullname || !address || !school || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const emailExist = await TeacherAuthModel.findOne({ email })

  // check if email already exists
  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const doc = new TeacherAuthModel({
    fullname,
    address,
    school,
    email,
    password,
  })

  await doc.save()
  res.status(200).json({ successMsg: 'Teacher saved in db!' })
})

// Teacher Sign In
const teacherSignIn = asynHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const teacher = await TeacherAuthModel.findOne({ email })

  // check if email do not exists
  if (!teacher) {
    res.status(400)
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // if passwords do not match
  if (teacher.password !== password) {
    res.status(400)
    throw new Error('Incorrect password!')
  }

  // sign in teacher
  res.json({
    successMsg: 'Sign in successfully!',
    teacher: {
      _id: teacher._id,
      fullname: teacher.fullname,
      address: teacher.address,
      school: teacher.school,
      email: teacher.email,
      teacherstatus: teacher.teacherstatus,
    },
  })
})

// ADMIN SIGNUP
const adminSignUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const emailExist = await AdminSchema.findOne({ email })

  // check if email already exists
  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const doc = new AdminSchema({
    email,
    password,
  })

  await doc.save()
  res.status(200).json({ successMsg: 'Admin saved in db!' })
})

// Admin Sign In
const adminSignIn = asynHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const admin = await AdminSchema.findOne({ email })

  // check if email do not exists
  if (!admin) {
    res.status(404)
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // if passwords do not match
  if (admin.password !== password) {
    res.status(400)
    throw new Error('Incorrect password!')
  }

  // sign in admin
  res.json({
    successMsg: 'Sign in successfully!',
    admin: {
      _id: admin._id,
      fullname: admin.fullname,
      address: admin.address,
      email: admin.email,
    },
  })
})

module.exports = {
  studentSignUp,
  studentSignIn,
  teacherSignIn,
  teacherSignUp,
  adminSignUp,
  adminSignIn,
}
