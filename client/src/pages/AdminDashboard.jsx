import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProfileModel from '../components/ProfileModel'

const AdminDashboard = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [users, setUsers] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    if (!admin) {
      navigate('/admin/login')
    }
  }, [])
  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.ok) {
        setUsers(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert(error)
    }
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
          onClick={() => navigate('/admin/dashboard')}
          className="h-26"
          alt=""
          style={{ cursor: 'pointer' }}
        />
        <ul className="text-center text-xs">
          <li className="hover:bg-[#444242] p-3" style={{ cursor: 'pointer' }}>
            <Link to="/admin/dashboard">
              <i className="fa-solid fa fa-home" style={{ fontSize: '30px' }} />
              Dashboard
            </Link>
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
        <h1 className="text-4xl text-[#625f5f] font-bold">Admin Dashboard</h1>

        <hr className="mt-3 text-[#c6c6c6]" />
        <div class="w-40 absolute bg-white left-22 h-[86%] overflow-scroll pt-4 px-5 flex flex-col">
          <p class="text-xs mb-3">2024 Semester 1</p>
          <Link
            to={'/admin/dasboard'}
            class="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to={'/admin/announcement-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Announcement
          </Link>
          <Link
            to={'/admin/syllabus-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Add Syllabus
          </Link>
          <Link
            to={'/admin/module-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Add Module
          </Link>
          <Link
            to={'/admin/quizzes-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Add Quiz’s
          </Link>
        </div>
        <div class="p-6 px-6 ms-auto w-[85%]">
          <p class="text-3xl pt-8 text-[#131313]">All Class Students</p>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Contact
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-3">
                    State
                  </th>
                  <th scope="col" class="px-6 py-3">
                    PostCode
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  return (
                    <tr class="bg-white dark:bg-gray-800 border-b">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {user.fullName}
                      </th>
                      <td class="px-6 py-4">{user.contactNumber}</td>
                      <td class="px-6 py-4">{user.email}</td>
                      <td class="px-6 py-4">{user.address}</td>
                      <td class="px-6 py-4">{user.state}</td>
                      <td class="px-6 py-4">{user.pinCode}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
      <ProfileModel
        showProfileModel={showProfileModel}
        setShowProfileModel={setShowProfileModel}
      />
    </div>
  )
}

export default AdminDashboard
