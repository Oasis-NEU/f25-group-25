import { useState } from 'react';
import NavBar from '../assets/navbar';
import { supabase } from '../config/supabase';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setMessage('Password reset email sent! Check your inbox.');
            setEmail('');
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
                <h1 className="text-2xl">Forgot Password?</h1>
                <h1 className="mt-2 text-neutral-600">No worries, enter your email to reset your password</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-20 w-full justify-center items-center">
                {error && (
                    <div className="w-1/2 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="w-1/2 mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {message}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className="my-4 bg-slate-800 text-white rounded-md px-8 py-2 hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Sending...' : 'Send Email'}
                </button>
            </form>
        </div>
    </div>
    )
}

export default ForgotPassword