import { Link } from "react-router-dom"

function Landing() {
    return <div className="flex flex-col"><div className="flex justify-center mt-40 outline-2 text-center">
            <h1 className="text-4xl font-bold">
                Track the money you owe your friends easily
            </h1>
        </div>
        <Link to='/dashboard'>
            <button className="mt-16 outline-2 rounded-full self-center px-6 py-2 cursor-pointer shadow-lg hover:bg-[#d5cfd3] hover:scale-105 transition-all ">Get Started</button>
        </Link>
    </div>
}

export default Landing