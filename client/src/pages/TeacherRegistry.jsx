import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useEffect, useState } from 'react'

const TeacherRegistry = () => {
  const [teachers, setTeachers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/teachers',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTeachers(data)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/teacher/delete',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teacherId: id }),
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
      <div className="apply_container">
        <h1>Teachers Registry</h1>
        <div className="tutor_table">
          <table className="tutor_timetable">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>School</th>
                <th>Address</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0
                ? teachers.map((teacher) => (
                    <tr>
                      <td>{teacher.fullname}</td>
                      <td>{teacher.school}</td>
                      <td>{teacher.address}</td>
                      <td>
                        <div className="apply_btn">
                          <button
                            type="button"
                            style={{ padding: '8px', fontSize: '15px' }}
                            onClick={() =>
                              navigate('/admin/teacher/edit', {
                                state: { teacher },
                              })
                            }
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="apply_btn">
                          <button
                            type="button"
                            style={{ padding: '8px', fontSize: '15px' }}
                            onClick={() => handleDelete(teacher._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : 'No Teachers Found'}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TeacherRegistry
