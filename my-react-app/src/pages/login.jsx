import NavBar from "../navbar"

function Login() {
  return (
    <div>
      <NavBar />
      <div className="bg-slate-50 outline-2 rounded-xl mt-20 flex flex-col justify-center items-center w-2/5 mx-auto p-10 shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Log in</h1>
        <form className="flex flex-col w-3/4 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="mt-4 bg-gray-800 text-white rounded-md py-2 hover:bg-gray-700 transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
