import './App.css'
import AdminSignIn from './pages/AdminSignIn'
import './index.css'
import './dashboard.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserDashboard from './pages/UserDashboard'
import CPPHomePage from './pages/CPPHomePage'
import CPPAnnouncementPage from './pages/CPPAnnouncementPage'
import CPPSyllabusPage from './pages/CPPSyllabusPage'
import CPPModulePage from './pages/CPPModulePage'
import CPPQuizzesPage from './pages/CPPQuizzesPage'
import CPPQuiz from './pages/CPPQuiz'
import CPPGrades from './pages/CPPGrades'
import AdminDashboard from './pages/AdminDashboard'
import AdminAnnouncement from './pages/AdminAnnouncement'
import AdminSyllabus from './pages/AdminSyllabus'
import AdminModule from './pages/AdminModule'
import AdminQuiz from './pages/AdminQuiz'
import PythonModulePage from './pages/PythonModulePage'
import PythonQuizzesPage from './pages/PythonQuizzesPage'
import PythonQuiz from './pages/PythonQuiz'
import PythonGrades from './pages/PythonGrades'
import JavaHomePage from './pages/JavaHomePage'
import JavaAnnouncementPage from './pages/JavaAnnouncementPage'
import JavaSyllabusPage from './pages/JavaSyllabusPage'
import JavaModulePage from './pages/JavaModulePage'
import JavaQuizzesPage from './pages/JavaQuizzesPage'
import JavaGrades from './pages/JavaGrades'
import PythonHomePage from './pages/PythonHomePage'
import PythonAnnouncementPage from './pages/PythonAnnouncementPage'
import PythonSyllabusPage from './pages/PythonSyllabusPage'
import JavaQuiz from './pages/JavaQuiz'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/announcement-page"
            element={<AdminAnnouncement />}
          />
          <Route path="/admin/syllabus-page" element={<AdminSyllabus />} />
          <Route path="/admin/module-page" element={<AdminModule />} />
          <Route path="/admin/quizzes-page" element={<AdminQuiz />} />

          <Route path="/user/login" element={<UserSignIn />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/cpp-home-page" element={<CPPHomePage />} />
          <Route
            path="/user/cpp-announcement-page"
            element={<CPPAnnouncementPage />}
          />
          <Route path="/user/cpp-syllabus-page" element={<CPPSyllabusPage />} />
          <Route path="/user/cpp-module-page" element={<CPPModulePage />} />
          <Route path="/user/cpp-quizzes-page" element={<CPPQuizzesPage />} />
          <Route path="/user/cpp-quizzes-page/quiz" element={<CPPQuiz />} />
          <Route path="/user/cpp-grades-page" element={<CPPGrades />} />

          <Route path="/user/python-home-page" element={<PythonHomePage />} />
          <Route
            path="/user/python-announcement-page"
            element={<PythonAnnouncementPage />}
          />
          <Route
            path="/user/python-syllabus-page"
            element={<PythonSyllabusPage />}
          />
          <Route
            path="/user/python-module-page"
            element={<PythonModulePage />}
          />
          <Route
            path="/user/python-quizzes-page"
            element={<PythonQuizzesPage />}
          />
          <Route
            path="/user/python-quizzes-page/quiz"
            element={<PythonQuiz />}
          />
          <Route path="/user/python-grades-page" element={<PythonGrades />} />

          <Route path="/user/java-home-page" element={<JavaHomePage />} />
          <Route
            path="/user/java-announcement-page"
            element={<JavaAnnouncementPage />}
          />
          <Route
            path="/user/java-syllabus-page"
            element={<JavaSyllabusPage />}
          />
          <Route path="/user/java-module-page" element={<JavaModulePage />} />
          <Route path="/user/java-quizzes-page" element={<JavaQuizzesPage />} />
          <Route path="/user/java-quizzes-page/quiz" element={<JavaQuiz />} />
          <Route path="/user/java-grades-page" element={<JavaGrades />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
