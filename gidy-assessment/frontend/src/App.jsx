import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'

// 1. Extract your routes into a child component so we can use useNavigate
function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  // 2. Listen for Auth0 to finish loading and check if the user is logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // 3. Push them to the profile page (replace: true removes the login page from back history)
      navigate('/profile', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// 4. Wrap everything in the Router here
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}