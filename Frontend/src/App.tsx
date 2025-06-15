import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster reverseOrder={true} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
