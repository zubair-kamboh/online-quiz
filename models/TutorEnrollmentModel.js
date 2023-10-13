const mongoose = require('mongoose')
const { Schema } = mongoose

const TutorEnrollmentSchema = new Schema(
  {
    grades: {
      type: String,
      required: true,
    },
    subjects: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.String,
      ref: 'Teacher',
    },
    timer: {
      type: Number,
      default: 0,
    },
    question: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TutorEnrollment', TutorEnrollmentSchema)
