import React, { useState } from 'react'
import logomain from '../images/logo-main.jpg'
import { Link, useNavigate } from 'react-router-dom'
import ProfileModel from '../components/ProfileModel'
import Button from '../components/Button'
const AdminSyllabus = () => {
  const [showModel, setShowModel] = useState(false)
  const [showProfileModel, setShowProfileModel] = useState(false)
  const [onSelectValue, setOnSelectValue] = useState('')
  const [hideInput, setHideInput] = useState(true)
  const [input, setInput] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

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

    console.log(onSelectValue)
    if (e.target.value === 'select') {
      setHideInput(true)
    } else {
      setHideInput(false)
    }
  }

  const handleSubmit = async () => {
    if (!input || !description) {
      return alert('Both fields cannot be empty!')
    }

    try {
      const response = await fetch(
        'http://localhost:8000/courses/create-syllabus',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseName: onSelectValue,
            syllabus: [{ title: input, description }],
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }

    setInput('')
    setDescription('')
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
            class="border-l-2 pl-1 mb-3 font-medium hover:underline"
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
          <p class="text-3xl pt-8 text-[#131313]">
            Select Course for Adding Syllabus
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
          <div class="mt-4">
            {!hideInput && (
              <>
                <textarea
                  name="input"
                  id="input"
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Syllabus Title"
                  style={{
                    width: '100%',
                    border: '1px solid black',
                    height: '100px',
                    color: 'black',
                  }}
                  value={input}
                ></textarea>
                <textarea
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Syllabus Description"
                  style={{
                    width: '100%',
                    border: '1px solid black',
                    height: '100px',
                  }}
                  value={description}
                ></textarea>
                <Button text={'Submit'} handleSubmit={handleSubmit} />
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
      <ProfileModel
        showProfileModel={showProfileModel}
        setShowProfileModel={setShowProfileModel}
      />
    </div>
  )
}

export default AdminSyllabus
