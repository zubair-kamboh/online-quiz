import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const TutorCoursePortal = () => {
  return (
    <>
      <Header tutor={true} />
      <h1 class="tutor_profile_header">Tutor Course Portal</h1>
      <div class="profile_container">
        <h3>Courses Tutoring</h3>
        <div>
          <ul id="tutor_course_tutoring">
            <li>Mathematics</li>
            <li>Physics</li>
          </ul>
        </div>
      </div>
      <div class="profile_container">
        <h3>Course Statistics</h3>
        <div>
          <ul id="tutor_course_statistics">
            <li>
              Total No: of students enrolled: <p></p>
            </li>
            <li>
              Average number of students in each course: <p></p>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TutorCoursePortal
