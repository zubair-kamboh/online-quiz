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
import Payment from './pages/Payment'
import StudentEnrolment from './pages/StudentEnrolment'
import StudentCoursePortal from './pages/StudentCoursePortal'
import TutorTutorialPortal from './pages/TutorTutorialPortal'
import PaymentStatus from './pages/PaymentStatus'
import TutorEnrollment from './pages/TutorEnrollment'
import EnrollmentRequests from './pages/EnrollmentRequests'
import AdminCourses from './pages/AdminCourses'
import AdminStatistics from './pages/AdminStatistics'
import TutorCoursePortal from './pages/TutorCoursePortal'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminSignin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/enrollment-requests"
            element={<EnrollmentRequests />}
          />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/statistics" element={<AdminStatistics />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegistration />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/payment" element={<Payment />} />
          <Route path="/student/payment-status" element={<PaymentStatus />} />
          <Route path="/student/enrollment" element={<StudentEnrolment />} />
          <Route
            path="/student/course-portal"
            element={<StudentCoursePortal />}
          />
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/tutor/register" element={<TutorRegistration />} />
          <Route path="/tutor/profile" element={<TutorProfile />} />
          <Route path="/tutor/course-portal" element={<TutorCoursePortal />} />
          <Route
            path="/tutor/tutorial-portal"
            element={<TutorTutorialPortal />}
          />
          <Route path="/tutor/enrollment" element={<TutorEnrollment />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
