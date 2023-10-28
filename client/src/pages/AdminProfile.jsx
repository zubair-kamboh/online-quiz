import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const AdminProfile = () => {
  const [adminProfileData, setAdminProfileData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (admin) {
      setAdminProfileData(JSON.parse(admin))
    } else {
      navigate('/admin/login')
    }
  }, [])

  return (
    <>
      <Header admin={true} />
      <h1 class="tutor_profile_header" style={{ marginTop: 10 }}>
        Admin Profile
      </h1>
      {adminProfileData ? (
        <div class="profile_container">
          <div class="profile_container_rows">
            <h3>Title : </h3>
            <p id="tutor_profile_fname">Admin</p>
          </div>
          <div class="profile_container_rows">
            <h3>ID : </h3>
            <p id="tutor_profile_addr">{adminProfileData._id}</p>
          </div>
          <div class="profile_container_rows">
            <h3>Email : </h3>
            <p id="tutor_profile_email">{adminProfileData.email}</p>
          </div>
        </div>
      ) : (
        <h1>Admin needs to signin first</h1>
      )}
      <Footer />
    </>
  )
}

export default AdminProfile
