const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  announcement: [
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

module.exports = mongoose.model('CPPAnnouncement', announcementSchema)
