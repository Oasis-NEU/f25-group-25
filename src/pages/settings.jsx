import NavBar from '../assets/navbar';
import { Link, useNavigate } from "react-router-dom"
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

function Settings() {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: ''
    });
    const [newPassword, setNewPassword] = useState('');

    const defaultProfilePic = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            setUserData({
                firstName: data.first_name || '',
                lastName: data.last_name || '',
                username: data.username || '',
                email: data.email || ''
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log('Selected file:', selectedFile.name);
            // TODO: Implement profile picture upload to Supabase Storage
            setError('Profile picture upload coming soon!');
        }
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            // Update user data in database
            const { error: dbError } = await supabase
                .from('users')
                .update({
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    username: userData.username,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (dbError) throw dbError;

            // Update password if provided
            if (newPassword) {
                if (newPassword.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }

                const { error: passwordError } = await supabase.auth.updateUser({
                    password: newPassword
                });

                if (passwordError) throw passwordError;
                setNewPassword('');
            }

            setSuccess('Changes saved successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-radial from-[#fffbf6] from-20% to-offwhite">
            <NavBar />
            <div className="flex flex-col items-center mx-auto outline-2 w-8/12 my-12 rounded-sm bg-white">
                <div className="flex justify-between items-center h-24 w-full my-10 px-4">
                    <div className="flex-1"></div>
                    <h1 className="text-4xl flex-1 text-center">Profile Info</h1>
                    <div className="flex-1 flex justify-end"></div>
                </div>

                {error && (
                    <div className="w-2/3 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="w-2/3 mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {success}
                    </div>
                )}

                <div className="flex items-center justify-between rounded-2xl w-4/9 mb-6">
                    <div className="flex flex-col items-center">
                        <img 
                            className='my-2 object-cover rounded-full h-18 w-18 outline-2 outline-stone-900 bg-slate-200' 
                            src={defaultProfilePic}
                            alt="Profile"
                        />
                        <h1 className="select-all cursor-pointer text-neutral-400">@{userData.username}</h1>
                    </div>
                    <input
                        type='file'
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <button 
                        onClick={handleButtonClick} 
                        className='cursor-pointer outline-2 py-2 px-4 rounded-md hover:bg-slate-700 hover:text-white transition-all hover:outline-slate-700'
                    >
                        Change photo
                    </button>
                </div>

                <div className="flex flex-col items-center w-2/3">
                    <input 
                        type='text' 
                        name='firstName'
                        placeholder="First name" 
                        value={userData.firstName}
                        onChange={handleChange}
                        className="mt-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <input 
                        type='text' 
                        name='lastName'
                        placeholder="Last name" 
                        value={userData.lastName}
                        onChange={handleChange}
                        className="my-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <input 
                        type='text' 
                        name='username'
                        placeholder="Username" 
                        value={userData.username}
                        onChange={handleChange}
                        className="mb-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <input 
                        type='password' 
                        placeholder="New Password (leave blank to keep current)" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mb-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                <div className="flex justify-center my-8"></div>

                <div className="flex mt-auto my-12">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="transition-all cursor-pointer w-full py-2 px-6 rounded-2xl mt-auto bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings