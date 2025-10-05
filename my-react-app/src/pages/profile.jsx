import NavBar from "../navbar"
import DebtTable from "../assets/debttable"

function Profile() {
  return <div className="flex flex-col items-center">
    <NavBar></NavBar>
    <div className="bg-slate-50 outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5">
        <img className='mt-6 mb-2 object-cover rounded-full h-24 w-24 outline-2 outline-stone-900' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s'></img>
        <h3 className="mb-2 text-neutral-600 hover:cursor-pointer">@username</h3>
        <div className="flex justify-around w-full">
            <div className="flex flex-col justify-center items-center px-4">
                <h2>Money owed to you</h2>
                <h2 className="text-green-600">$200.12</h2>
            </div>
            <div className="flex flex-col justify-center items-center px-4">
                <h2>Money you owe</h2>
                <h2 className="text-red-600">$12.00</h2>
            </div>
        </div>
    </div>
    <div className="flex justify-around w-full mt-16">
        <DebtTable></DebtTable>
        <DebtTable></DebtTable>

    </div>
  </div>
}

export default Profile