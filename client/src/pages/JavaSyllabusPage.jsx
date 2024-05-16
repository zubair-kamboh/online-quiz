import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileModel from '../components/UserProfileModel'
const JavaSyllabusPage = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [syllabus, setSyllabus] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const getCPPSyllabus = async (e) => {
      try {
        const response = await fetch(
          'http://localhost:8000/courses/get-syllabus',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              courseName: 'Java Programming Language',
            }),
          }
        )

        const data = await response.json()

        if (response.ok) {
          setSyllabus(data)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.error('Error signing in:', error)
      }
    }

    getCPPSyllabus()
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
        <h1 class="text-xl text-[#313131] font-normal">
          Java Programming Langugage
        </h1>{' '}
        <hr className="mt-3 text-[#c6c6c6]" />
        <div class="w-40 absolute bg-white left-22 h-[86%] overflow-scroll pt-4 px-5 flex flex-col">
          <p class="text-xs mb-3">2024 Semester 1</p>
          <Link
            to={'/user/java-home-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to={'/user/java-announcement-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Announcement
          </Link>
          <Link
            to={'/user/java-syllabus-page'}
            class="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Syllabus
          </Link>
          <Link
            to={'/user/java-module-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Module
          </Link>
          <Link
            to={'/user/java-quizzes-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Quiz’s
          </Link>
          <Link
            to={'/user/java-grades-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Grades
          </Link>
        </div>
        <div class="p-6 px-6 ms-auto w-[85%]">
          <h1 class="text-4xl text-[#625f5f] font-bold">
            Java Programming Language
          </h1>

          <p class="text-3xl mb-6 pt-8 text-[#131313]">Course Syllabus</p>
          {syllabus
            ? syllabus?.syllabus?.map((syllabus) => {
                return (
                  <>
                    <hr class="my-3 text-[#c6c6c6]" />
                    <p class="text-sm text-[#131313] font-bold">
                      {syllabus.title}
                    </p>
                    <p class="text-sm text-[#131313] my-2">
                      {syllabus.description}
                    </p>
                  </>
                )
              })
            : 'No Syllabus Found!'}
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

export default JavaSyllabusPage
