const mongoose = require('mongoose')
const { Schema } = mongoose
const StatisticsSchema = new Schema(
  {
    tutor: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
    grades: {
      type: String,
      required: true,
    },
    subjects: {
      type: String,
      required: true,
    },
    timer: {
      type: Number,
      default: 0,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Statistic', StatisticsSchema)
