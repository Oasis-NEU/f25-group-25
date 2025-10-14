function Settings() {
    return <div className="flex justify-around outline-2 rounded-2xl h-screen items-center ">
        <div className="flex justify-center">
            <img className='mt-6 mb-2 object-cover rounded-full h-24 w-24 outline-2 outline-stone-900' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s'></img>
        </div>
        <div className="outline-2 rounded-2xl h-2/3 w-2/3 p-4 flex flex-col">
            <input type="text" placeholder="First name" className="pl-2 py-1 border-2 w-1/5 focus:outline-none mt-6 rounded-2xl"></input>
            <input type="text" placeholder="Last name" className="pl-2 py-1 border-2 w-1/5 focus:outline-none mt-6 rounded-2xl"></input>
            <input type="text" placeholder="Email" className="pl-2 py-1 border-2 w-1/5 focus:outline-none mt-6 rounded-2xl"></input>
        </div>
    </div>
}

export default Settings