import NavBar from "../navbar"
import { Link } from "react-router-dom"

function Settings() {
    return <div className="bg-radial from-[#fffbf6] from-20% to-offwhite">
        <NavBar></NavBar>
        <div className="flex flex-col items-center mx-auto outline-2 w-8/12 my-12 rounded-sm bg-white">
            <div className="flex justify-between items-center h-24 w-full my-10 px-4">
                <div className="flex-1"></div>
                <h1 className="text-4xl flex-1 text-center">Profile Info</h1>
                <div className="flex-1 flex justify-end">
                    {/* <button className="outline-2 h-10 px-6 rounded-md">Edit Profile</button> */}
                </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl w-4/9 mb-6">
                <div className="flex flex-col items-center">
                    <img className='my-2 object-cover rounded-full h-18 w-18 outline-2 outline-stone-900' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s'></img>
                    <h1 className="select-all cursor-pointer text-neutral-400">@username</h1>
                </div>
                <button className='cursor-pointer outline-2 py-2 px-4 rounded-md'>Change photo</button>
            </div>
            <div className="flex flex-col items-center w-2/3">
                <input type='text' placeholder="First name" className="mt-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"></input>
                <input type='text' placeholder="Last name" className="my-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"></input>
                <input type='password' id='password' placeholder="Password" className="mb-4 w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"></input>

            </div>
            <div className="flex justify-center my-8">
                <button className="transition-all hover:shadow-xl hover:scale-105 cursor-pointer w-32 mr-8 rounded-2xl py-2 bg-[#018bfe] text-white ">Venmo</button>
                <button className="transition-all hover:shadow-xl hover:scale-105 cursor-pointer w-32 rounded-2xl py-2 bg-[#01e010] text-white">Cash App</button>
            </div>
            <div className="flex mt-auto my-12">
                <Link to='/dashboard'>
                    <button className="transition-all cursor-pointer w-full py-2 px-6 rounded-2xl mt-auto bg-slate-700 text-white hover:bg-slate-600">Save Changes</button>
                </Link>
            </div>
        </div>
    </div>
}

export default Settings