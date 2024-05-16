import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/tutorialportal.css'
import usegetProfile from '../hooks/usegetProfile'
import { useNavigate } from 'react-router-dom'

const TutorTutorialPortal = () => {
  const [grade, setGrade] = useState('8th')
  const [course, setCourse] = useState('Mathematics')
  const [question, setQuestion] = useState('')
  const [tutor, setTutor] = useState({})
  const [students, setStudents] = useState([])
  const [timerValue, setTimerValue] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const navigate = useNavigate()

  const startTimer = () => {
    if (!question) {
      alert('The question field cannot be empty!')
      return
    }
    setIsTimerRunning(true)
    const intervalId = setInterval(() => {
      setTimerValue((prevValue) => prevValue + 1)
    }, 1000)

    setIsTimerRunning(intervalId)
  }

  const stopTimer = async ({ student, question }) => {
    if (!question) {
      alert('The question field cannot be empty!')
      return
    }

    setIsTimerRunning(false)
    clearInterval(isTimerRunning)
    try {
      const response = await fetch(
        'http://localhost:8000/tutor/tutorial-portal/save-time-question',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timer: timerValue,
            tutorEmail: JSON.parse(localStorage.getItem('tutor')).email,
            studentEnrollmentID: student._id,
            question,
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

    setTimerValue(0)
  }

  usegetProfile()
  useEffect(() => {
    setTutor(JSON.parse(localStorage.getItem('tutor')))
  }, [])
  console.log(students)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!grade || !course) {
      alert('Please select grade & course')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8000/tutor/tutorial-portal/get-students',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grades: grade,
            subjects: course,
            teacherEmail: tutor?.email,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setStudents(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // delete absent students
  const deleteAbsentStudent = async ({ student, grades, subjects }) => {
    try {
      const response = await fetch(
        'http://localhost:8000/tutor/tutorial-portal/delete-absent-student',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: student.studentId._id,
            grades: grade,
            subjects: course,
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

  return (
    <>
      <Header tutor={true} />

      <div class="apply_container">
        <h1>Tutorial Portal</h1>
        <form onSubmit={onSubmit}>
          <div
            class="apply_row"
            style={{ marginTop: 30, justifyContent: 'space-between' }}
          >
            <div>
              <div>Course</div>
              <select
                onChange={(e) => setCourse(e.target.value)}
                class="apply_input"
                name="tsubject"
                id="tsubject"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <div>Grade</div>
              <select
                onChange={(e) => setGrade(e.target.value)}
                class="apply_input"
                name="tsubject"
                id="tsubject"
              >
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
          </div>
          <div class="get_students_btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        {isTimerRunning ? (
          <h1 style={{ textAlign: 'center' }}>
            {`Timer: ${timerValue} seconds`}
          </h1>
        ) : (
          ''
        )}

        {students?.map((student) => {
          return (
            <div class="tutorial_container">
              <form>
                <p>{student.studentId.fullname}</p>
                <div>
                  <textarea
                    style={{ width: '100%' }}
                    rows="10"
                    placeholder="Comments"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>
                <div class="tutorial_btn">
                  <button type="button" onClick={startTimer}>
                    Start Session
                  </button>
                  <button
                    type="button"
                    onClick={() => stopTimer({ student, question })}
                  >
                    End Session
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAbsentStudent({ student })}
                  >
                    Student Absent
                  </button>
                </div>
              </form>
            </div>
          )
        })}
      </div>

      <Footer />
    </>
  )
}
export default TutorTutorialPortal
