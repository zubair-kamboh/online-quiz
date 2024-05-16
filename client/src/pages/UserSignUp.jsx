import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import footer from '../images/footer.png'
import { Link, useNavigate } from 'react-router-dom'

const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate('/user/dashboard')
    }
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert('Password do not match!')
    }
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          contactNumber,
          username,
          address,
          state,
          pinCode,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
        navigate('/user/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div>
      <div className="container mx-auto relative">
        <div className="p-6 flex items-center justify-between">
          <img src={logomain} alt="" style={{ width: '100px' }} />

          <div className="flex-1 text-center ">
            <h1 className="text-4xl font-bold">SIGN UP</h1>
          </div>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mx-auto w-[80%] my-2">
            <div className="flex flex-col md:flex-row space-x-8">
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Full Name</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="text"
                    placeholder="Dexter Watts"
                    style={{ outline: 'none' }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Contact Number</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="tel"
                    placeholder="+1-212-456-7890"
                    style={{ outline: 'none' }}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-x-8 mt-4">
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Username</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="text"
                    placeholder="Watts488@"
                    style={{ outline: 'none' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Email Id</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="tel"
                    placeholder="dexterW@validusa.com"
                    style={{ outline: 'none' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full">
                <p className="text-[#757575] font-bold">Address</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="text"
                    placeholder="123 Main Street, Anytown"
                    style={{ outline: 'none' }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-x-8 mt-4">
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">State</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="text"
                    placeholder="USA"
                    style={{ outline: 'none' }}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Pin Code</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="tel"
                    placeholder={12345}
                    style={{ outline: 'none' }}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-x-8 mt-4">
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Password</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="text"
                    placeholder="*******************************"
                    style={{ outline: 'none' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[#757575] font-bold">Confirm password</p>
                <div className="border-[1px] border-[#7C7C7C] rounded-[10px] p-2">
                  <input
                    className="flex-1 ps-2 w-full text-[#000] font-bold"
                    type="tel"
                    placeholder="*******************************"
                    style={{ outline: 'none' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-6 w-full"
            >
              LOGIN
            </button>
            <p className="text-center pt-2">
              Having account?{' '}
              <Link to={'/user/login'} className="text-[black] font-bold">
                LOGIN
              </Link>
            </p>
            <p className="text-center pt-2">
              Are you an Admin?{' '}
              <Link to={'/admin/login'} className="text-[black] font-bold">
                LOGIN
              </Link>
            </p>
          </div>
        </form>
      </div>
      <img src={footer} className="w-[100vw] h-[50px] fixed bottom-0" alt="" />
    </div>
  )
}

export default UserSignUp
