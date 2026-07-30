'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem('auth') === 'true'
      if (stored !== isAuthenticated) setIsAuthenticated(stored)
    }, 0)
  }, [isAuthenticated])

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
