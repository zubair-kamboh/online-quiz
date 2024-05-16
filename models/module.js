const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  module: [
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

module.exports = mongoose.model('Module', moduleSchema)
