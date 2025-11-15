import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../assets/navbar';
import { supabase } from '../config/supabase';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            alert('Password updated successfully!');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
    <div className="flex flex-col items-center justify-center">
        <NavBar/>
        <div className="mt-20 outline-2 bg-white w-2/5 rounded-md p-8">
            <div className="flex flex-col mt-10 items-center">
                <h1 className="text-2xl">Reset Your Password</h1>
                <h1 className="mt-2 text-neutral-600">Enter your new password below</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-10 w-full justify-center items-center space-y-4">
                {error && (
                    <div className="w-3/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
                <label className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={showPass}
                        onChange={() => setShowPass(!showPass)}
                        className={showPass ? "cursor-pointer w-4 h-4 appearance-none outline-1 rounded-full bg-neutral-800" : "cursor-pointer grayscale w-4 h-4 appearance-none outline-1 rounded-full bg-neutral-300"}
                    />
                    <span className="cursor-pointer">Show Password</span>
                </label>
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-slate-800 text-white rounded-md px-8 py-2 hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Updating...' : 'Reset Password'}
                </button>
            </form>
        </div>
    </div>
    )
}

export default ResetPassword