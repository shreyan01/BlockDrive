import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Auth from '../components/Auth'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  if (!session) {
    return <Auth />
  }

  return (
    <div>
      <p>Welcome, {session.user.email}</p>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  )
}