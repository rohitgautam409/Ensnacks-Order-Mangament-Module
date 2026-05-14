/**
 * Admin dashboard — placeholder showing logged-in admin info.
 * Full product management and order features built in F-02.
 */

'use client'
import { useEffect, useState } from "react"


export default function AdminDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('ensnacks_user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div>

      <h1 className="text-3xl font-bold text-[#1F2937]">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to Ensnacks Admin Panel
      </p>

    </div>
  )
}
