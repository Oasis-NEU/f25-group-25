import { Link } from "react-router-dom"

function NavBar() {
    return (
      <div className='flex justify-center sticky top-0 z-10 w-full'>
        <div className="flex border-b-2 h-20 w-full justify-around items-center">
          <Link to='/landing'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out cursor-pointer">Logo</button>
          </Link>
          <Link to='/account'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out cursor-pointer">Account</button>
          </Link>
          <Link to='/dashboard'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out cursor-pointer">Dashboard</button>
          </Link>
          <Link to='/debts'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-6 py-3 transition-all ease-in-out cursor-pointer">Debts</button>
          </Link>
          <Link to='/groups'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-6 py-3 transition-all ease-in-out cursor-pointer">Groups</button>
          </Link>
          <Link to='/add-contacts'>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out cursor-pointer">Add Friends/Groups</button>
          </Link>
          <Link to='/settings'>
            <button  className="hover:animate-spin rounded-md hover:scale-[1.20] transition-all ease-in-out cursor-pointer">{/* svg */}</button>
          </Link>
        </div>
      </div>
    )
}
export default NavBar