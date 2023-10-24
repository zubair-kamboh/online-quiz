import React, { useEffect, useState } from 'react'
import logo from '../images/flogo.png'
import { useNavigate } from 'react-router-dom'

const Header = ({ admin, student, tutor }) => {
  const [studentProfileData, setStudentProfileData] = useState({})
  const [tutorProfileData, setTutorProfileData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const student = localStorage.getItem('student')
    if (student) {
      setStudentProfileData(JSON.parse(student))
    }

    const tutor = localStorage.getItem('tutor')
    if (tutor) {
      setTutorProfileData(JSON.parse(tutor))
    }
  }, [])

  if (admin) {
    return (
      <div class="navbar">
        <div class="navbar_left">
          <a href="./index.html">
            <img class="navbar_logo" src={logo} alt="logo.png" />
          </a>
        </div>
        <div class="navbar_right">
          <nav>
            <ul class="navbar_menu">
              <li class="navbar_item" id="student_home">
                <a
                  onClick={() => navigate('/admin/profile')}
                  style={{ cursor: 'pointer' }}
                >
                  Profile
                </a>
              </li>
              <li class="navbar_item" id="tutor_home">
                <a
                  onClick={() => navigate('/admin/enrollment-requests')}
                  style={{ cursor: 'pointer' }}
                >
                  Enrollment Requests
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/admin/courses')}
                  style={{ cursor: 'pointer' }}
                >
                  Courses
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/admin/statistics')}
                  style={{ cursor: 'pointer' }}
                >
                  Statistics
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => {
                    localStorage.removeItem('admin')
                    navigate('/admin/login')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }

  if (student) {
    return (
      <div class="navbar">
        <div class="navbar_left">
          <a href="./index.html">
            <img class="navbar_logo" src={logo} alt="logo.png" />
          </a>
        </div>
        <div class="navbar_right">
          <nav>
            <ul class="navbar_menu">
              <li class="navbar_item" id="student_home">
                <a
                  onClick={() => navigate('/student/profile')}
                  style={{ cursor: 'pointer' }}
                >
                  Profile
                </a>
              </li>
              <li class="navbar_item" id="tutor_home">
                <a
                  onClick={() => navigate('/student/enrollment')}
                  style={{
                    cursor: 'pointer',
                    pointerEvents:
                      studentProfileData.paymentstatus === false
                        ? 'none'
                        : 'all',
                    opacity:
                      studentProfileData.paymentstatus === false ? '.3' : '1',
                  }}
                >
                  Enrollment
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/student/course-portal')}
                  style={{
                    cursor: 'pointer',
                    pointerEvents:
                      studentProfileData.paymentstatus === false
                        ? 'none'
                        : 'all',
                    opacity:
                      studentProfileData.paymentstatus === false ? '.3' : '1',
                  }}
                >
                  Course Portal
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/student/payment')}
                  style={{ cursor: 'pointer' }}
                >
                  Payment
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/student/payment-status')}
                  style={{ cursor: 'pointer' }}
                >
                  Payment Status
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => {
                    localStorage.removeItem('student')
                    navigate('/student/login')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }

  if (tutor) {
    return (
      <div class="navbar">
        <div class="navbar_left">
          <a href="./index.html">
            <img class="navbar_logo" src={logo} alt="logo.png" />
          </a>
        </div>
        <div class="navbar_right">
          <nav>
            <ul class="navbar_menu">
              <li class="navbar_item" id="student_home">
                <a
                  onClick={() => navigate('/tutor/login')}
                  style={{ cursor: 'pointer' }}
                >
                  Profile
                </a>
              </li>
              <li class="navbar_item" id="tutor_home">
                <a
                  onClick={() => navigate('/tutor/enrollment')}
                  style={{ cursor: 'pointer' }}
                >
                  Enrollment
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/tutor/course-portal')}
                  style={{
                    cursor: 'pointer',
                    pointerEvents:
                      tutorProfileData.teacherstatus === false ? 'none' : 'all',
                    opacity:
                      tutorProfileData.teacherstatus === false ? '.3' : '1',
                  }}
                >
                  Course Portal
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => navigate('/tutor/tutorial-portal')}
                  style={{
                    cursor: 'pointer',
                    pointerEvents:
                      tutorProfileData.teacherstatus === false ? 'none' : 'all',
                    opacity:
                      tutorProfileData.teacherstatus === false ? '.3' : '1',
                  }}
                >
                  Tutorial Portal
                </a>
              </li>
              <li class="navbar_item" id="admin_home">
                <a
                  onClick={() => {
                    localStorage.removeItem('tutor')
                    navigate('/tutor/login')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div class="navbar">
      <div class="navbar_left">
        <a href="./index.html">
          <img class="navbar_logo" src={logo} alt="logo.png" />
        </a>
      </div>
      <div class="navbar_right">
        <nav>
          <ul class="navbar_menu">
            <li class="navbar_item" id="student_home">
              <a
                onClick={() => navigate('/student/login')}
                style={{ cursor: 'pointer' }}
              >
                Student
              </a>
            </li>
            <li class="navbar_item" id="tutor_home">
              <a
                onClick={() => navigate('/tutor/login')}
                style={{ cursor: 'pointer' }}
              >
                Tutor
              </a>
            </li>
            <li class="navbar_item" id="admin_home">
              <a
                onClick={() => navigate('/admin/login')}
                style={{ cursor: 'pointer' }}
              >
                Admin
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
