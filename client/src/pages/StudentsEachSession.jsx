import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminStatisticsSideButtons from '../components/AdminStatisticsSideButtons'

const StudentdsEachSession = () => {
  const [session, setSession] = useState('')
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (session) {
      handleSessionStudents()
    }
  }, [session])

  const handleDropdownChange = async (e) => {
    setSession(e.target.value)
  }

  const handleSessionStudents = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/students-attendants',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        console.log(data)
        setStudents(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Header admin={true} />
      <div class="apply_container">
        <h1>Admin Statistics - Students Each Session</h1>
      </div>
      <div class="statistics_container">
        <AdminStatisticsSideButtons />
        <div class="statistics_display">
          <div>
            <select
              class="apply_input"
              name="tsubject"
              id="tsubject"
              onChange={handleDropdownChange}
              style={{
                width: '100%',
                padding: '8px 20px',
                marginBottom: '20px',
              }}
            >
              <option disabled selected value>
                Select a Session
              </option>
              <option value="03:30 - 04:30">03:30 - 04:30</option>
              <option value="04:30 - 05:30">04:30 - 05:30</option>
            </select>
          </div>
          <div
            class="apply_container"
            style={{ margin: '0px', padding: '0px', width: '100%' }}
          >
            <div class="tutor_table" style={{ width: '100%' }}>
              <table class="tutor_timetable" style={{ width: '100%' }}>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>School</th>
                </tr>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr>
                      <td>{student.studentId.fullname}</td>
                      <td>{student.studentId.email}</td>
                      <td>{student.studentId.address}</td>
                      <td>{student.studentId.school}</td>
                    </tr>
                  ))
                ) : (
                  <tr>No Tutors Data Found</tr>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentdsEachSession
