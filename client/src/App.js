import './App.css'
import './styles/style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import StudentLogin from './pages/StudentLogin'
import StudentRegistration from './pages/StudentRegistration'
import TutorLogin from './pages/TutorLogin'
import TutorRegistration from './pages/TutorRegistration'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegistration />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/tutor/register" element={<TutorRegistration />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
