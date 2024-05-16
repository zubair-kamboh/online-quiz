import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.png'
import { useNavigate } from 'react-router-dom'

const UserProfileModel = ({ showProfileModel, setShowProfileModel }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      setUser(user)
    }
  }, [])

  const navigate = useNavigate()
  const onCloseBtnClick = (e) => {
    e.preventDefault()
    setShowProfileModel(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/user/login')
  }

  return (
    <div
      className="model w-96 absolute bg-white border left-20 h-[100%] pt-4 px-5"
      style={{
        display: showProfileModel === false ? 'none' : 'block',
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <i
          className="fa fa-times cursor-pointer close_btn"
          aria-hidden="true"
          onClick={onCloseBtnClick}
        />
      </div>
      <hr className="mt-3 text-[#c6c6c6]" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <i class="fa fa-solid fa-user" style={{ fontSize: 70 }}></i>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <h1 className="text-2xl font-bold">{user && user.email}</h1>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <p className="text-2xl ">Name: {user && user.fullName}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <p className="text-2xl ">Contact: {user && user.contactNumber}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <p className="text-2xl ">State: {user && user.state}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <p className="text-2xl ">Username: {user && user.username}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0px 10px 0px',
        }}
      >
        <button
          onClick={handleLogout}
          className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-2"
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}

export default UserProfileModel
