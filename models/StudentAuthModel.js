const mongoose = require('mongoose')

const StudentAuthSchema = new mongoose.Schema(
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
    paymentstatus: {
      type: Boolean,
      default: false,
    },
    enrollment: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'StudentEnrollment' },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', StudentAuthSchema)
