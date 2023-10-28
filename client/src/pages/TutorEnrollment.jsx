import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const TutorEnrollment = () => {
  const [grade, setGrade] = useState('8th')
  const [subject, setSubject] = useState('Mathematics')
  const [date, setDate] = useState(null)
  const [method, setMethod] = useState('FCFS')
  const [qualification, setQualification] = useState('')
  const [time, setTime] = useState('03:30 - 04:30')
  const [tutor, setTutor] = useState({})
  const [tutorEnrollments, setTutorEnrollments] = useState([])

  useEffect(() => {
    const tutor = localStorage.getItem('tutor')
    if (tutor) {
      setTutor(JSON.parse(tutor))
    }
  }, [])

  const listTutorEnrollments = async () => {
    try {
      const response = await fetch('http://localhost:8000/tutor/enrollment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setTutorEnrollments(data)
        console.log(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    listTutorEnrollments()
  }, [])

  const handleGrade = (e) => {
    setGrade(e.target.value)
  }

  const handleSubject = (e) => {
    setSubject(e.target.value)
  }

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleMethod = (e) => {
    setMethod(e.target.value)
  }

  const handleQualification = (e) => {
    setQualification(e.target.value)
  }
  const handleTime = (e) => {
    setTime(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/tutor/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grades: grade,
          subjects: subject,
          date,
          method: method,
          time,
          qualifications: qualification,
          teacherId: tutor && tutor._id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data)
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
        <h1>Tutor Enrolment</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div class="apply_row">
            <div>
              <div>Grade</div>
              <select
                onChange={handleGrade}
                class="apply_input"
                name="tgrade"
                id="tgrade"
              >
                <option value="8th" selected>
                  8th
                </option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <div>
              <div>Subject</div>
              <select
                onChange={handleSubject}
                class="apply_input"
                name="tsubject"
                id="tsubject"
              >
                <option value="Mathematics" selected>
                  Mathematics
                </option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>
          <div class="apply_row">
            <div>
              <div>Date</div>

              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MM/dd/yyyy"
                minDate={new Date()}
                name="date"
                id="studate"
                required
                placeholderText="enter date"
              />
            </div>
            <div>
              <div>Tutoring Method</div>
              <select
                onChange={handleMethod}
                class="apply_input"
                name="tutor_method"
                id="tutor_method"
              >
                <option value="FCFS" selected>
                  FCFS
                </option>
                <option value="Drop-in">Drop-in</option>
              </select>
            </div>
          </div>
          <div class="apply_row">
            <div>
              <div>Qualifications</div>
              <input
                onChange={handleQualification}
                type="text"
                className="apply_input"
              />
            </div>
            <div>
              <div>Time</div>
              <select
                onChange={handleTime}
                class="apply_input"
                name="ttime"
                id="ttime"
              >
                <option value="03:30 - 04:30" selected>
                  03:30 - 04:30
                </option>
                <option value="04:30 - 05:30">04:30 - 05:30</option>
              </select>
            </div>
          </div>
          <div class="apply_btn">
            <button type="submit">Confirm & Enrol</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>
      <div class="apply_container">
        <div class="tutor_table">
          <table class="tutor_timetable">
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Tutor Information</th>
              <th>Method</th>
              <th>Timing</th>
            </tr>
            {tutorEnrollments &&
              tutorEnrollments.map((enrollment) => {
                return (
                  <tr>
                    <td>{enrollment.subjects}</td>
                    <td>{`${new Date(enrollment.date).getDate()}-${
                      new Date(enrollment.date).getMonth() + 1
                    }-${new Date(enrollment.date).getFullYear()}`}</td>
                    <td>{enrollment.teacherId.fullname}</td>
                    <td>{enrollment.method}</td>
                    <td>{enrollment.time}</td>
                  </tr>
                )
              })}
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TutorEnrollment
