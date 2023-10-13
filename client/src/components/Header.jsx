import React from 'react'
import logo from '../images/flogo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
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
