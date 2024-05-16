import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminStatisticsSideButtons from '../components/AdminStatisticsSideButtons'

const StudentdsEachSession = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    handleSessionStudents()
  }, [])

  const handleSessionStudents = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/students-attendants',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
          <div
            class="apply_container"
            style={{ margin: '0px', padding: '0px', width: '100%' }}
          >
            <div class="tutor_table" style={{ width: '100%' }}>
              <table class="tutor_timetable" style={{ width: '100%' }}>
                <tr>
                  <th>Tutor Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Number of Students</th>
                </tr>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr>
                      <td>{student.tutor}</td>
                      <td>{student.subjects}</td>
                      <td>{`${new Date(student.date).getDate()}-${
                        new Date(student.date).getMonth() + 1
                      }-${new Date(student.date).getFullYear()}`}</td>
                      <td>{student.time}</td>
                      <td>{student.totalStudents}</td>
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
