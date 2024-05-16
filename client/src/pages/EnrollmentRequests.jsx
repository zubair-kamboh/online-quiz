import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const EnrollmentRequests = () => {
  const [enrollmentRequests, setEnrollmentRequests] = useState([])

  const getTutorRequests = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/get-tutor-requests',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        setEnrollmentRequests(data)
        console.log(data[1].enrollment.length > 0)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    getTutorRequests()
  }, [])

  // accept tutor request
  const acceptTutorReq = async (email) => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/accept-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
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

  // decline tutor request
  const declineTutorReq = async (email, teacher) => {
    console.log(teacher)
    try {
      const response = await fetch(
        'http://localhost:8000/management/decline-request',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, id: teacher._id }),
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

  return (
    <>
      <Header admin={true} />
      <h1 class="tutor_profile_header">Tutor Enrollment Requests</h1>

      {enrollmentRequests.map((teacher) => {
        return (
          <div class="profile_container" key={teacher._id}>
            <h3>Teacher Name: {teacher.fullname}</h3>
            <div>
              <p class="Course_Enrolled">
                Qualification:{' '}
                {teacher.enrollment.length > 0
                  ? teacher.enrollment[0].qualifications
                  : 'N/A'}
              </p>
              <p class="Course_Enrolled">
                Grade:{' '}
                {teacher.enrollment.length > 0
                  ? teacher.enrollment[0].grades
                  : 'N/A'}
              </p>
              <p class="Course_Enrolled">
                Course:{' '}
                {teacher.enrollment.length > 0
                  ? teacher.enrollment[0].subjects
                  : 'N/A'}
              </p>

              <div className="enrollment_requests_btns">
                <button
                  style={{ marginBottom: 0, padding: '10px 17px' }}
                  onClick={() => acceptTutorReq(teacher.email)}
                >
                  Accept
                </button>
                <button
                  style={{
                    marginBottom: 0,
                    padding: '10px 17px',
                    marginLeft: '8px',
                  }}
                  onClick={() => declineTutorReq(teacher.email, teacher)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )
      })}
      <Footer />
    </>
  )
}

export default EnrollmentRequests
