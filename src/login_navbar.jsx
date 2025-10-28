import { Link } from "react-router-dom"

function LoginNavBar() {
    return (
      <div className='bg-slate-800 flex justify-center sticky top-0 z-10 w-full'>
        <div className="flex border-b-2 h-20 w-full justify-around items-center">
        <Link to='/login'>
            <button className="hover:bg-slate-700 rounded-md hover:scale-[1.05] px-8 py-2 text-white transition-all ease-in-out cursor-pointer">Logo</button>
        </Link>
        {/* <Link to='/debts'>
            <button className="hover:bg-slate-700 rounded-md hover:scale-[1.05] px-8 py-2 text-white transition-all ease-in-out cursor-pointer">Debts</button>
        </Link> */}
        <Link>
            <button className="hover:bg-slate-700 rounded-md hover:scale-[1.05] px-8 py-2 text-white transition-all ease-in-out cursor-pointer">Log In</button>
        </Link>
        <Link to='/signup'>
            <button className="hover:bg-slate-700 rounded-md hover:scale-[1.05] px-8 py-2 text-white transition-all ease-in-out cursor-pointer">Sign Up</button>
        </Link>       
        </div>
      </div>
    )
}
export default LoginNavBar