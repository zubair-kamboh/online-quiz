import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/modal.css'
const AdminCourses = () => {
  const [tutors, setTutors] = useState([])
  const [modal, setModal] = useState(false)

  console.log(tutors)
  const getTutors = async () => {
    try {
      const response = await fetch('http://localhost:8000/management/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setTutors(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    getTutors()
  }, [])

  return (
    <>
      <Header admin={true} />
      <h1 class="tutor_profile_header">Admin Course Portal</h1>
      {tutors.map((teacher) => {
        return (
          <div class="profile_container">
            <h3>
              Teacher Name:{' '}
              <span style={{ fontWeight: 'normal' }}>{teacher.fullname}</span>
            </h3>
            <h3>
              Teacher Subjects:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {teacher.enrollment?.map((elm) => (
                  <p>{`Grade: ${elm.grades}, Subject: ${elm.subjects}`}</p>
                ))}
              </span>
            </h3>
            <div>
              <div className="enrollment_requests_btns">
                <button
                  onClick={() => setModal(true)}
                  style={{ marginBottom: 0, padding: '10px 17px' }}
                >
                  View Details
                </button>
                <Modal modal={modal} teacher={teacher} setModal={setModal} />
              </div>
            </div>
          </div>
        )
      })}{' '}
      <Footer />
    </>
  )
}

const Modal = ({ modal, teacher, setModal }) => {
  return (
    <>
      {modal === true ? (
        <div id="myModal" class="modal" style={{ display: 'block' }}>
          <div class="modal-content">
            <span class="close" onClick={() => setModal(false)}>
              &times;
            </span>
            <h1 style={{ fontSize: '22px' }}>Teacher Information</h1>
            <h1 style={{ fontSize: '22px' }}>
              Full Name:{' '}
              <span style={{ fontWeight: 'normal' }}>{teacher.fullname}</span>
            </h1>
            <h1 style={{ fontSize: '22px' }}>
              Email:{' '}
              <span style={{ fontWeight: 'normal' }}>{teacher.email}</span>
            </h1>
            <h1 style={{ fontSize: '22px' }}>
              School:{' '}
              <span style={{ fontWeight: 'normal' }}>{teacher.school}</span>
            </h1>
          </div>
        </div>
      ) : (
        <div id="myModal" class="modal" style={{ display: 'none' }}>
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminCourses
