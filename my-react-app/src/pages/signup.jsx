import { useState } from "react";
import NavBar from "../navbar";
import { Link } from "react-router-dom";
const Signup = () =>{
    const [showPass, setShowPass] = useState(false)
    
    return (
    <div>
        <NavBar/>
        <div className="bg-slate-50 outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5 mx-auto p-10 shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
            <form className="flex flex-col w-3/4 space-y-4">
                <input
                    type="text"
                    placeholder="First name"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="text"
                    placeholder="Last name"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type={showPass ? "" : "password"}
                    id='password'
                    placeholder="Password"
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
                    className="mt-4 bg-slate-800 text-white rounded-md py-2 hover:bg-slate-700 transition-all cursor-pointer">
                    Sign Up
                </button>
            </form>
        </div>
    </div>
    )
}

export default Signup