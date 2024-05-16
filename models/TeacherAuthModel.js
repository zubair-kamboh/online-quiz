const mongoose = require('mongoose')
const { Schema } = mongoose

const TeacherAuthSchema = new Schema(
  {
    fullname: {
      type: String,
      maxLength: 64,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    teacherstatus: {
      type: Boolean,
      default: false,
    },
    enrollment: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'TutorEnrollment' },
    ],
  },
  { timestamps: true }
)

const TeacherAuthModel = mongoose.model('Teacher', TeacherAuthSchema)

module.exports = { TeacherAuthModel }
