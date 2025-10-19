import NavBar from "../navbar"
import { Link } from "react-router-dom"

function Settings() {
    return <div><NavBar></NavBar>
        <div className="flex justify-around h-screen items-center ">
            <div className="flex justify-center">
                <img className='mt-6 mb-2 object-cover rounded-full h-24 w-24 outline-2 outline-stone-900' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s'></img>
            </div>
            <div className="outline-2 rounded-2xl h-2/3 w-2/3 p-4 flex flex-col">
                <input type="text" placeholder="First name" className="pl-2 py-1 border-2 w-1/5 focus:outline-none mt-6 rounded-md"></input>
                <input type="text" placeholder="Last name" className="pl-2 py-1 border-2 w-1/5 focus:outline-none mt-6 rounded-md"></input>
                <input type="text" placeholder="Email" className="pl-2 py-1 border-2 w-2/5 focus:outline-none mt-6 rounded-md"></input>
                <input type="text" placeholder="Password" className="pl-2 py-1 border-2 w-2/5 focus:outline-none mt-6 rounded-md"></input>
                <div className="flex justify-center mt-8">
                    <button className="transition-all hover:shadow-xl hover:scale-105 cursor-pointer w-1/6 mr-8 rounded-2xl py-2 bg-[#018bfe] text-white ">Venmo</button>
                    <button className="transition-all hover:shadow-xl hover:scale-105 cursor-pointer w-1/6 rounded-2xl py-2 bg-[#01e010] text-white">Cash App</button>
                </div>
                <div className="flex mt-auto">
                    <Link to='/dashboard' className="w-1/6"><button className="cursor-pointer w-full py-2 rounded-2xl mt-auto bg-blue-500">Save Changes</button></Link>
                </div>
            </div>
        </div>
    </div>
}

export default Settings