// models/user.js

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Assuming 'user' role by default
})

module.exports = mongoose.model('User', userSchema)
