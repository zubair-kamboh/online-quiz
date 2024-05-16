const mongoose = require('mongoose')

const syllabusSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  syllabus: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
})

module.exports = mongoose.model('Syllabus', syllabusSchema)
