/**
 * Client layout — wraps all protected client pages.
 * Shows top navbar with client name, company, and logout.
 */

'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
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
      <nav className="h-14 bg-[#2D6A4F] flex items-center justify-between px-6 shadow-md relative z-50">
        <div className="flex items-center gap-8">
          <div className="text-white font-bold text-lg">
            🥜 Ensnacks
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-white text-sm">
            <Link 
              href="/products" 
              className={`hover:text-green-200 transition ${pathname === '/products' ? 'underline font-semibold' : ''}`}
            >
              📦 Products
            </Link>
            <Link 
              href="/orders" 
              className={`hover:text-green-200 transition ${pathname === '/orders' ? 'underline font-semibold' : ''}`}
            >
              📋 My Orders
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-white text-sm font-medium leading-tight">
              {user?.name || 'Client'}
            </span>
            <span className="text-white/70 text-xs leading-tight">
              {user?.companyName || 'Company'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white text-white hover:bg-white hover:text-[#2D6A4F] px-4 py-1 rounded-lg text-sm transition font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
