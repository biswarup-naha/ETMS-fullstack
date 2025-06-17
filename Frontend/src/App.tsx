import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './routes/ProtectedRoutes'
import UserDashboard from './pages/UserDashboard'

function App() {

  return (
    <>
    <Toaster reverseOrder={true} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<div>403 - Not Authorized</div>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
