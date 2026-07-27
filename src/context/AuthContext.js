'use client'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function getInitialAuth() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth') === 'true'
  }
  return false
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth)

  const login = () => {
    localStorage.setItem('auth', 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
