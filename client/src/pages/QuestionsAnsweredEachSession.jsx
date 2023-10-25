import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminStatisticsSideButtons from '../components/AdminStatisticsSideButtons'

const QuestionsAnsweredEachSession = () => {
  const [tutors, setTutors] = useState([])

  useEffect(() => {
    handleTutors()
  }, [])

  const handleTutors = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/questions-answered',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTutors(data)
        // console.log(data)
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
        <h1>Admin Statistics - Subjects Data</h1>
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
                  <th>Time Taken</th>
                </tr>
                {tutors.length > 0 ? (
                  tutors.map((tutor) => {
                    return (
                      <tr>
                        <td>{tutor.tutor}</td>
                        <td>{tutor.timerCount}</td>
                      </tr>
                    )
                  })
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

export default QuestionsAnsweredEachSession
