/**
 * Root page — immediately redirects to /login (client login).
 * Admin never lands here — they know to go to /ensnacks-admin directly.
 */

import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/login')
}
