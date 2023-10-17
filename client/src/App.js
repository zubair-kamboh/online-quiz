import './App.css'
import './styles/style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import StudentRegistration from './pages/StudentRegistration'
import TutorLogin from './pages/TutorLogin'
import TutorRegistration from './pages/TutorRegistration'
import AdminProfile from './pages/AdminProfile'
import AdminSignin from './pages/AdminSignin'
import StudentProfile from './pages/StudentProfile'
import TutorProfile from './pages/TutorProfile'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminSignin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegistration />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/tutor/register" element={<TutorRegistration />} />
          <Route path="/tutor/profile" element={<TutorProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
