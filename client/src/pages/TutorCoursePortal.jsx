import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const TutorCoursePortal = () => {
  const [coursesEnrolled, setCoursesEnrolled] = useState([])
  const [totalStudentsEnrolled, setTotalStudentsEnrolled] = useState('')
  const [averageStudentsEnrolled, setAverageStudentsEnrolled] = useState('')
  const [averageTimeToAnswer, setAverageTimeToAnswer] = useState('')
  const tutor = JSON.parse(localStorage.getItem('tutor'))

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const urls = [
      'http://localhost:8000/tutor/course-portal/courses-tutoring',
      'http://localhost:8000/tutor/course-portal/total-students-enrolled',
      'http://localhost:8000/tutor/course-portal/average-students-enrolled',
      'http://localhost:8000/tutor/course-portal/average-time',
    ]
    const promises = urls.map((url) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tutorEmail: tutor?.email, tutorId: tutor?._id }),
      })
    )

    try {
      const responses = await Promise.all(promises)
      const data = await Promise.all(
        responses.map((response) => response.json())
      )
      setCoursesEnrolled(data[0])
      setTotalStudentsEnrolled(data[1])
      setAverageStudentsEnrolled(data[2])
      setAverageTimeToAnswer(data[3])
    } catch (error) {
      console.error('Error:', error)
    }
  }
  console.log(coursesEnrolled)
  return (
    <>
      <Header tutor={true} />
      <h1 class="tutor_profile_header">Tutor Course Portal</h1>
      <div class="profile_container">
        <h3>Courses Tutoring</h3>
        <div>
          <ul id="tutor_course_tutoring">
            {coursesEnrolled.length > 0
              ? coursesEnrolled[0].enrollment.map((enrollment) => (
                  <>
                    <li>
                      <span>Grade: </span>
                      {enrollment.grades}, <span>Subject: </span>
                      {enrollment.subjects}
                    </li>
                  </>
                ))
              : 'You have not enrolled in any course'}
          </ul>
        </div>
      </div>
      <div class="profile_container">
        <h3>Course Statistics</h3>
        <div>
          <ul id="tutor_course_statistics">
            <li>
              Total No: of students enrolled: {totalStudentsEnrolled?.students}
            </li>
            <li>
              Average number of students in each course:{' '}
              {averageStudentsEnrolled?.averageStudents}
            </li>
            <li>
              Average Time Taken To Answer Each Question:{' '}
              {averageTimeToAnswer?.averageTimeToAnswer}
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TutorCoursePortal
