import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useEffect, useState } from 'react'

const StudentRegistry = () => {
  const [students, setStudents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/students',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        'http://localhost:8000/management/student/delete',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId: id }),
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
        <h1>Student Registry</h1>
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
              {students.length > 0
                ? students.map((student) => (
                    <tr>
                      <td>{student.fullname}</td>
                      <td>{student.school}</td>
                      <td>{student.address}</td>
                      <td>
                        <div className="apply_btn">
                          <button
                            type="button"
                            style={{ padding: '8px', fontSize: '15px' }}
                            onClick={() =>
                              navigate('/admin/student/edit', {
                                state: { student },
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
                            onClick={() => handleDelete(student._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : 'No Students Found'}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentRegistry
