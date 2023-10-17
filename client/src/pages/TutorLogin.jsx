import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../images/flogo.png'
import { useNavigate } from 'react-router-dom'

const TutorLogin = () => {
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
        'http://localhost:8000/api/auth/teacher/signin',
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
        localStorage.setItem('tutor', JSON.stringify(data.teacher))
        alert(data.successMsg)
        navigate('/tutor/profile')
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
            <h2>
              Bright Boost Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Aliquam possimus reprehenderit, aspernatur placeat facilis
              temporibus similique autem doloremque sit corporis nisi nemo aut
              consequatur est? Consequuntur, omnis. Ipsa, exercitationem.
              Aspernatur.
            </h2>
          </div>
          <div class="content">
            <div class="content_body">
              <div class="content_text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                cumque asperiores alias voluptatibus ex porro, dolorum velit!
                Autem quam odio, doloremque quas eaque, ab, voluptas inventore
                quis saepe molestiae ut?Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Libero eum animi, excepturi nostrum et cum!
                Laboriosam doloremque provident quos sint voluptatem corporis in
                ullam, velit enim, ratione corrupti vel repellat.
              </div>
            </div>
          </div>
        </div>
        <div class="home_container_right">
          <form class="signin_container_form" onSubmit={handleSubmit}>
            <img src={logo} alt="logo.png" />
            <h1>Tutor Sign In</h1>
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
              name="pass"
              id="pass"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Sign In</button>
            <a
              onClick={() => navigate('/tutor/register')}
              style={{ cursor: 'pointer' }}
            >
              Dont have an account? Register!
            </a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TutorLogin
