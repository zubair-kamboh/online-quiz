import React, { useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import ProfileModel from '../components/ProfileModel'
const AdminQuiz = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [onSelectValue, setOnSelectValue] = useState('')
  const [hideForm, setHideForm] = useState(true)
  const navigate = useNavigate()
  const [quizDetails, setQuizDetails] = useState({
    quizName: '',
    courseName: onSelectValue && onSelectValue,
    openingDate: '',
    dueDate: '',
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ],
  })

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target
    const updatedQuestions = [...quizDetails.questions]

    // Check if optionIndex is null, if so, update the correctAnswerIndex
    if (name.startsWith('correctAnswerIndex')) {
      updatedQuestions[questionIndex].correctAnswerIndex = parseInt(value)
    } else {
      // Otherwise, update the question text or option value
      if (optionIndex === null) {
        updatedQuestions[questionIndex].questionText = value
      } else {
        updatedQuestions[questionIndex].options[optionIndex] = value
      }
    }

    setQuizDetails({ ...quizDetails, questions: updatedQuestions })
  }

  const handleSelectChange = (e) => {
    setQuizDetails({ ...quizDetails, course: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedQuiz = { ...quizDetails, courseName: onSelectValue }
    // Send quizDetails to the backend for saving
    try {
      const response = await fetch('http://localhost:8000/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuiz),
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        alert('Quiz Published!')
        navigate('/admin/dashboard')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error signing in:', error)
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

  const onSelect = (e) => {
    setOnSelectValue(e.target.value)

    if (e.target.value === 'select') {
      setHideForm(true)
    } else {
      setHideForm(false)
    }
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
            to={'/admin/dashboard'}
            class="pl-1 mb-3 font-medium hover:underline"
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
            class="border-l-2 pl-1 mb-3 font-medium hover:underline"
          >
            Add Quiz’s
          </Link>
        </div>
        <div class="p-6 px-6 ms-auto w-[85%]">
          <p class="text-3xl pt-2 text-[#131313]">
            Select Course for Adding Quiz
          </p>

          <div class="mt-4">
            <select
              name="grades"
              id="grades"
              style={{ width: '300px' }}
              onChange={onSelect}
            >
              <option value="select">select</option>
              <option value="CPP Programming Language">
                CPP Programming Language
              </option>
              <option value="Java Programming Language">
                Java Programming Language
              </option>
              <option value="Python Programming Language">
                Python Programming Language
              </option>
            </select>
          </div>
          {!hideForm && (
            <>
              <div className="admin-quiz-container">
                <h1>Add Quiz</h1>
                <form onSubmit={handleSubmit}>
                  <label style={{ margin: '5px 0px 0px 0px' }}>
                    Quiz Name:
                    <input
                      type="text"
                      name="quizName"
                      style={{ border: '1px solid black', width: '100%' }}
                      value={quizDetails.quizName}
                      onChange={(e) =>
                        setQuizDetails({
                          ...quizDetails,
                          quizName: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </label>

                  {quizDetails.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-container">
                      <label style={{ margin: '5px 0px 0px 0px' }}>
                        Question {questionIndex + 1}:
                        <input
                          type="text"
                          name={`question${questionIndex}`}
                          value={question.questionText}
                          style={{ border: '1px solid black', width: '100%' }}
                          onChange={(e) =>
                            handleInputChange(e, questionIndex, null)
                          }
                          className="full-width-input"
                        />
                      </label>
                      {/* Inputs for options */}
                      {question.options.map((option, optionIndex) => (
                        <label
                          style={{ margin: '5px 0px 0px 0px' }}
                          key={optionIndex}
                        >
                          Option {optionIndex + 1}:
                          <input
                            type="text"
                            name={`option${optionIndex}`}
                            value={option}
                            style={{ border: '1px solid black', width: '100%' }}
                            onChange={(e) =>
                              handleInputChange(e, questionIndex, optionIndex)
                            }
                            className="full-width-input"
                          />
                        </label>
                      ))}
                      <label style={{ margin: '5px 0px 0px 0px' }}>
                        Correct Answer Index:
                        <input
                          type="number"
                          min="0"
                          max="3"
                          style={{ border: '1px solid black', width: '100%' }}
                          name={`correctAnswerIndex${questionIndex}`}
                          value={question.correctAnswerIndex}
                          onChange={(e) =>
                            handleInputChange(e, questionIndex, null)
                          }
                          className="full-width-input"
                        />
                      </label>
                    </div>
                  ))}
                  <label style={{ margin: '5px 0px 0px 0px' }}>
                    Opening Date:
                    <input
                      type="datetime-local"
                      name="openingDate"
                      style={{ border: '1px solid black', width: '100%' }}
                      value={quizDetails.openingDate}
                      onChange={(e) =>
                        setQuizDetails({
                          ...quizDetails,
                          openingDate: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </label>
                  <label style={{ margin: '5px 0px 0px 0px' }}>
                    Due Date:
                    <input
                      type="datetime-local"
                      name="dueDate"
                      style={{ border: '1px solid black', width: '100%' }}
                      value={quizDetails.dueDate}
                      onChange={(e) =>
                        setQuizDetails({
                          ...quizDetails,
                          dueDate: e.target.value,
                        })
                      }
                      className="full-width-input"
                    />
                  </label>
                  <button
                    type="submit"
                    className="text-white bg-blue py-[6px] border-[1px] border-[#000] px-5 rounded-[10px] mt-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
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

export default AdminQuiz
