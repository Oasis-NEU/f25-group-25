function NavBar() {
    return <div className='flex justify-center sticky top-0 z-10 w-full'>
        <div className="flex border-b-2 h-20 w-full justify-around items-center">
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out">Logo</button>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out">Account</button>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out">Dashboard</button>
            <button className="hover:outline-2 rounded-md hover:scale-[1.05] px-8 py-4 transition-all ease-in-out">Add Friends/Groups</button>
        </div>
    </div>

}

export default NavBar