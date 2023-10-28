import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

const StudentRegistryEdit = () => {
  const { state } = useLocation()
  const [fullName, setFullName] = useState(state.student.fullname)
  const [address, setAddress] = useState(state.student.address)
  const [school, setSchool] = useState(state.student.school)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8000/management/student/edit',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: state.student._id,
            fullname: fullName,
            address,
            school,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert(data.successMsg)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleResetClick = () => {
    setFullName('')
    setSchool('')
    setAddress('')
  }

  return (
    <>
      <Header admin={true} />
      <div className="apply_container">
        <h1>Student Registry Edit</h1>
        <form onSubmit={handleSubmit}>
          <div className="apply_row">
            <div style={{ width: '80%' }}>
              <div>Full Name</div>
              <input
                style={{ width: '100%' }}
                className="apply_input"
                type="text"
                name="fname"
                id="fname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
          </div>
          <div className="apply_row">
            <div style={{ width: '80%' }}>
              <div>Address</div>
              <input
                style={{ width: '100%' }}
                className="apply_input"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="apply_row">
            <div style={{ width: '80%' }}>
              <div>School</div>
              <input
                style={{ width: '100%' }}
                className="apply_input"
                type="text"
                name="school"
                id="school"
                placeholder="School"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
          <div className="apply_row"></div>
          <div className="apply_btn">
            <button type="submit">Save</button>
            <button type="reset" onClick={handleResetClick}>
              Reset
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default StudentRegistryEdit
