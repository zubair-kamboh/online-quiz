const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctAnswerIndex: { type: Number, required: true },
})

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  quizName: { type: String, required: true },
  questions: [questionSchema], // Embed the question schema directly
  publishedBy: {
    type: String, // Change type to String to store the email of the user
    required: true,
  },
  datePublished: { type: Date, default: Date.now },
  openingDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  points: { type: Number, default: 5 },
  attempted: { type: Boolean, default: false },
})

module.exports = mongoose.model('Quiz', quizSchema)
