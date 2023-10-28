import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdminStatisticsSideButtons from '../components/AdminStatisticsSideButtons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/datepicker.css'

const TutorEachDay = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDates, setAvailableDates] = useState([])
  const [tutors, setTutors] = useState([])

  useEffect(() => {
    getAvailableDates()
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetchTutors()
    }
  }, [selectedDate])

  const getAvailableDates = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/tutors-available-dates',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        setAvailableDates(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchTutors = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/stats/tutors-each-day',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: selectedDate }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTutors(data)
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
        <h1>Admin Statistics - Tutors Each Day</h1>
      </div>
      <div class="statistics_container">
        <AdminStatisticsSideButtons />
        <div class="statistics_display">
          <PredefinedDatePicker
            dates={availableDates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div
            class="apply_container"
            style={{
              margin: '0px',
              padding: '0px',
              width: '100%',
              marginTop: '30px',
            }}
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
                {tutors.length > 0 ? (
                  tutors.map((tutor) => (
                    <tr>
                      <td>{tutor.teacherId.fullname}</td>
                      <td>{tutor.teacherId.email}</td>
                      <td>{`${new Date(tutor.date).getDate()}-${
                        new Date(tutor.date).getMonth() + 1
                      }-${new Date(tutor.date).getFullYear()}`}</td>{' '}
                      <td>{tutor.method}</td>
                      <td>{tutor.time}</td>
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

const PredefinedDatePicker = ({ dates, selectedDate, setSelectedDate }) => {
  const predefinedDates = []

  if (dates.length > 0) {
    dates.map((date) => predefinedDates.push(new Date(date.date)))
  }

  return (
    <form autoComplete="off" className="datepicker">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        includeDates={predefinedDates}
        name="date"
        id="studate"
        placeholderText="enter date"
      />
    </form>
  )
}

export default TutorEachDay
