import React, { useEffect, useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileModel from '../components/UserProfileModel'
import moment from 'moment'

const JavaGrades = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [onSelectValue, setOnSelectValue] = useState('individual')
  const [userId, setUserId] = useState('')
  const [individualGrades, setIndividualGrades] = useState([])
  const [allClassGrades, setAllClassGrades] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserId(user)
    }
  }, [])

  useEffect(() => {
    const getIndividualGrades = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/grades/individual`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              courseName: 'Java Programming Language',
              userId: userId?.id,
            }),
          }
        )

        const data = await response.json()
        if (response.ok) {
          // Sort grades by score in descending order
          const sortedGrades = data.grades.sort((a, b) => b.score - a.score)
          setIndividualGrades(sortedGrades)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.error('Error fetching grades:', error)
      }
    }

    if (userId) {
      getIndividualGrades()
    }
  }, [userId])

  useEffect(() => {
    const getAllClassGrades = async () => {
      try {
        const response = await fetch(`http://localhost:8000/grades/all`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseName: 'Java Programming Language',
          }),
        })

        const data = await response.json()
        console.log(data)
        if (response.ok) {
          // Sort grades by score in descending order
          const sortedGrades = data.allGradesAndUsers.sort(
            (a, b) => b.score - a.score
          )
          setAllClassGrades(sortedGrades)
        } else {
          console.log(data.message)
        }
      } catch (error) {
        console.error('Error fetching grades:', error)
      }
    }

    if (userId) {
      getAllClassGrades()
    }
  }, [userId])

  console.log(allClassGrades)

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
  const onSelect = (e) => {
    setOnSelectValue(e.target.value)
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
          Java Programming Langugage
        </h1>
        <hr className="mt-3 text-[#c6c6c6]" />
        <div className="w-40 absolute bg-white left-22 h-[86%] overflow-scroll pt-4 px-5 flex flex-col">
          <p className="text-xs mb-3">2024 Semester 1</p>
          <Link
            to={'/user/java-home-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to={'/user/java-announcement-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Announcement
          </Link>
          <Link
            to={'/user/java-syllabus-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Syllabus
          </Link>
          <Link
            to={'/user/java-module-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Module
          </Link>
          <Link
            to={'/user/java-quizzes-page'}
            className="pl-1 mb-3 font-medium hover:underline"
          >
            Quiz’s
          </Link>
          <Link
            to={'/user/java-grades-page'}
            className="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Grades
          </Link>
        </div>
        <div className="p-6 px-6 ms-auto w-[85%]">
          <h1 className="text-4xl text-[#625f5f] font-bold">
            Java Programming Language
          </h1>

          <div className="mt-6">
            <select
              name="grades"
              id="grades"
              style={{ width: '300px' }}
              onChange={onSelect}
            >
              <option value="individual">Individual</option>
              <option value="all">All Class</option>
            </select>
          </div>

          <div className="grades_container">
            {onSelectValue === 'individual' ? (
              <>
                <p className="text-3xl pt-8 text-[#131313]">
                  Grades for {userId?.fullName}
                </p>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Submitted
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Score
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Correct Answers
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Questions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {individualGrades && individualGrades.length > 0 ? (
                        individualGrades.map((grades, index) => (
                          <tr
                            key={index}
                            className="bg-white dark:bg-gray-800 border-b"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap"
                            >
                              {`Quiz ${index + 1}`}
                            </th>
                            <td className="px-6 py-4">
                              {moment(grades.submitDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </td>
                            <td className="px-6 py-4">{grades.score}</td>
                            <td className="px-6 py-4">
                              {grades.correctAnswers}
                            </td>
                            <td className="px-6 py-4">
                              {grades.totalQuestions}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No Grades Found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p className="text-3xl pt-8 text-[#131313]">
                  Grades for All Class
                </p>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Student Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Attempt Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Attempted Questions
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Questions
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allClassGrades && allClassGrades.length > 0 ? (
                        individualGrades.map((grades, index) => (
                          <tr
                            key={index}
                            className="bg-white dark:bg-gray-800 border-b"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap"
                            >
                              {grades.userId.fullName}
                            </th>
                            <td className="px-6 py-4">
                              {moment(grades.submitDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {grades.correctAnswers}
                            </td>
                            <td className="px-6 py-4">
                              {grades.totalQuestions}
                            </td>
                            <td className="px-6 py-4">{grades.score}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No Grades Found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
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

export default JavaGrades
