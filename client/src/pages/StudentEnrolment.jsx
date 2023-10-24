import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import DatePicker from '../components/DatePicker'
import PredefinedDatePicker from '../components/DatePicker'

const StudentEnrolment = () => {
  const [grades, setGrades] = useState('')
  const [subjects, setSubjects] = useState('')
  const [allDates, setAllDates] = useState([])
  const [tutorEnrollments, setTutorEnrollments] = useState([])
  const [tutorData, setTutorData] = useState([])
  const [selectedTutorData, setSelectedTutorData] = useState([])
  const [date, setDate] = useState(null)
  const [tutor, setTutor] = useState('')
  const [method, setMethod] = useState('')
  const [time, setTime] = useState('')
  const [student, setStudent] = useState({})
  const [listTutors, setListTutors] = useState([])

  const tutorEmails = []
  let previousElement = null
  const filteredEmails =
    tutorData &&
    tutorData
      .map((tutor) => {
        if (tutor.teacherId.email === previousElement) {
          return null
        }

        previousElement = tutor.teacherId.email

        return tutor.teacherId.email
      })
      .filter((email) => tutorEmails.push(email))

  useEffect(() => {
    const student = localStorage.getItem('student')
    if (student) {
      setStudent(JSON.parse(student))
    }
  }, [])

  useEffect(() => {
    if (grades && subjects) {
      fetchTutorAvailability()
    }
  }, [subjects, grades])

  useEffect(() => {
    if (grades && subjects && date && tutor) {
      fetchTutorMethodAndTime()
    }
  }, [grades, subjects, date, tutor])

  // list all tutors in table
  useEffect(() => {
    handleListTutors()
  }, [])

  const handleListTutors = async () => {
    try {
      const response = await fetch('http://localhost:8000/tutor/enrollment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.ok) {
        setListTutors(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchTutorAvailability = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/student/enrollment/get',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grades,
            subjects,
          }),
        }
      )

      const data = await response.json()
      if (response.ok) {
        setTutorEnrollments(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchTutorMethodAndTime = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/student/enrollment/get-tutor-method-time',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grades,
            subjects,
            date,
            tutor,
          }),
        }
      )

      const data = await response.json()
      if (response.ok) {
        setSelectedTutorData(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleGradesChange = (e) => {
    setGrades(e.target.value)
  }

  const handleSubjectsChange = (e) => {
    setSubjects(e.target.value)
  }

  const handleTutorChange = (e) => {
    setTutor(e.target.value)
  }

  const handleMethodChange = (e) => {
    setMethod(e.target.value)
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!grades || !subjects || !date || !tutor || !method || !time) {
      alert('Please include all fields')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8000/student/enrollment/save',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grades,
            subjects,
            date,
            tutor,
            time,
            method,
            studentId: student?._id,
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
      <Header student={true} />
      <div class="apply_container">
        <h1>Student Enrolment</h1>
        <form onSubmit={handleSubmit}>
          <div class="apply_row">
            <div>
              <div>Grade</div>
              <select
                class="apply_input"
                name="tgrade"
                id="tgrade"
                onChange={handleGradesChange}
              >
                <option defaultChecked>select an option</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <div>
              <div>Subject</div>
              <select
                class="apply_input"
                name="tsubject"
                id="tsubject"
                onChange={handleSubjectsChange}
                disabled={grades ? false : true}
              >
                <option value="other">select an option</option>
                <option value="Mathematics">Mathematics</option>
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
              <PredefinedDatePicker
                date={date}
                setDate={setDate}
                tutorEnrollments={tutorEnrollments}
                grades={grades}
                subjects={subjects}
                setTutorData={setTutorData}
              />
            </div>
            <div>
              <div>Tutor</div>
              <select
                class="apply_input"
                name="tutor_method"
                id="tutor_method"
                disabled={tutorData.length > 0 ? false : true}
                placeholder="e.g john@gmail.com"
                onChange={handleTutorChange}
              >
                <option defaultChecked>select an option</option>

                {tutorEmails.length > 0
                  ? tutorEmails.map((tutor) => (
                      <option value={tutor}>{tutor}</option>
                    ))
                  : ''}
              </select>
            </div>
          </div>
          <div class="apply_row">
            <div>
              <div>Tutoring Method</div>
              <select
                class="apply_input"
                name="tutor_method"
                id="tutor_method"
                disabled={selectedTutorData.length > 0 ? false : true}
                placeholder="e.g FCFS"
                onChange={handleMethodChange}
              >
                <option defaultChecked>select an option</option>

                {selectedTutorData.length > 0
                  ? selectedTutorData.map((elm) => (
                      <option value={elm.method}>{elm.method}</option>
                    ))
                  : ''}
              </select>
            </div>
            <div>
              <div>Time</div>
              <select
                class="apply_input"
                name="ttime"
                id="ttime"
                disabled={selectedTutorData.length > 0 ? false : true}
                placeholder="03:30 - 04:30"
                onChange={handleTimeChange}
              >
                <option defaultChecked>select an option</option>

                {selectedTutorData.length > 0
                  ? selectedTutorData.map((elm) => (
                      <option value={elm.time}>{elm.time}</option>
                    ))
                  : ''}
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
            {listTutors.length > 0
              ? listTutors.map((tutor) => {
                  return (
                    <>
                      <tr>
                        <td>{tutor.subjects}</td>
                        <td>{`${new Date(tutor.date).getDate()}-${
                          new Date(tutor.date).getMonth() + 1
                        }-${new Date(tutor.date).getFullYear()}`}</td>{' '}
                        <td>{tutor.teacherId.email}</td>
                        <td>{tutor.method}</td>
                        <td>{tutor.time}</td>
                      </tr>
                    </>
                  )
                })
              : 'No Tutors Found'}
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentEnrolment
