import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminStatisticsSideButtons = () => {
  const navigate = useNavigate()
  return (
    <div class="statistics_buttons">
      <div class="statistics_btn">
        <button
          type="button"
          onClick={() => navigate('/admin/statistics/subjects-data')}
        >
          Subject Data
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/statistics/tutors-each-day')}
        >
          Number of Tutors Each Day
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/statistics/students-each-session')}
        >
          Number of Students Attending Each Sesssion
        </button>
        <button
          type="button"
          onClick={() =>
            navigate('/admin/statistics/question-answered-in-each-session')
          }
        >
          Number of Questions Answered
        </button>
      </div>
    </div>
  )
}

export default AdminStatisticsSideButtons
