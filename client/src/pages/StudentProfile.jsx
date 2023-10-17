import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const StudentProfile = () => {
  const [studentProfileData, setStudentProfileData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const student = localStorage.getItem('student')
    if (student) {
      setStudentProfileData(JSON.parse(student))
    } else {
      navigate('/student/login')
    }
  }, [])

  return (
    <>
      <Header student={true} />

      <h1 class="tutor_profile_header" style={{ marginTop: 10 }}>
        Student Profile
      </h1>

      {studentProfileData ? (
        <div class="profile_container">
          <div class="profile_container_rows">
            <h3>Full Name : </h3>
            <p id="tutor_profile_fname">{studentProfileData.fullname}</p>
          </div>
          <div class="profile_container_rows">
            <h3>Address : </h3>
            <p id="tutor_profile_addr">{studentProfileData.address}</p>
          </div>
          <div class="profile_container_rows">
            <h3>School : </h3>
            <p id="tutor_profile_school">{studentProfileData.school}</p>
          </div>
          <div class="profile_container_rows">
            <h3>Email ID : </h3>
            <p id="tutor_profile_email">{studentProfileData.email}</p>
          </div>
        </div>
      ) : (
        <h1>Student is not signed in!</h1>
      )}
      <Footer />
    </>
  )
}

export default StudentProfile
