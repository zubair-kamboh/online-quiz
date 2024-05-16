const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Middleware
app.use(express.json())
app.use(bodyParser.json())

app.use(
  express.urlencoded({
    extended: true,
  })
)
// cors
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/courses', require('./routes/course'))
app.use('/quizzes', require('./routes/quiz'))
app.use('/users', require('./routes/user'))
app.use('/grades', require('./routes/grades'))

// Start the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
