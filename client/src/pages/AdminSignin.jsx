import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../images/flogo.png'
import { useNavigate } from 'react-router-dom'
import HomePageDescription from '../components/HomePageDescription'

const AdminSignin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (admin) {
      navigate('/admin/profile')
    }
  }, [])

  const navigate = useNavigate()

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
        'http://localhost:8000/api/auth/admin/signin',
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
        localStorage.setItem('admin', JSON.stringify(data.admin))
        alert(data.successMsg)
        navigate('/admin/profile')
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
        <HomePageDescription />
        <div className="home_container_right">
          <form className="signin_container_form" onSubmit={handleSubmit}>
            <img src={logo} alt="logo.png" />
            <h1>Admin Sign In</h1>
            <input
              type="text"
              name="email"
              id="uname"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminSignin
