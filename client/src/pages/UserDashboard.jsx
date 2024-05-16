import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileModel from '../components/UserProfileModel'
const UserDashboard = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/user/login')
    }
  }, [])

  const onCoursesBtnClick = (e) => {
    e.preventDefault()
    setShowModel(!showModel)
  }
  const onCloseBtnClick = (e) => {
    e.preventDefault()
    setShowModel(false)
  }
  const onProfileBtnClick = (e) => {
    e.preventDefault()
    setShowProfileModel(!showProfileModel)
  }

  return (
    <div className="w-[100vw] min-h-[100vh] flex relative">
      <div className="w-20 bg-[#625f5f] text-white">
        <img
          src={logomain}
          onClick={() => navigate('/user/dashboard')}
          className="h-26"
          alt=""
          style={{ cursor: 'pointer' }}
        />
        <ul className="text-center text-xs">
          <li className="hover:bg-[#444242] p-3" style={{ cursor: 'pointer' }}>
            <Link to="/user/dashboard">
              <i className="fa-solid fa fa-home" style={{ fontSize: '30px' }} />
              Dashboard
            </Link>
          </li>
          <li
            className="hover:bg-[#444242] p-3 courses_btn"
            style={{ cursor: 'pointer' }}
            onClick={onCoursesBtnClick}
          >
            <i
              className="fa-solid fa fa-graduation-cap"
              style={{ fontSize: '30px' }}
            />
            Courses
          </li>
          <li
            className="hover:bg-[#444242] p-3"
            style={{ cursor: 'pointer' }}
            onClick={onProfileBtnClick}
          >
            <i
              className="fa fa-solid fa-building-o"
              style={{ fontSize: '30px' }}
            />
            Account
          </li>
        </ul>
      </div>
      <div className="right_sidebar container p-8 px-12">
        <h1 className="text-4xl text-[#625f5f] font-bold">User Dashboard</h1>
        <hr className="mt-3 text-[#c6c6c6]" />
        <div className="mt-6 flex justify-between items-center space-x-10">
          <div
            className="w-full md:w-1/4 shadow-lg cursor-pointer"
            onClick={() => navigate('/user/java-home-page')}
          >
            <div className="bg-blue w-full h-[146px] rounded-t-lg" />
            <p className="text-[#000000] font-medium text-justify p-2">
              2024-HS1-COS60011-Java Programming Language-H1
            </p>
            <p className="text-[#000000] text-justify text-sm p-2">
              2024 Semester 1
            </p>
          </div>
          <div
            className="w-full md:w-1/4 shadow-lg cursor-pointer"
            onClick={() => navigate('/user/cpp-home-page')}
          >
            <div className="bg-stormgrey w-full h-[146px] rounded-t-lg" />
            <p className="text-[#000000] font-medium text-justify p-2">
              2024-HS1-COS60011-C++ Programming Language-H1
            </p>
            <p className="text-[#000000] text-justify text-sm p-2">
              2024 Semester 1
            </p>
          </div>
          <div
            className="w-full md:w-1/4 shadow-lg cursor-pointer"
            onClick={() => navigate('/user/python-home-page')}
          >
            <div className="bg-green w-full h-[146px] rounded-t-lg" />
            <p className="text-[#000000] font-medium text-justify p-2">
              2024-HS1-COS60011-Python Programming Language-H1
            </p>
            <p className="text-[#000000] text-justify text-sm p-2">
              2024 Semester 1
            </p>
          </div>
        </div>
      </div>
      <div
        className="model w-96 absolute bg-white border left-20 h-[100%] pt-4 px-5"
        style={{
          display: showModel === false ? 'none' : 'block',
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Courses</h1>
          <i
            className="fa fa-times cursor-pointer close_btn"
            aria-hidden="true"
            onClick={onCloseBtnClick}
          />
        </div>
        <hr className="my-3 text-[#c6c6c6]" />
        <Link
          to={'/user/dashboard'}
          className="text-lg text-blue cursor-pointer hover:underline"
        >
          All courses
        </Link>
        <hr className="my-3 text-[#c6c6c6]" />
        <div>
          <Link
            to={'/user/python-home-page'}
            className="text-lg text-blue cursor-pointer hover:underline mb-3"
          >
            2024-HS1-COS60011-Python Programming Language
          </Link>
          <br />
          <Link
            to={'/user/cpp-home-page'}
            className="text-lg text-blue cursor-pointer hover:underline mb-3"
          >
            2024-HS1-COS60011-C++ Programming Language{' '}
          </Link>
          <br />
          <Link
            to={'/user/java-home-page'}
            className="text-lg text-blue cursor-pointer hover:underline mb-3"
          >
            2024-HS1-COS60011-Java Programming Language
          </Link>
        </div>
      </div>
      <UserProfileModel
        showProfileModel={showProfileModel}
        setShowProfileModel={setShowProfileModel}
      />
    </div>
  )
}

export default UserDashboard
