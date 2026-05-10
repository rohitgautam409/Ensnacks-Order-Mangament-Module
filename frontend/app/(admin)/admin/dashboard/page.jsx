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
      <div className="flex items-center space-x-3 mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          ADMIN
        </span>
      </div>
      <p className="text-gray-600 mb-8">
        Welcome back, {user?.name || 'Staff'} 👋
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-[#2D6A4F]">
          <div className="text-3xl mb-3">📦</div>
          <h2 className="text-lg font-bold text-gray-800">Product Management</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Add, edit, delete products. Import Excel portfolio.
          </p>
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Coming next
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-blue-500">
          <div className="text-3xl mb-3">📋</div>
          <h2 className="text-lg font-bold text-gray-800">Order Management</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            View all client orders and update delivery status.
          </p>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Coming soon
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-purple-500">
          <div className="text-3xl mb-3">👥</div>
          <h2 className="text-lg font-bold text-gray-800">Client Management</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            View and manage all registered client accounts.
          </p>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Coming soon
          </span>
        </div>
      </div>
    </div>
  )
}
