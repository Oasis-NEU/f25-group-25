import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

export default function TestSupabase() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test the connection
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        
        // Test connection to User Data table (matching your exact table name)
        const { data: userData, error: userError } = await supabase
          .from('User Data')
          .select('*')
          .limit(1);
          
        if (userError) {
          console.error('User Data table error:', userError);
          throw userError;
        }

        console.log('Successfully connected to User Data table:', userData);

        // Test connection to User Debts table
        const { data: debtData, error: debtError } = await supabase
          .from('User Debts')
          .select('*')
          .limit(1);

        if (debtError) {
          console.error('User Debts table error:', debtError);
          throw debtError;
        }

        console.log('Successfully connected to User Debts table:', debtData);

        // Test connection to User Friends table
        const { data: friendData, error: friendError } = await supabase
          .from('User Friends')
          .select('*')
          .limit(1);

        if (friendError) {
          console.error('User Friends table error:', friendError);
          throw friendError;
        }

        console.log('Successfully connected to User Friends table:', friendData);
        console.log('All database connections successful!');
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      }
    }

    testConnection();

    // Subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      {/* <h2 style={{ margin: '0 0 10px 0' }}>Supabase Test</h2>
      {error ? (
        <p style={{ color: 'red', margin: '5px 0' }}>Error: {error}</p>
      ) : (
        <p style={{ margin: '5px 0' }}>Check the console for connection status</p>
      )}
      <div>
        <h3 style={{ margin: '10px 0 5px 0' }}>Auth Status:</h3>
        <p style={{ margin: '0' }}>{session ? 'Logged in' : 'Not logged in'}</p>
      </div> */}
    </div>
  );
}