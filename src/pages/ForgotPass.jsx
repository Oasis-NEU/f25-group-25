import NavBar from '../assets/navbar';

const ForgotPassword = () => {
    return(
    <div className="flex flex-col items-center justify-center">
        <NavBar/>
        <div className="mt-20 outline-2 bg-white w-2/5 rounded-md">
            <div className="flex flex-col mt-10 items-center">
                <h1 className="text-2xl">Forgot Password?</h1>
                <h1 className="mt-2 text-neutral-600">No worries, enter your email to reset your password</h1>
            </div>
            <div className="flex flex-col mt-20 w-full justify-center items-center">
                <input
                    type="text"
                    placeholder="Email"
                    className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
                <button className="my-4 bg-slate-800 text-white rounded-md px-8 py-2 hover:bg-slate-700 transition-all cursor-pointer">Send Email</button>
            </div>
        </div>
    </div>
    )
}

export default ForgotPassword