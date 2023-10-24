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
    date: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('TutorEnrollment', TutorEnrollmentSchema)
