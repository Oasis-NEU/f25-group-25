import { useState, useEffect } from 'react';
import NavBar from '../assets/navbar';
import DebtTable from "../assets/debttable"
import { Link } from "react-router-dom"
import { supabase } from '../config/supabase';

function Dashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to auth metadata if database fetch fails
      setUserData({
        username: user.user_metadata?.username || 'user',
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || ''
      });
    } finally {
      setLoading(false);
    }
  };

  // Default profile picture
  const defaultProfilePic = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-200">
      <NavBar />
      <div className="bg-white outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5">
        <img 
          className='mt-6 mb-2 object-cover rounded-full h-24 w-24 outline-2 outline-stone-900 bg-slate-200' 
          src={defaultProfilePic}
          alt="Profile"
        />
        <h3 className="mb-2 text-neutral-400 hover:cursor-pointer">
          @<span className="select-all">{userData?.username || 'username'}</span>
        </h3>
        <div className="flex justify-around w-full">
          <div className="flex flex-col justify-center items-center px-4 pb-4">
            <h2>Money owed to you</h2>
            <h2 className="text-maingreen">$200.12</h2>
          </div>
          <div className="flex flex-col justify-center items-center px-4 pb-4">
            <h2>Money you owe</h2>
            <h2 className="text-mainred">$12.00</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-around w-full mt-16">
        <div className="flex flex-col w-full items-center">
          <h1 className="mb-4 text-maingreen">Money Received</h1>
          <DebtTable />
        </div>
        <div className="flex flex-col w-full items-center">
          <h1 className="mb-4 text-mainred">Money Sent</h1>
          <DebtTable />
        </div>
      </div>
      <div className="mt-12">
        <Link to='/pay'>
          <button className="cursor-pointer rounded-full outline-2 w-12 h-12 text-2xl">+</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard