/**
 * Client login page — ONLY for corporate clients.
 * URL: /login
 * Calls /api/auth/client/login axios.
 * NO mention of admin anywhere on this page — not even a hint.
 */

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

export default function ClientLogin() {
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
        '/api/auth/login',
        { email, password }
      );

      localStorage.setItem('ensnacks_token', res.data.token);
      localStorage.setItem('ensnacks_user', JSON.stringify(res.data.user));
      console.log("login successfull")

      console.log(res.data.user)
      console.log(res.data.token)
      router.push('/products');
      console.log("redirected to products page")

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#2D6A4F] rounded-full flex items-center justify-center text-3xl">
            🥜
          </div>
          <h1 className="text-2xl font-bold text-[#2D6A4F] mt-4">Ensnacks</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
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
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link href="/signup" className="text-[#2D6A4F] font-medium hover:underline">
            Sign up here →
          </Link>
        </div>
      </div>
    </div>
  )
}
