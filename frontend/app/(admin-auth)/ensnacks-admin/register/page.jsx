/**
 * Admin signup page — creates new Ensnacks staff accounts.
 * URL: /ensnacks-admin/register (secret — not linked from client pages)
 * Calls POST /api/auth/admin/signup directly via axios.
 */

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import Image from 'next/image'
import companyImg from '@/assets/company-logo.png'

export default function AdminRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    companyName: 'Ensnacks',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required'
    }
    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post('/api/auth/admin/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        phone: formData.phone
      })

      if (response.status === 201 || response.status === 200) {
        setSuccess(true)
        setTimeout(() => router.push('/ensnacks-admin'), 2000)
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.error || 'Registration failed' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3A25] to-[#0f2318] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F1E2D1] border-2 border-[#5A1E08] rounded-full flex items-center justify-center text-3xl">
            <Image src={companyImg} alt="company-logo" width={50} height={50} />
          </div>
          <h1 className="text-2xl font-bold text-[#2D6A4F] mt-4">Ensnacks</h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Staff Registration</p>
        </div>

        {success ? (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-center font-medium">✅ Staff account created! Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-gray-100"
                readOnly
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Staff Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '🙈' : '👁'}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2D6A4F] text-white rounded-lg py-3 mt-6 font-semibold hover:bg-[#1a5c3a] transition disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Staff Account'
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already registered? </span>
          <Link href="/ensnacks-admin" className="text-[#2D6A4F] font-medium hover:underline">
            Login here →
          </Link>
        </div>
      </div>
    </div>
  )
}
