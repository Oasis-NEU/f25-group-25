import Dashboard from "./pages/dashboard"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/landing";
import Settings from "./pages/settings";
import Login from "./pages/login";
import AddFriends from "./pages/add_contacts";
import Signup from "./pages/signup";
import Debts from './pages/debts'
import { DebtProvider } from './contexts/DebtContext'
import TestSupabase from './components/TestSupabase'
import ForgotPassword from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPassword";
import VenmoIntegration from "./assets/VenmoIntegration";
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { supabase } from './config/supabase';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <DebtProvider>
        <TestSupabase />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />
          <Route path='/settings' element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path='/add_contacts' element={
            <ProtectedRoute>
              <AddFriends />
            </ProtectedRoute>
          } />
          <Route path='/debts' element={
            <ProtectedRoute>
              <Debts />
            </ProtectedRoute>
          } />
          <Route path='/pay' element={
            <ProtectedRoute>
              <VenmoIntegration/>
            </ProtectedRoute>
          }/>
        </Routes>
      </DebtProvider>
    </BrowserRouter>
  )
}

export default App