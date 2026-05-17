/**
 * Admin layout — wraps all protected admin pages.
 * Shows top navbar with admin name and logout.
 */

'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Sidebar from "@/components/sidebar";

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
    <div className="flex min-h-screen bg-gray-300 ">
      <Sidebar />
      <main className=" flex-1 ml-72 w-[calc(100%-18rem)] overflow-x-auto">
        {children}
      </main>
    </div>
  )
}
