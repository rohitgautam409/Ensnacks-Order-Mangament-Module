/**
 * Client layout — wraps all protected client pages.
 * Shows top navbar with client name, company, and logout.
 */

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('ensnacks_token');
    const storedUser = localStorage.getItem('ensnacks_user');
    console.log("layout")
    console.log(storedUser)

    if (!token || !storedUser) {
      router.push('/login');
      return
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'client') {
      router.push('/login')
      return
    }
    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('ensnacks_token');
    localStorage.removeItem('ensnacks_user');
    router.push('/login')
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="h-14 bg-[#2D6A4F] flex items-center justify-between px-6 shadow-md">
        <div className="text-white font-bold text-lg">
          🥜 Ensnacks
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-white text-sm hidden sm:inline-block">
            {user?.name || 'Client'} — {user?.companyName || 'Company'}
          </span>
          <button
            onClick={handleLogout}
            className="border border-white text-white hover:bg-white hover:text-[#2D6A4F] px-4 py-1 rounded-lg text-sm transition"
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
