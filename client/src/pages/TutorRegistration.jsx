import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  fullName: '',
  address: '',
  school: '',
  email: '',
  password: '',
}

const TutorRegistration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    const tutor = localStorage.getItem('tutor')
    if (tutor) {
      navigate('/tutor/profile')
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return alert('both passwords should match')
    }

    try {
      const response = await fetch(
        'http://localhost:8000/api/auth/teacher/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert(data.successMsg)
        navigate('/tutor/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <>
      <Header />
      <div class="apply_container">
        <h1>Tutor Registration</h1>
        <form onSubmit={handleSubmit}>
          <div class="apply_row">
            <div>
              <div>Full Name</div>
              <input
                class="apply_input"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Full Name"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>Address</div>
              <input
                class="apply_input"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class="apply_row">
            <div>
              <div>School</div>
              <input
                class="apply_input"
                type="text"
                name="school"
                id="school"
                placeholder="School"
                required
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div>Email</div>
              <input
                class="apply_input"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class="apply_row">
            <div>
              <div>Password</div>
              <input
                class="apply_input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>Confirm Password</div>
              <input
                class="apply_input"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div class="apply_btn">
            <button type="submit">Apply</button>
            <button type="reset">Reset</button>
            <a
              onClick={() => navigate('/tutor/login')}
              style={{ cursor: 'pointer' }}
            >
              Already Registered? Login!
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default TutorRegistration
