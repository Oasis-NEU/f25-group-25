import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

export default function UserProfile() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data, error } = await supabase
          .from('user_data')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Profile</h2>
          <p>Username: {userData?.username}</p>
          <p>Email: {userData?.email}</p>
        </div>
      )}
    </div>
  )
}