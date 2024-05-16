import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const StudentCoursePortal = () => {
  const [currentCourses, setCurrentCourses] = useState([])
  const studentSubjects = []
  let previousElement = null

  useEffect(() => {
    listCurrentCourses()
  }, [])

  const listCurrentCourses = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/student/student-course-portal/current-courses',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: JSON.parse(localStorage.getItem('student')),
          }),
        }
      )

      const data = await response.json()
      if (response.ok) {
        setCurrentCourses(data)
      } else {
        // alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredSubjects =
    currentCourses.length > 0 &&
    currentCourses
      .map((course) => {
        if (course.subjects === previousElement) {
          return null
        }

        previousElement = course.subjects

        return course.subjects
      })
      .filter((subjects) => studentSubjects.push(subjects))

  return (
    <>
      <Header student={true} />

      <h1 class="tutor_profile_header">Student Course Portal</h1>
      <div class="profile_container">
        <h3>Course Enrolled</h3>
        {studentSubjects.length > 0
          ? studentSubjects.map((course) => {
              return (
                <div>
                  <p class="Course_Enrolled">{course}</p>
                </div>
              )
            })
          : 'No courses enrolled'}
      </div>

      <Footer />
    </>
  )
}

export default StudentCoursePortal
