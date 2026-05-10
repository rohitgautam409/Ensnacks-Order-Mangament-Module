/**
 * Admin layout — wraps all protected admin pages.
 * Shows top navbar with admin name and logout.
 */

'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {

  const router = useRouter();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('ensnacks_user');
    const storedToken = localStorage.getItem('ensnacks_token');

    if (!storedToken || !storedUser) {
      router.push('/ensnacks-admin'); //not logged in
      return

    }

    const parsedUser = JSON.parse(storedUser);

    //role protection
    if (parsedUser.role !== 'admin') {
      router.push('/login') //not admin might be client redirecting him to clients Login
    }
    setUser(parsedUser)
  }, [router])


  const handleLogout = () => {
    localStorage.removeItem('ensnacks_user')
    localStorage.removeItem('ensnacks_token')
    router.push('/ensnacks-admin')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="h-14 bg-[#1A3A25] flex items-center justify-between px-6 shadow-md">
        <div className="text-white font-bold text-lg">
          🥜 Ensnacks Admin
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">
            Hi, {user?.name || 'Admin'}
          </span>
          <button
            onClick={handleLogout}
            className="border border-white text-white hover:bg-white hover:text-[#1A3A25] px-4 py-1 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-6 flex-1">
        {children}
      </main>
    </div>
  )
}
