import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileModel from '../components/UserProfileModel'
import moment from 'moment'

const PythonQuizzesPage = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [quizzes, setQuizzes] = useState()
  const [upcoming, setUpcoming] = useState()
  const [preview, setPreview] = useState()
  const [avaiable, setAvailable] = useState()
  const navigate = useNavigate()

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
  // console.log(quizzes)
  useEffect(() => {
    const getModules = async (e) => {
      try {
        const response = await fetch('http://localhost:8000/users/quiz/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseName: 'Python Programming Language',
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setQuizzes(data)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.error('Error signing in:', error)
      }
    }

    getModules()
  }, [])

  useEffect(() => {
    const now = new Date()
    const oneDayMs = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    const thirtyMinutesMs = 30 * 60 * 1000 // 30 minutes in milliseconds

    const upcomingQuizzes = []
    const availableQuizzes = []
    const previewQuizzes = []

    quizzes?.forEach((quiz) => {
      const dueDate = new Date(quiz.dueDate)
      const timeDifference = dueDate - now
      console.log(timeDifference)

      if (timeDifference <= 0) {
        previewQuizzes.push(quiz)
      } else if (timeDifference <= oneDayMs) {
        availableQuizzes.push(quiz)
      } else if (timeDifference > oneDayMs) {
        upcomingQuizzes.push(quiz)
      }
    })

    setUpcoming(upcomingQuizzes)
    setAvailable(availableQuizzes)
    setPreview(previewQuizzes)
  }, [quizzes])

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
          Python Programming Langugage
        </h1>{' '}
        <hr className="mt-3 text-[#c6c6c6]" />
        <div class="w-40 absolute bg-white left-22 h-[86%] overflow-scroll pt-4 px-5 flex flex-col">
          <p class="text-xs mb-3">2024 Semester 1</p>
          <Link
            to={'/user/python-home-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to={'/user/python-announcement-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Announcement
          </Link>
          <Link
            to={'/user/python-syllabus-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Syllabus
          </Link>
          <Link
            to={'/user/python-module-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Module
          </Link>
          <Link
            to={'/user/python-quizzes-page'}
            class="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Quiz’s
          </Link>
          <Link
            to={'/user/python-grades-page'}
            class="pl-1 mb-3 font-medium hover:underline"
          >
            Grades
          </Link>
        </div>
        <div class="p-6 px-6 ms-auto w-[85%]">
          <h1 class="text-4xl text-[#625f5f] font-bold">
            Python Programming Language
          </h1>

          <p class="text-xl pt-8 text-[#131313]">Avaiable Quizes</p>
          <hr class="my-3 text-[#c6c6c6]" />

          <div>
            <button
              class="bg-[#f5f5f5] hover:shadow-none"
              style={{ backgroundColor: '#f5f5f5', width: '100%' }}
            >
              Upcoming
            </button>
            {upcoming
              ? upcoming.map((quiz, index) => {
                  return (
                    <div id="Demo1" class="w3-hide w3-animate-zoom">
                      <div class="flex justify-start items-center p-2 hover:bg-[#eaeaea] cursor-pointer">
                        <i
                          class="fa fa-solid fa-rocket"
                          style={{ fontSize: '22px' }}
                        ></i>
                        <div class="px-3">
                          <p class="text-sm font-bold">
                            {' '}
                            {quiz.quizName
                              ? quiz.quizName
                              : `Quiz ${index + 1}`}
                          </p>
                          <div>
                            <p class="text-sm">
                              <span>Opened </span>
                              <span>
                                Due{' '}
                                {moment(quiz.dueDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}{' '}
                              </span>
                              <span>Points {quiz.points}</span>
                              <span>
                                {` ${quiz.questions.length}`} Questions
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : 'No Upcoming Quizzes'}
          </div>

          <div>
            <button
              onclick="myFunction('Demo2')"
              class="w3-btn w3-block w3-left-align bg-[#f5f5f5] hover:shadow-none"
              style={{ backgroundColor: '#f5f5f5', width: '100%' }}
            >
              Preview
            </button>
            {preview
              ? preview.map((quiz, index) => {
                  return (
                    <div id="Demo1" class="w3-hide w3-animate-zoom">
                      <div
                        class="flex justify-start items-center p-2 hover:bg-[#eaeaea] cursor-pointer"
                        onClick={() => navigate('/user/python-grades-page')}
                      >
                        <i
                          class="fa fa-solid fa-rocket"
                          style={{ fontSize: '22px' }}
                        ></i>
                        <div class="px-3">
                          <p class="text-sm font-bold">
                            {quiz.quizName
                              ? quiz.quizName
                              : `Quiz ${index + 1}`}
                          </p>
                          <div>
                            <p class="text-sm">
                              <span>Closed </span>
                              <span>
                                Due{' '}
                                {moment(quiz.dueDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}{' '}
                              </span>
                              <span>Points {quiz.points}</span>
                              <span>
                                {` ${quiz.questions.length}`} Questions
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : 'No Previous Quizzes'}
          </div>

          <div>
            <button
              onclick="myFunction('Demo3')"
              class="w3-btn w3-block w3-left-align bg-[#f5f5f5] hover:shadow-none"
              style={{ backgroundColor: '#f5f5f5', width: '100%' }}
            >
              Avaiable
            </button>
            {avaiable
              ? avaiable.map((quiz, index) => {
                  return (
                    <div id="Demo1" class="w3-hide w3-animate-zoom">
                      <div
                        class="flex justify-start items-center p-2 hover:bg-[#eaeaea] cursor-pointer"
                        onClick={() =>
                          navigate('/user/python-quizzes-page/quiz', {
                            state: quiz,
                          })
                        }
                      >
                        <i
                          class="fa fa-solid fa-rocket"
                          style={{ fontSize: '22px' }}
                        ></i>
                        <div class="px-3">
                          <p class="text-sm font-bold">
                            {' '}
                            {quiz.quizName
                              ? quiz.quizName
                              : `Quiz ${index + 1}`}
                          </p>
                          <div>
                            <p class="text-sm">
                              <span>Opened </span>
                              <span>
                                Due{' '}
                                {moment(quiz.dueDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}{' '}
                              </span>
                              <span>Points {quiz.points}</span>
                              <span>
                                {` ${quiz.questions.length}`} Questions
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : 'No Avaiable Quizzes'}
          </div>
          <hr class="my-3 text-[#c6c6c6]" />
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

export default PythonQuizzesPage
