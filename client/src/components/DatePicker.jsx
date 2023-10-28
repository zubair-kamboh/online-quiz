import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const PredefinedDatePicker = ({
  date,
  setDate,
  tutorEnrollments,
  grades,
  subjects,
  setTutorData,
}) => {
  const predefinedDates = []

  if (tutorEnrollments.length > 0) {
    tutorEnrollments.map((enrollment) =>
      predefinedDates.push(new Date(enrollment.date))
    )
  }

  useEffect(() => {
    if (date) {
      fetchTutorData()
    }
  }, [date])

  const fetchTutorData = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/student/enrollment/get-tutor-data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grades,
            subjects,
            date,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTutorData(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const onChange = async (date) => {
    setDate(date)
  }

  return (
    <DatePicker
      selected={date}
      onChange={(date) => onChange(date)}
      dateFormat="MM/dd/yyyy"
      minDate={new Date()}
      includeDates={predefinedDates}
      name="date"
      id="studate"
      placeholderText="enter date"
      disabled={tutorEnrollments.length > 0 ? false : true}
    />
  )
}

export default PredefinedDatePicker
