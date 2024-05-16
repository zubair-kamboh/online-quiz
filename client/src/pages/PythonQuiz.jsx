import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserProfileModel from '../components/UserProfileModel'

const PythonQuiz = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [answers, setAnswers] = useState([])
  const [userId, setUserId] = useState('')
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes in seconds

  const navigate = useNavigate()
  const { state } = useLocation()
  console.log(state)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserId(user.id)
    }

    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleSubmit() // Auto submit the quiz when the timer reaches zero
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer) // Cleanup the interval on component unmount
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    // Check if all questions have been answered
    if (answers.length !== state?.questions.length) {
      return alert('Please answer all questions')
    }

    try {
      const response = await fetch('http://localhost:8000/users/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          courseId: state.courseId,
          userId: userId && userId,
          quizId: state._id,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        alert(data.message)
        navigate('/user/python-grades-page')
      } else {
        alert(data.message)
        navigate('/user/python-grades-page')
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleRadioChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers]
    updatedAnswers[questionIndex] = optionIndex
    setAnswers(updatedAnswers)
  }

  // Function to format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className="min-h-[100vh] flex relative">
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
        <h1 className="text-xl text-[#313131] font-normal">
          Python Programming Langugage
        </h1>
        <hr className="mt-3 text-[#c6c6c6]" />
        <div className="w-40 absolute bg-white left-22 h-[86%] overflow-scroll pt-4 px-5 flex flex-col">
          <p className="text-xs mb-3">2024 Semester 1</p>
          <Link
            to={'/user/python-home-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to={'/user/python-announcement-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Announcement
          </Link>
          <Link
            to={'/user/python-syllabus-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Syllabus
          </Link>
          <Link
            to={'/user/python-module-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Module
          </Link>
          <Link
            to={'/user/python-quizzes-page'}
            className="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Quiz’s
          </Link>
          <Link
            to={'/user/python-grades-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Grades
          </Link>
        </div>
        <div className="p-6 px-6 ms-auto w-[85%]">
          <h1 className="text-4xl text-[#625f5f] font-bold">
            Python Programming Language
          </h1>

          <p className="text-xl pt-8 text-[#131313]">
            Quiz Started - Time Available {formatTime(timeLeft)}
          </p>
          <hr className="my-3 text-[#c6c6c6]" />

          {/* Quiz Form */}
          <form onSubmit={handleSubmit}>
            <div>
              <ul className="quiz">
                {state?.questions.map((question, index) => (
                  <li key={index}>
                    {/* Question */}
                    <h4>{`Q${index + 1}. ${question.questionText}`}</h4>

                    {/* Choices */}
                    <ul className="choices">
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <label>
                            <input
                              type="radio"
                              name={`question${index}`}
                              value={option}
                              onChange={() =>
                                handleRadioChange(index, optionIndex)
                              }
                              checked={answers[index] === optionIndex}
                            />
                            <span>{option}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {/* Submit Button */}
              <button
                className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-2"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </form>
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

export default PythonQuiz
