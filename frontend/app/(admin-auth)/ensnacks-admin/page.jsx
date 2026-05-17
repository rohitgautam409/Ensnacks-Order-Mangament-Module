/**
 * Admin login page — ONLY for Ensnacks internal team.
 * URL: /ensnacks-admin (secret — not linked from client pages)
 * Calls /api/auth/admin/login via axios
 * Different visual design from client pages — clearly internal tool.
 */

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import companyImg from '@/assets/company-logo.png'
import Image from 'next/image'


export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await api.post(
        '/api/auth/admin/login',
        { email, password }
      );

      localStorage.setItem('ensnacks_token', res.data.token);
      localStorage.setItem('ensnacks_user', JSON.stringify(res.data.user))



      console.log("admin login successfull")
      router.push('/admin/dashboard');

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
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
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Staff Portal </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Staff Email</label>
            <input
              type="email"
              placeholder="you@ensnacks.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              required
            />
          </div>

          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 mt-1 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

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
                Logging in...
              </>
            ) : (
              'Login to Admin Panel'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Need an admin account? </span>
          <Link href="/ensnacks-admin/register" className="text-[#2D6A4F] font-medium hover:underline">
            Register here →
          </Link>
        </div>
      </div>
    </div>
  )
}
