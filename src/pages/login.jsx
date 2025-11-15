import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../config/supabase';

function Login() {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Supabase uses email for login, so we'll treat username as email
            const { data, error } = await supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });

            if (error) throw error;

            // Successfully logged in
            console.log('User logged in:', data.user);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <div>
        <div className="bg-slate-50 outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5 mx-auto p-10 shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Log in</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-3/4 space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type={showPass ? "text" : "password"}
                    id='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            checked={showPass}
                            onChange={() => setShowPass(!showPass)}
                            className={showPass ? "cursor-pointer w-4 h-4 appearance-none outline-1 rounded-full bg-neutral-800" : "cursor-pointer grayscale w-4 h-4 appearance-none outline-1 rounded-full bg-neutral-300"}
                        />
                        <span className="cursor-pointer">Show Password</span>
                    </label>
                    <Link to='/forgot'>
                        <p className='underline cursor-pointer text-sm'>Forgot password?</p>
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-slate-800 text-white rounded-md py-2 hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                
                <p className="text-center text-sm">
                    Don't have an account? <Link to='/signup' className="underline">Sign up</Link>
                </p>
            </form>
        </div>
    </div>
    );
}

export default Login;