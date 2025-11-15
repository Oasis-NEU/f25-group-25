import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../config/supabase';

const Signup = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Check if username already exists
            const { data: existingUser } = await supabase
                .from('users')
                .select('username')
                .eq('username', formData.username)
                .single();

            if (existingUser) {
                throw new Error('Username already taken');
            }

            // Sign up the user with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        username: formData.username,
                        full_name: `${formData.firstName} ${formData.lastName}`
                    }
                }
            });

            if (authError) throw authError;

            // Insert user data into users table
            if (authData.user) {
                const { error: dbError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: authData.user.id,
                            email: formData.email,
                            username: formData.username,
                            first_name: formData.firstName,
                            last_name: formData.lastName
                        }
                    ]);

                if (dbError) throw dbError;
            }

            // Check if email confirmation is required
            if (authData.user && !authData.session) {
                setError('Please check your email to confirm your account!');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                // Auto-login successful
                console.log('User signed up:', authData.user);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <div>
        <div className="bg-slate-50 outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5 mx-auto p-10 shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-3/4 space-y-4">
                {error && (
                    <div className={`${error.includes('check your email') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded`}>
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id='password'
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
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
                    <Link to='/login'>
                        <p className='underline cursor-pointer text-sm'>Already have an account?</p>
                    </Link>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-slate-800 text-white rounded-md py-2 hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    </div>
    );
};

export default Signup;