const mongoose = require('mongoose')
const { Schema } = mongoose
const AdminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Admin', AdminSchema)
