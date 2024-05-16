const { default: mongoose } = require('mongoose')
require('../models/StudentAuthModel')

const connection = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://127.0.0.1:27017/brightboost',
      {
        useNewUrlParser: true,
      }
    )

    if (connection) {
      console.log('db connected')
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = connection
