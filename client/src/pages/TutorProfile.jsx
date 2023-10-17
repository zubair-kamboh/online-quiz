import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const TutorProfile = () => {
  const [tutorProfileData, setTutorProfileData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const tutor = localStorage.getItem('tutor')
    if (tutor) {
      setTutorProfileData(JSON.parse(tutor))
    } else {
      navigate('/tutor/login')
    }
  }, [])

  console.log(tutorProfileData)

  return (
    <>
      <Header tutor={true} />
      <h1 class="tutor_profile_header" style={{ marginTop: 10 }}>
        Tutor Profile
      </h1>
      {tutorProfileData ? (
        <div class="profile_container">
          <div class="profile_container_rows">
            <h3>Full Name : </h3>
            <p id="tutor_profile_fname">{tutorProfileData.fullname}</p>
          </div>
          <div class="profile_container_rows">
            <h3>Address : </h3>
            <p id="tutor_profile_addr">{tutorProfileData.address}</p>
          </div>
          <div class="profile_container_rows">
            <h3>School : </h3>
            <p id="tutor_profile_school">{tutorProfileData.school}</p>
          </div>
          <div class="profile_container_rows">
            <h3>Email ID : </h3>
            <p id="tutor_profile_email">{tutorProfileData.email}</p>
          </div>
        </div>
      ) : (
        <h1>Tutor not signed in!</h1>
      )}
      <Footer />
    </>
  )
}

export default TutorProfile
