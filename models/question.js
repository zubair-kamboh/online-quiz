const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctOptionIndex: { type: Number, required: true },
})

module.exports = mongoose.model('Question', questionSchema)
