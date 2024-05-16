import React, { useEffect, useState } from 'react'
import loginimg from '../images/login-img.png'
import footer from '../images/footer.png'
import logininput1 from '../images/login-input-1.png'
import logininput2 from '../images/login-input-2.png'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
const UserSignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate('/user/dashboard')
    }
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Sign-in successful
        alert(data.message)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        navigate('/user/dashboard')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div>
      <div className="container mx-auto none]">
        <div className="p-6 flex items-center justify-between">
          {/* <img src="./images/logo.png" class="h-12" alt="" /> */}
          <img src={logomain} alt="" style={{ width: '100px' }} />
          <div className="flex-1 text-center me-20">
            <h1 className="text-4xl font-bold">USER LOGIN</h1>
          </div>
        </div>
        <div className="p-10 w-[800px] mx-auto mt-2 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2">
            <img src={loginimg} className="w-64" alt="" />
          </div>
          <form onSubmit={handleSignIn}>
            <div className="w-full md:w-1/2" style={{ width: '100%' }}>
              <p className="text-center font-bold">LOGIN</p>
              <div className="my-4">
                <p className="text-[#646464]">Email</p>
                <div className="flex justify-between items-center border-[1px] border-[#D4D4D4] rounded-[10px] p-2">
                  <img src={logininput1} className="w-[13px] h-[13px]" alt="" />
                  <input
                    className="flex-1 ps-2"
                    type="text"
                    placeholder="Enter your email"
                    style={{ outline: 'none' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[#646464]">Password</p>
                <div className="flex justify-between items-center border-[1px] border-[#D4D4D4] rounded-[10px] p-2">
                  <img src={logininput2} className="w-[13px] h-[13px]" alt="" />
                  <input
                    className="flex-1 ps-2"
                    type="text"
                    placeholder="Enter your password"
                    style={{ outline: 'none' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-[3px]">
                  <a className="text-[#646464] text-sm" href="#">
                    Forget Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-2"
                >
                  LOGIN
                </button>
                <p className="text-center pt-2">
                  Not having account?
                  <Link to={'/user/signup'} className="text-blue">
                    SIGN UP
                  </Link>
                </p>
                <p className="text-center pt-2">
                  Are you an Admin?
                  <Link to={'/admin/login'} className="text-blue">
                    LOGIN
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img
        src={footer}
        className="w-[100vw] h-[50px] absolute bottom-0"
        alt=""
      />
    </div>
  )
}

export default UserSignIn
