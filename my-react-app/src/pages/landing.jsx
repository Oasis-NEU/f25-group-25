import { Link } from "react-router-dom"

function Landing() {
    return <div className="flex flex-col bg-radial from-[#fffbf6] from-20% to-offwhite">
        <div className="flex flex-col align-middle justify-center mt-40 text-center">
            <h1 className="text-4xl font-sans text-wrap w-1/3 m-auto">
                Never forget your debts again
            </h1>
            <div class="h-[2px] bg-gradient-to-r from-transparent via-stone-900 to-transparent my-4 w-1/3 mx-auto"></div>
            <h1 className="text-wrap w-1/4 m-auto">Easily keep track of money you owe friends, family, coworkers, and more</h1>
        </div>
        <div className="flex justify-center mt-20">
            <Link to='/login' className="rounded-md">
                <button className="cursor-pointer px-12 py-3 rounded-md bg-stone-800 text-white hover:shadow-2xl hover:scale-105 hover:bg-blue-600 transition-all duration-300">
                    Get Started
                </button>
            </Link>
        </div>
        <div className="flex">
            <div className="flex flex-col mt-40 ml-40 w-1/3 mb-20 pb-20 hover:scale-105 transition-all duration-300">
                <p className="pb-4 text-2xl text-shadow-xs">Smart Balance Calculation</p>
                <p className="text-wrap text-lg">Mutual debts cancel eachother out automatically, allowing you to get a clear understanding of what you owe.</p>
                <div className="outline-2 h-80 w-full mt-4 rounded-md hover:shadow-2xl transition-all duration-200">*Insert Image*</div>
            </div>
            <div className="flex flex-col mt-40 ml-40 w-1/3 mb-20 pb-20 hover:scale-105 transition-all duration-300">
                <p className="pb-4 text-2xl text-shadow-xs">Simple & Direct</p>
                <p className="text-wrap text-lg">Link third party payment platforms such as PayPal, Cash App, and Venmo to pay anyone in an instant</p>
                <div className="outline-2 h-80 w-full mt-4 rounded-md hover:shadow-2xl transition-all duration-200">*Insert Image*</div>
            </div>
        </div>

        {/* <Link to='/dashboard'>
            <button className="mt-16 outline-2 rounded-full self-center px-6 py-2 cursor-pointer shadow-lg hover:bg-[#d5cfd3] hover:scale-105 transition-all ">Get Started</button>
        </Link> */}
    </div>
}

export default Landing