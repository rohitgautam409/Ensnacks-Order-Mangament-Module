/**
 * Axios instance for Ensnacks Express backend.
 * Auto-attaches JWT token from localStorage to every request.
 * Base URL comes from NEXT_PUBLIC_API_URL environment variable.
 */

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use((config) => {

  if (typeof window !== 'undefined') {

    const token = localStorage.getItem('ensnacks_token')

    if (token) {
      config.headers = config.headers || {}

      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

// Response interceptor
api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      if (typeof window !== 'undefined') {

        localStorage.removeItem('ensnacks_token')
        localStorage.removeItem('ensnacks_user')

        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
