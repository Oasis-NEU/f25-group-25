import NavBar from "../navbar"
import DebtTable from "../assets/debttable"
import { Link } from "react-router-dom"
function Dashboard() {
  return <div className="flex flex-col items-center bg-gray-200">
    <NavBar></NavBar>
    <div className="bg-white outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5">
        <img className='mt-6 mb-2 object-cover rounded-full h-24 w-24 outline-2 outline-stone-900' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s'></img>
        <h3 className="mb-2 text-neutral-400 hover:cursor-pointer">@<span className="select-all">username</span></h3>
        <div className="flex justify-around w-full">
            <div className="flex flex-col justify-center items-center px-4 pb-4">
                <h2>Money owed to you</h2>
                <h2 className="text-maingreen">$200.12</h2>
            </div>
            <div className="flex flex-col justify-center items-center px-4 pb-4">
                <h2>Money you owe</h2>
                <h2 className="text-mainred">$12.00</h2>
            </div>
        </div>
    </div>
    <div className="flex justify-around w-full mt-16">
        <div className="flex flex-col w-full items-center">
            <h1 className="mb-4 text-maingreen">Money Recived</h1>
            <DebtTable></DebtTable>
        </div>
        <div className="flex flex-col w-full items-center">
            <h1 className="mb-4 text-mainred">Money Sent</h1>
            <DebtTable></DebtTable>
        </div>
    </div>
    <div className="mt-12">
        <Link to='/debts'>
            <button className="rounded-full outline-2 w-12 h-12 text-2xl">+</button>
        </Link>
    </div>
  </div>
}

export default Dashboard