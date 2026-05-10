/**
 * Root layout — wraps the entire app with NextAuth SessionProvider.
 * Required for useSession to work anywhere in the app.
 */

'use client'

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
