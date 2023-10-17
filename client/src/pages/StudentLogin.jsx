import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import logo from '../images/flogo.png'

const StudentLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8000/api/auth/student/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('student', JSON.stringify(data.student))
        alert(data.successMsg)
        navigate('/student/profile')
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
      <div class="home_container">
        <div class="home_container_left">
          <div class="home_container_left_heading">
            <h2>Welcome to Bright Boost: Your Academic Lifesaver!</h2>
          </div>
          <div class="content">
            <div class="content_body">
              <div class="content_text">
                <em>
                  At Bright Boost, we believe in the power of knowledge and the
                  potential of every high school student. Our after-school
                  program is here to elevate your educational journey by
                  providing top-notch tutoring in a welcoming and supportive
                  environment. Whether you're striving for that 'A+' or seeking
                  clarity on a tricky concept, Bright Boost is your go-to
                  destination for academic excellence.
                </em>
              </div>
              <br />
              <div class="content_text">
                <b>📚 Unleash Your Potential:</b> Join Bright Boost, where high
                school students like you thrive academically.
                <br />
                <b>🌟 Personalized Support:</b> Our expert tutors are here to
                help you conquer your studies and ace those exams.
                <br />
                <b>📆 Plan Your Success:</b> Explore our interactive timetable
                to stay organized and make the most of your after-school
                sessions.
                <br />
                <b>📈 Data-Driven Learning:</b> We're not just here to teach;
                we're here to track your progress and make data-informed
                decisions for your success.
                <br />
                <em>
                  Discover Bright Boost and take the next step towards a
                  brighter future. Your learning adventure starts here!
                </em>
              </div>
            </div>
          </div>
        </div>
        <div class="home_container_right">
          <form class="signin_container_form" onSubmit={handleSubmit}>
            <img src={logo} alt="logo.png" />
            <h1>Student Sign In</h1>
            <input
              type="text"
              name="email"
              id="uname"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Sign In</button>
            <a
              onClick={() => navigate('/student/register')}
              style={{ cursor: 'pointer' }}
            >
              Not Registered? SignUp!
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentLogin
