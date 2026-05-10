/**
 * Client products page — placeholder.
 * Full catalog with ordering built in Frontend F-02.
 */

'use client'
import { useEffect, useState } from 'react'

export default function ProductsPage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('ensnacks_user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">
        Hello, {user?.name || 'there'}! 👋
      </h1>
      <p className="text-gray-500 mt-1">
        {user?.companyName || 'Welcome'}
      </p>

      <div className="mt-8 border-2 border-dashed border-[#2D6A4F] rounded-2xl p-12 text-center bg-white shadow-sm">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-[#2D6A4F]">
          Product Catalog
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Browse and order from 1,257+ healthy snacks. Coming in next update.
        </p>
      </div>
    </div>
  )
}
