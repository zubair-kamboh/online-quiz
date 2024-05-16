const User = require('../models/user')
const Admin = require('../models/admin')

exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      username,
      email,
      address,
      state,
      pinCode,
      password,
    } = req.body

    if (
      !fullName ||
      !contactNumber ||
      !username ||
      !email ||
      !address ||
      !state ||
      !pinCode ||
      !password
    ) {
      return res.status(400).json({ message: 'All fields are required!' })
    }

    // Check if the email is already registered
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Create a new user with plain text password
    const user = new User({
      fullName,
      contactNumber,
      username,
      email,
      address,
      state,
      pinCode,
      password, // Storing plain text password
    })

    await user.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Validate the password (since passwords are stored in plain text)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Return user data upon successful login
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        contactNumber: user.contactNumber,
        username: user.username,
        email: user.email,
        address: user.address,
        state: user.state,
        pinCode: user.pinCode,
        role: user.role, // Optionally include the user role
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the admin already exists
    let existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    // Create a new admin with plain text password
    const admin = new Admin({ email, password }) // Storing plain text password
    await admin.save()

    res.status(201).json({ message: 'Admin created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the admin exists
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Validate the password (since passwords are stored in plain text)
    if (password !== admin.password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.status(200).json({ message: 'Login successful', admin })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
