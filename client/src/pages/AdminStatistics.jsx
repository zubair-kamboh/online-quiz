import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminStatisticsSideButtons from '../components/AdminStatisticsSideButtons'

const AdminStatistics = () => {
  const [subject, setSubject] = useState('')
  const [subjectsData, setSubjectsData] = useState([])

  useEffect(() => {
    if (subject) {
      handleSubjectsData()
    }
  }, [subject])

  const handleDropdownChange = async (e) => {
    setSubject(e.target.value)
  }

  const handleSubjectsData = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/subjects-data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subjects: subject }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setSubjectsData(data)
        console.log(data)
      } else {
        alert(data.message)
        setSubjectsData([])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Header admin={true} />
      <div class="apply_container">
        <h1>Admin Statistics - Subjects Data</h1>
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
                Select a Subject
              </option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>
          <div
            class="apply_container"
            style={{ margin: '0px', padding: '0px', width: '100%' }}
          >
            <div class="tutor_table" style={{ width: '100%' }}>
              <table class="tutor_timetable" style={{ width: '100%' }}>
                <tr>
                  <th>Tutor Name</th>
                  <th>Tutor Email</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Timing</th>
                </tr>
                {subjectsData.length > 0 ? (
                  subjectsData.map((subject) => (
                    <tr>
                      <td>{subject.teacherId?.fullname}</td>
                      <td>{subject.teacherId?.email}</td>
                      <td>{`${new Date(subject.date).getDate()}-${
                        new Date(subject.date).getMonth() + 1
                      }-${new Date(subject.date).getFullYear()}`}</td>{' '}
                      <td>{subject.method}</td>
                      <td>{subject.time}</td>
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

export default AdminStatistics
